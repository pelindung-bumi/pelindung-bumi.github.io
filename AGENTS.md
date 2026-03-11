# AGENTS.md

## Purpose
Build and maintain `pelindungbumi.dev` as a minimalist technology learning blog for curious people who want to learn and share knowledge about infrastructure, Kubernetes, cloud, SRE, DevOps, and related topics.

## Stack
- Framework: Astro
- Template base: Bearnie (`https://bearnie.dev/docs/`)
- Package manager/runtime: Bun only
- Do not use `npm` or `node` unless there is no Bun equivalent

## Required Pages
- Home
- Blog
- About

## Design Rules
- Keep the site minimalist, polished, readable, and fast
- Use frontend-design skill for UI/UX refinements when needed
- Keep Bearnie as the base, but do not leave it looking like the default template
- Reuse the existing logo for the header and favicon/browser tab icon
- Prefer simple layouts and direct content over decorative sections

## Content Direction
- Write as curious people learning in public, not as experts or superheroes
- Keep the focus on infrastructure, Kubernetes, cloud, SRE, DevOps, and related engineering topics
- Make the organization feel clear: Pelindung Bumi is a cool name for a group sharing what they learn
- Keep copy practical, direct, and not self-congratulatory

## Blog Rules
- Blog metadata may show GitHub writer and modifier information
- Do not show local git names for writer metadata
- Keep writer/modifier details limited to blog content, not other sections

## Workflow Rules
- Prefer minimal, clean, maintainable changes
- Preserve Astro/Bearnie conventions unless there is a clear improvement
- Optimize for readability, simplicity, and fast loading

## Commands
Use Bun:
```bash
bun install
bun run dev
bun run build
bun run preview
```
