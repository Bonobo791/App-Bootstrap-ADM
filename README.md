# App-Bootstrap-ADM

This repository contains a reusable agent skill, templates, examples, and reference material for preparing apps for Advanced Digital Marketing LTDA. It draws on [Moderaty](https://github.com/Bonobo791/Moderaty). Use `$app-bootstrap-adm` for application workflows such as accounts, owned data, and billing.

This repository is an app-preparation toolkit, not a deployable application. It does not contain a project's user interface, identity provider, production data, or hosting configuration. The skill guides work in the actual app project and records what to build, test, configure, and verify before launch.

## Quick start

For an agent that supports skills in `~/.agents/skills`, install the app skill from the repository root:

```sh
mkdir -p ~/.agents/skills
test ! -e ~/.agents/skills/app-bootstrap-adm && \
  cp -R skills/app-bootstrap-adm ~/.agents/skills/
```

Use the host's corresponding skill directory when it differs. If the skill already exists, review and merge changes deliberately.

For a new product, follow [Plan a new site or app](#plan-a-new-site-or-app) to install `$plan-sites-and-apps-adm`, complete the interview, and publish the agreed plan before bootstrap work.

For a project with an agreed plan, ask your agent to prepare the actual app project. For example:

> Use $app-bootstrap-adm to prepare [project path or repository] as an app for [purpose and users]. Preserve the existing stack; for a new app, prefer SvelteKit. Keep undecided authentication, storage, billing, and hosting choices visible for me. Create the bootstrap and setup-task records, verify the app's real build and tests, and document the selected host's launch steps.

Your coding agent needs access to the actual app project. The skill prepares and verifies work there. The app's build, runtime, storage, and release procedure depends on its stack and selected host, so this repository has no universal `npm run dev` or deployment command. Follow the commands recorded in the prepared project's README and `docs/release-runbook.md`. Production release follows that project's policy and authorization.

For standard content websites, use [Site-Bootstrap-ADM](https://github.com/Bonobo791/Site-Bootstrap-ADM).

## What is included

The app skill covers 44 setup requirement groups. Shared tooling and configuration come first. Accounts, ownership, persistent data, billing, email and OAuth, jobs, uploads, and lifecycle modules activate only when the project brief requires them. Each applicable task records files, configuration, commands, positive and negative tests, evidence, and blockers.

The repository also includes:

- App setup templates for `docs/bootstrap.md`, `docs/bootstrap-tasks.md`, routes, environment settings, agent instructions, and a release and recovery runbook.
- Application module, public-page, privacy, testing, and selected-host deployment guidance.
- A Moderaty worked example that maps a real SvelteKit app into a neutral foundation. YouTube moderation, provider accounts, prices, licensing, and lifetime offers stay project-specific.
- A Fast-check demo that shows the test harness. It does not prove the prepared app's auth, database isolation, billing, or provider safety.
- The Plan Sites & Apps skill for interviewing about a new product and deciding whether to use this app workflow or Site-Bootstrap-ADM.

## How the workflow works

The skill inspects the target project's instructions, stack, package manager, routes, server and client boundaries, data, and integrations. It preserves the existing stack and prefers SvelteKit for a new app. It adds auth, storage, billing, email, OAuth, jobs, or uploads only when the project requirements call for them.

The workflow records applicable requirements in `docs/bootstrap.md` and `docs/bootstrap-tasks.md`. It then guides implementation, tests against real app rules, local builds, browser checks, and selected-provider sandbox tests. Mocks and the bundled demo do not establish that a real provider works.

Start with [Shared setup](skills/app-bootstrap-adm/references/shared-setup.md), [Application modules](skills/app-bootstrap-adm/references/application.md), [Public pages](skills/app-bootstrap-adm/references/public-pages.md), [Testing](skills/app-bootstrap-adm/references/testing.md), [Privacy](skills/app-bootstrap-adm/references/privacy-operations.md), and [Deployment](skills/app-bootstrap-adm/references/deployment.md).

## Launch a prepared app

Use the generated project's release notes for the exact launch command and destination. The bootstrap workflow leaves the host and runtime configuration tied to that app instead of assuming a provider or application architecture.

Before release, the target project should:

1. Select its actual deployment profile, such as a server app or a client app with an external API. Record the artifact, selected runtime or adapter, configuration, and destination.
2. Adapt `skills/app-bootstrap-adm/assets/release-runbook.template.md` into `docs/release-runbook.md`. Document the host's exact build and start or publish commands, required environment settings, smoke checks, and rollback path.
3. Run the target's clean install, code generation, type, lint, format, test, and production build checks. Test the built server or client in a browser and verify real failure paths. If a database and migrations are selected, exercise them against disposable databases. Test selected providers in their sandbox separately from mocks and verify the selected adapter or host.
4. Configure production secrets through the host's secret mechanism, not in source or client bundles. Verify the intended revision, readiness, public and private routes, one minimal operation, and selected integrations. Keep checks for selected capabilities pending until there is real evidence; mark checks for unselected capabilities not applicable and record the reason.

## Plan a new site or app

Use the bundled [Plan Sites & Apps ADM skill](skills/plan-sites-and-apps-adm/SKILL.md) before bootstrap work. It has 88 question topics with website and app branches, an answer ledger, requirement-to-task mapping, phase initiatives, capacity-based cycles, and launch criteria. It selects this app bootstrap or Site-Bootstrap-ADM from the product requirements.

After the interview and plan review, it can create an It's a Plan project with a plan document, initiatives, dated cycles, granular tasks, and blocking links. It reconciles interrupted writes and reads the structure back. Unknown dates, capacity, and provider decisions stay visible.

Install it alongside the bootstrap:

```sh
test ! -e ~/.agents/skills/plan-sites-and-apps-adm && \
  cp -R skills/plan-sites-and-apps-adm ~/.agents/skills/
```

> Use $plan-sites-and-apps-adm to interview me about a new app, select the ADM bootstrap, and publish the agreed plan in It's a Plan with initiatives, tasks, and cycles.

The [schedule checker](skills/plan-sites-and-apps-adm/scripts/validate_schedule.py) checks dates, dependency order, and resource capacity. It does not estimate work or prove product readiness. Planning does not execute a production launch.

## Moderaty template example

[The worked example](skills/app-bootstrap-adm/references/moderaty-example.md) maps the inspected SvelteKit app into a neutral foundation:

- Server-only configuration and services, safe session binding, and private response headers.
- Explicit identity and ownership contracts and disposable clean and upgrade migrations when selected.
- Verified provider callbacks, durable idempotency, and authoritative entitlements when billing is selected.
- Bounded jobs, completed-tick and alert evidence, and real recovery when required.
- Vitest and Fast-check properties, replay and regressions, and scoped mutation accounting.
- Public marketing routes and optional default-off runtime Umami with private-route exclusions.

YouTube moderation, BYOK, provider accounts, prices, lifetime offers, and licensing terms are selected separately for each app.

## Fast-check

Properties run alongside regressions in the ordinary suite and CI. Specify independent ownership, session, entitlement, job, and data rules, reset state per generated run, replay shrunk failures, and prove concrete faults. Preserve the target's mutation accounting.

The bundled synthetic analytics gate demonstrates the harness. It does not establish application auth, database isolation, billing, or provider safety. Add substantive properties against actual app modules.

## Validate this repository

The commands below validate this toolkit and its bundled examples. They do not launch or deploy the application created from it.

Run these commands from the repository root:

```sh
python3 scripts/validate.py
python3 -m unittest discover -s skills/plan-sites-and-apps-adm/scripts -p 'test_*.py'
python3 skills/plan-sites-and-apps-adm/scripts/validate_schedule.py skills/plan-sites-and-apps-adm/assets/schedule-example.json
cd skills/app-bootstrap-adm/assets/fast-check-example
npm ci --ignore-scripts
npm test
```

The repository's CI workflow uses Python 3 and Node.js `24.19.0`. The prepared app may need different versions, which its own toolchain files should specify.

The demo has a separate lockfile from any app prepared with this workflow. Check official framework and provider compatibility again when you reuse the guidance.

Prepared 2026-10-06. [Source provenance](skills/app-bootstrap-adm/references/sources.md) identifies pinned snapshots. The MIT license covers original guidance, templates, and demo; source projects retain their own licenses.
