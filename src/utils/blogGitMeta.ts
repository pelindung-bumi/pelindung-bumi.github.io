import type { CollectionEntry } from 'astro:content';
import { GITHUB_OWNER, GITHUB_REPO } from '../consts';

type BlogEntry = Pick<CollectionEntry<'blog'>, 'data' | 'filePath'>;

export interface GitHubIdentity {
	username: string;
	url: string;
}

export interface BlogGitMeta {
	writer?: GitHubIdentity;
	modifiedBy?: GitHubIdentity;
	modifiedAt?: Date;
}

interface GitHubCommit {
	author: {
		login?: string;
		html_url?: string;
	} | null;
	commit: {
		author: {
			date?: string;
		};
	};
}

const cache = new Map<string, Promise<BlogGitMeta>>();

function toRepoContentPath(filePath?: string) {
	if (!filePath) {
		return null;
	}

	const normalized = filePath.replace(/\\/g, '/');
	const marker = 'src/content/blog/';
	const index = normalized.indexOf(marker);

	if (index === -1) {
		return null;
	}

	return normalized.slice(index);
}

function createIdentity(username?: string | null) {
	if (!username) {
		return undefined;
	}

	return {
		username,
		url: `https://github.com/${username}`,
	};
}

function firstGitHubCommit(commits: GitHubCommit[]) {
	return commits.find((commit) => commit.author?.login);
}

function lastGitHubCommit(commits: GitHubCommit[]) {
	return [...commits].reverse().find((commit) => commit.author?.login);
}

async function fetchGitHubMeta(contentPath: string, fallbackWriter?: string): Promise<BlogGitMeta> {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(contentPath)}&per_page=100`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					'User-Agent': 'pelindungbumi.dev',
				},
			},
		);

		if (!response.ok) {
			return {
				writer: createIdentity(fallbackWriter),
			};
		}

		const commits = (await response.json()) as GitHubCommit[];
		const newest = firstGitHubCommit(commits);
		const oldest = lastGitHubCommit(commits);
		const writer = createIdentity(oldest?.author?.login ?? fallbackWriter);
		const latestEditor = createIdentity(newest?.author?.login);

		if (!latestEditor || !writer || latestEditor.username === writer.username) {
			return {
				writer,
			};
		}

		return {
			writer,
			modifiedBy: latestEditor,
			modifiedAt: newest?.commit.author.date ? new Date(newest.commit.author.date) : undefined,
		};
	} catch {
		return {
			writer: createIdentity(fallbackWriter),
		};
	}
}

export function getBlogGitMeta(post: BlogEntry) {
	const contentPath = toRepoContentPath(post.filePath);
	const cacheKey = contentPath ?? post.data.title;

	if (!cache.has(cacheKey)) {
		cache.set(
			cacheKey,
			contentPath
				? fetchGitHubMeta(contentPath, post.data.writerGithub)
				: Promise.resolve({ writer: createIdentity(post.data.writerGithub) }),
		);
	}

	return cache.get(cacheKey)!;
}
