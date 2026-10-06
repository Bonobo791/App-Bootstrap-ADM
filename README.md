# App-Bootstrap-ADM

Template repository for Advanced Digital Marketing LTDA apps, with a bootstrap skill and templates based on [Moderaty](https://github.com/Bonobo791/Moderaty). Use **`$app-bootstrap-adm`** before building an app.

The package has 44 setup requirement groups. Shared tooling/config/errors/tests come first; accounts, ownership, persistent data, billing, email/OAuth, jobs, uploads and lifecycle modules activate from the brief. Every applicable task specifies files, configuration, commands, positive/negative tests, evidence and blockers.

## Moderaty template example

[The worked example](skills/app-bootstrap-adm/references/moderaty-example.md) maps the inspected SvelteKit app into a neutral foundation:

- Server-only configuration/services, safe session binding and private response headers.
- Explicit identity/ownership contracts and disposable clean/upgrade migrations when selected.
- Verified provider callbacks, durable idempotency and authoritative entitlements when billing is selected.
- Bounded jobs, completed-tick/alert evidence and real recovery when required.
- Vitest/fast-check properties, replay/regressions and scoped mutation accounting.
- Public marketing routes and optional default-off runtime Umami with private-route exclusions.

YouTube moderation, BYOK, provider accounts, prices, lifetime offers and licensing terms are selected separately for each app.

## Detailed setup

[Shared](skills/app-bootstrap-adm/references/shared-setup.md) · [Application modules](skills/app-bootstrap-adm/references/application.md) · [Public pages](skills/app-bootstrap-adm/references/public-pages.md) · [Testing](skills/app-bootstrap-adm/references/testing.md) · [Privacy](skills/app-bootstrap-adm/references/privacy-operations.md) · [Deployment](skills/app-bootstrap-adm/references/deployment.md)

Templates create bootstrap/task records, route policies, an environment registry, agent rules and a release/recovery runbook. Local, real provider integration and production readiness have separate evidence gates.

## Fast-check

Properties run alongside regressions in the ordinary suite and CI. Specify independent ownership/session/entitlement/job/data rules, reset state per generated run, replay shrunk failures and prove concrete faults. Preserve the target's mutation accounting.

The bundled synthetic analytics gate demonstrates the harness. It does not establish application auth, DB isolation, billing or provider safety. Add substantive properties against actual app modules.

## Install and invoke

For an agent supporting `~/.agents/skills`:

```sh
mkdir -p ~/.agents/skills
test ! -e ~/.agents/skills/app-bootstrap-adm && \
  cp -R skills/app-bootstrap-adm ~/.agents/skills/
```

Use the host's corresponding directory when different; merge existing installations deliberately.

> Use $app-bootstrap-adm to prepare this SvelteKit app from the Moderaty template example. Include fast-check and exact setup tasks for accounts, owned records and the selected paid plan.

For standard websites use [Site-Bootstrap-ADM](https://github.com/Bonobo791/Site-Bootstrap-ADM).

## Validate this repository

```sh
python3 scripts/validate.py
cd skills/app-bootstrap-adm/assets/fast-check-example
npm ci --ignore-scripts
npm test
```

The demo is locked separately from any app being prepared. Refresh official framework/provider compatibility on reuse.

Prepared 2026-10-06. [Source provenance](skills/app-bootstrap-adm/references/sources.md) identifies pinned snapshots. MIT covers original guidance/templates/demo; source projects retain their own licenses.
