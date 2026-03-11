# Pelindung Bumi

Pelindung Bumi is a minimalist technology learning blog for curious people who want to learn and share knowledge about infrastructure, Kubernetes, cloud, SRE, DevOps, and related engineering topics.

## Stack

- Astro
- Bearnie as the base template
- Bun for package management and scripts

## What This Site Is

Pelindung Bumi is a small organization that writes in public. The goal is simple: learn technology, document what we understand, and share it with the world in a clean and readable format.

`Pelindung Bumi` is just a cool name. The site is not meant to present the organization as superheroes or finished experts.

## Pages

- `Home` introduces the organization and its focus
- `Blog` lists the published articles
- `About` explains the organization and why it writes

## Blog Notes

- Blog posts can show GitHub-based writer and modifier metadata
- Local git names should not be displayed as public writer information
- Blog posts may include a clickable table of contents for easier reading

## Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Commands

Run everything with Bun from the project root:

| Command | Action |
| :-- | :-- |
| `bun install` | Install dependencies |
| `bun run dev` | Start local development server |
| `bun run build` | Build the production site into `dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run astro ...` | Run Astro CLI commands |

## Nix / devenv

This repository also includes a `flake.nix` with `devenv` so contributors can set up a reproducible development shell with Nix.

Enter the shell with:

```bash
nix develop --no-pure-eval
```

Inside the shell:

- Bun is available automatically
- `bun install` runs automatically through devenv
- you can use the normal project commands such as `bun run dev` and `bun run build`

This setup follows the devenv flake approach, which is useful for teams that want a flake-native development environment while still using devenv modules.

## Template Credit

This project is built with Astro and uses Bearnie as the starting template base.
