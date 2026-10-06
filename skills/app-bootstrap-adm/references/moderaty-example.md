# Moderaty application template example

Inspected source: `Bonobo791/Moderaty` at `89ffd992497ad2d3cf879cde6daf42931e6cb656`, 2026-10-06. Adapt the foundation to a neutral app and synthetic users/records.

## Source-to-template mapping

| Moderaty source area | Set up in a new app | Requirement / proof |
| --- | --- | --- |
| `svelte.config.js` | Compatible primary adapter; optional Node target with explicit selector | A01/D01: build/start actual selected server |
| `src/hooks.server.ts` | Safe session binding, expiry/cookies, private headers, DB/schema outage handling | A02/A03: actual valid/invalid/outage cases |
| Server-only modules and private runtime env | Private DB/provider/auth config and safe response projections | C04/A01: no secret in client/page data |
| Drizzle/Turso persistence | Selected engine/ORM, versioned migrations, guarded disposable fixtures | A04/A05: ownership and clean/upgrade evidence |
| `vite.config.ts` + property tests | Real Vitest discovery, controlled fixtures/time and fast-check | T01-T04: regressions/properties/replay/faults |
| `stryker.config.json` | Scoped mutation with ignoreStatic and explicit kill accounting | T06: survivor review and meaningful faults |
| Billing/provider behavior in launch runbook | Signed/idempotent sandbox callbacks, authoritative entitlement and retries | A06/A07: real sandbox path and persisted effects |
| Scheduled moderation behavior | Selected authenticated/bounded/idempotent jobs and completed-tick monitoring | A08: actual tick/overlap/recovery/alert evidence |
| `docs/ANALYTICS.md` | Optional default-off runtime Umami for reviewed public routes | P01-P04: zero-request exclusions and actual safe payload |
| `docs/BACKUP_RECOVERY.md` + `docs/LAUNCH_RUNBOOK.md` | Actual supported restore and served-SHA/release checks | D04/D06-D08: isolated restore and provider/operator evidence |

## Recorded source commands

The snapshot declares Node `>=24` and npm `>=11`; SvelteKit `2.70.2`, Svelte `5.56.8`, Vitest `5.0.1`, fast-check `4.9.0` and Stryker `9.6.1` identify the inspected source. Verify current official compatibility before reuse.

Source scripts:

```sh
npm ci
npm run check
npm test
npm run build
npm run preview
npm run db:verify
```

`check` runs `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`. Source `db:migrate` runs Drizzle migration and must point only to authorized isolated storage during bootstrap tests. `dev:cron` is a source-specific selected scheduler helper.

The new app must pin its exact manager/runtime, implement required lint/format/browser/disposable reset scripts and document the selected server start command. These enhancements are not claimed to exist under those names in the inspected source.

## Neutral example project contract

Prepare `svelte.config.js`, `vite.config.ts`, strict generated-config-aware types, one lockfile and actual checks. Create a public shell and selected private layout, safe errors/config, server-only services, fixtures and test discovery.

If accounts/records are requested, implement a minimal real sign-in → owned record operation → sign-out path with disposable storage and cross-account denial. Add billing only when requested; select actual plan states/provider and prove verified sandbox events control access.

YouTube channels/moderation, BYOK, Stripe prices, Turso accounts, SMTP destinations and Moderaty's lifetime/hosting/license terms are product features. Select them from the new brief.

## Minimal verification scenario

1. Clean install/check/test/build with isolated test prerequisites and no production credentials.
2. Built server returns safe public routes and private redirects/errors; no secret leakage.
3. If selected, exercise real sessions, record ownership and clean/upgrade migrations.
4. If billing is selected, sandbox checkout → verified webhook → persisted entitlement; replay and old/invalid events cannot duplicate/revive access.
5. If jobs are selected, prove completed tick/retry/overlap behavior; HTTP health alone cannot establish it.
6. Record actual provider, alert and isolated restore evidence separately from local mocks.

Moderaty's mutation accounting excludes properties from kill claims and relies on example tests there. Preserve that policy in Moderaty; choose/document accounting for a new target.
