# App-Bootstrap-ADM

A small SvelteKit/Node setup toolkit with a copyable app and Contabo/Coolify hosting instructions.

## Start an app

From this repository root:

```sh
mkdir ../my-app
cp -R skills/app-bootstrap-adm/assets/app/. ../my-app/
cd ../my-app
cp .env.example .env
npm ci --ignore-scripts
npm run check
npm run dev
```

Edit `src/routes/+page.svelte`. Run `npm run build` and `npm start` for the production Node server. See the [app README](skills/app-bootstrap-adm/assets/app/README.md) for Docker and environment settings.

## Use the skills

Install `app-bootstrap-adm` and `deploy-app-contabo-coolify` from `skills/` into your agent's skill directory. Review an existing installation before replacing it.

Use [app setup](skills/app-bootstrap-adm/SKILL.md) to prepare an application and [Contabo/Coolify hosting](skills/deploy-app-contabo-coolify/SKILL.md) to deploy it. Add accounts, storage and providers when the application needs them.

## Check this toolkit

```sh
node scripts/check.mjs
node scripts/test-toolkit.mjs
```

These checks build and run a fresh copy. Keep project plans and verification records in It's a Plan.
