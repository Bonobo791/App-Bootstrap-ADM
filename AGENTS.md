# App-Bootstrap-ADM

Use `skills/app-bootstrap-adm/SKILL.md` when instantiating this template as a new app. Read the Moderaty worked example and expand applicable setup IDs into exact tasks before feature work.

This is the reusable bootstrap repository. Its demo tests validate the harness; they do not prove a newly instantiated app's behavior. Implement and verify selected app foundations in that target.

## Editing the bootstrap

Use `skills/plan-sites-and-apps-adm/SKILL.md` for a new product interview and plan. Publish the agreed plan as a new It's a Plan project with phase initiatives, native cycles, granular tasks and directional dependencies. Preserve answers and existing authorization; resolve real calendar/capacity/team decisions.

For planner changes run `python3 -m unittest discover -s skills/plan-sites-and-apps-adm/scripts -p 'test_*.py'` and the schedule example CLI in addition to repository validation.

Run `python3 scripts/validate.py`. In `skills/app-bootstrap-adm/assets/fast-check-example` run `npm ci --ignore-scripts` and `npm test`. Keep local links/frontmatter/lockfile consistent and preserve source provenance.

## Preparing an app

Preserve the target's stack/instructions; prefer SvelteKit for a fresh app. Keep private config/services server-only. Add actual session/ownership/data foundations and providers only from the brief, with isolated test resources and observable failure behavior.

Run fast-check against real app rules alongside regressions; reset state per generated run and record faults/replay/mutation accounting. Test built server/browser paths and actual provider sandboxes separately.

Track verified/pending/not-applicable evidence. Health cannot prove a job ran; mocks cannot prove provider delivery/payment; CI cannot prove restore. Marketing analytics defaults off and excludes private/auth/billing/provider routes.

Follow target branch/release policy and existing user authorization for pushes, merges, deployment and production access. Use Site-Bootstrap-ADM for standard content websites.
