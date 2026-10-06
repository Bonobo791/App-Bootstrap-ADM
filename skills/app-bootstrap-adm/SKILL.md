---
name: app-bootstrap-adm
description: Use when starting, cloning, scaffolding or preparing an interactive app, SvelteKit application, authenticated portal or SaaS before feature work. Also use to audit app startup defaults, server boundaries, sessions, ownership, database migrations, provider integrations and fast-check tests.
---

# App-Bootstrap-ADM

Prepare an application foundation from Moderaty's SvelteKit patterns. Keep domain features, identities and credentials project-specific. Use Site-Bootstrap-ADM for standard content websites.

## Workflow

1. Inspect target instructions, branch/worktree, scripts, runtime/manager/lockfile, routes, server/client imports, data and integrations. Preserve unrelated work; Moderaty's policy does not govern a different target.
2. Use [the application profile](references/baseline.md). Preserve an existing stack; prefer SvelteKit for a new app. Select accounts/storage/billing/email/OAuth/jobs/uploads only when requested. Provider choices must be explicit; verify current official compatibility before pinning.
3. Create `docs/bootstrap.md` and `docs/bootstrap-tasks.md` from [status](assets/bootstrap.template.md) and [setup tasks](assets/setup-task.template.md). Expand each applicable ID into files/exports/schema, configuration, commands, positive/negative tests, forbidden effects, evidence and blockers. Mark verified/pending/not applicable.
4. Read [shared setup](references/shared-setup.md), [application modules](references/application.md), [testing](references/testing.md) and [the Moderaty template example](references/moderaty-example.md). Read [public pages](references/public-pages.md) for marketing routes, [privacy](references/privacy-operations.md) for analytics/personal data, [deployment](references/deployment.md) for selected hosting and [sources](references/sources.md) for provenance.
5. Implement toolchain/checks and server/client/config/error boundaries first. Add disposable data/migrations if selected, then accounts/session and owner-scoped operations, then selected providers. Implement the smallest real foundation needed for the brief. Use [routes](assets/route-matrix.template.md), [environment registry](assets/environment-registry.template.md), [agent rules](assets/AGENTS.template.md), [env defaults](assets/env.example) and [ignore rules](assets/gitignore.fragment).
6. Install compatible fast-check in the real runner and ordinary CI suite. Specify independent session/ownership/entitlement/job/data invariants before properties; reset state per generated run. Preserve shrunk regressions/replays and prove concrete faults fail. Use [the runnable example](assets/fast-check-example/package.json) for the harness pattern, then cover actual app modules. Scope Stryker and document example/property kill accounting.
7. Run clean install, codegen/type/lint/format/test and production adapter build/start. If storage is selected, exercise clean/upgrade migrations in disposable DBs. Inspect real browser auth/minimal operation/failure paths at mobile/desktop widths. Test actual selected providers in sandbox separately from mocks.
8. Review tenant isolation, data lifecycle, default-off marketing analytics, safe errors/logs, public artifacts/licenses and release blockers. Use [the runbook](assets/release-runbook.template.md) for expected SHA, host/readiness, real jobs/alerts and recovery evidence. Commit/push/merge/deploy according to target policy and existing authorization.

## Completion

Report verified IDs, exact commands/results and independent feature work that can proceed. Local readiness requires actual requested server/auth/ownership/data boundaries and meaningful tests. Real provider integration and production release have separate gates.

Unrequested accounts, DB, payments, workers and paid services remain N/A. A mock response, health 200, installed package or CI file does not establish provider, scheduler or recovery success.

## Common failures

- Client-supplied user/owner/price becomes authority.
- Property reset happens per test instead of per generated run.
- Webhook retries duplicate effects or an old event restores canceled access.
- DB outage silently clears sessions or fabricates empty data.
- Health is used as proof a scheduled job completed.
- Privacy/backup claims exceed actual storage/provider evidence.
