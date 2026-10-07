# Repository guidance

This is a small SvelteKit/Node toolkit for self-hosted Coolify on Contabo. The copyable application lives in `skills/app-bootstrap-adm/assets/app`.

Keep two skills, the runnable app, short READMEs, environment example, checks and license. Keep project plans and evidence in the tracker. Remove source registers, research archives, worked examples, unrelated demos and duplicate planners.

Use one npm lockfile, adapter-node and the production Node entry. Preserve an existing app's routes and data. Add accounts, storage and providers when its requirements call for them; keep private configuration and services server-only.

Before committing, run:

```sh
node scripts/check.mjs
node scripts/test-toolkit.mjs
```

For Docker or serving changes, also build the image and verify the app, client assets, 404, health, build marker and browser interaction. Keep credentials out of template defaults and client bundles. Follow existing user authorization for pushes, merges and server changes.
