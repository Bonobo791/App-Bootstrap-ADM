# Application provenance

Prepared 2026-10-06. Primary application example is Moderaty, inspected at a pinned snapshot from the same date.

| Source | Inspected evidence |
| --- | --- |
| [Moderaty snapshot](https://github.com/Bonobo791/Moderaty/tree/89ffd992497ad2d3cf879cde6daf42931e6cb656) | SvelteKit SaaS foundation and selected product modules |
| [Package](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/package.json), [AGENTS](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/AGENTS.md) | Actual scripts/versions and source-specific boundaries |
| [Svelte config](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/svelte.config.js), [hooks](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/src/hooks.server.ts), [test config](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/vite.config.ts) | Adapter, session/private headers, safe outage/schema handling and property discovery |
| [Property guide](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/docs/property-testing.md), [Stryker](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/stryker.config.json) | Independent properties/fresh state/replay/faults and mutation accounting |
| [Analytics](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/docs/ANALYTICS.md) | Runtime/default-off public-route Umami with host/data/preference policy |
| [Recovery](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/docs/BACKUP_RECOVERY.md), [launch](https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/docs/LAUNCH_RUNBOOK.md) | Actual provider-supported recovery, served SHA, sandbox/scheduler/alert evidence |
| [Official fast-check 4.9.0](https://github.com/dubzzz/fast-check/releases/tag/v4.9.0), [4.10.0 note](https://fast-check.dev/blog/2026/09/13/whats-new-in-fast-check-4-10-0/) | Bundled reference version and newer release; check compatibility |

References/templates are original derived setup guidance with enhancements beyond source implementation. Product providers/pricing/moderation/license/jurisdiction rules remain conditional. Verify current official compatibility/provider contracts before reuse. Source app code/customer data/licenses are not republished here.
