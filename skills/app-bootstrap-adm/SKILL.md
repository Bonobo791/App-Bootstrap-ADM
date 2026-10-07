---
name: app-bootstrap-adm
description: Use when starting or simplifying a SvelteKit application with a standalone Node server and self-hosted Coolify deployment.
---

# Prepare a SvelteKit app

Use the [copyable app](assets/app/README.md) for a new application. It uses SvelteKit, adapter-node and one npm lockfile.

1. Inspect the target's instructions, current work, routes, environment and selected services. Preserve existing routes and data.
2. Copy `assets/app/.`, including dotfiles, into an empty project. Use the pinned Node/npm versions. Copy `.env.example` to `.env`, then run `npm ci --ignore-scripts`, `npm run check` and `npm run dev`.
3. Replace `src/routes/+page.svelte` with the app's first required flow. Put server handlers in `+server.ts` and private services in `$lib/server/`. Read runtime credentials through `$env/dynamic/private`; send only public data to the browser.
4. Add authentication, storage or provider integrations when requested. Verify their actual access rules and failure paths with isolated test resources.
5. Run `npm run check` and `npm run build`, then `npm start`. Check the page, client assets, missing-route 404, `/healthz` and `/build.json`. Test the interaction and its failure feedback in a browser.
6. Use [Contabo/Coolify hosting](../deploy-app-contabo-coolify/SKILL.md) for deployment. Record the revision and checks on the project task.

Use `node build/index.js` in production. Configure `HOST`, `PORT` and the public `ORIGIN` at runtime. The base needs no database or application credentials. Enable indexing when its public pages are ready.
