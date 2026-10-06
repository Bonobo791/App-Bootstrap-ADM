# Application profile and order

Use Moderaty as the template example. Its SvelteKit/private-runtime/session/error/testing/launch patterns are transferable; its YouTube moderation, provider/pricing/license rules are selected product features.

| Requested behavior | Apply | Conditional foundation |
| --- | --- | --- |
| Interactive client-only app | C01-C09, T01-T07, relevant A01/A11/A12 | Browser/local storage and external API boundary |
| Server app | Shared plus A01/A02/A11/A12 | Selected adapter, private runtime config and real failure states |
| Accounts/private records | A03/A04 and A05 when persistent storage is needed | Actual session/ownership/disposable migration tests |
| Paid plan, email/OAuth, jobs or uploads | Selected A06-A09 | Real sandbox, idempotency/concurrency/abuse contracts |
| Personal data | A10 and relevant P requirements | Actual retention/deletion/provider evidence |
| Public marketing routes | M01-M03 | Metadata/sitemap/noindex/media checks |
| Standard content website | Use Site-Bootstrap-ADM | Lippincott website foundation |

## Resolve decisions

Record users/first operation, current stack/manager, server/client route boundaries, identity/ownership model, actual data requirements, selected integrations and primary host. Mark undecided auth/DB/payment providers as pending; don't silently adopt Turso, Stripe or any paid service.

## Implementation order

1. C01-C03: policy, compatible pinned tooling and actual scripts.
2. C04-C07/T01-T07: route/env/error contracts, runner/fast-check/CI.
3. A01/A02/A11: private imports/runtime, app shell and failure states.
4. A05 if selected: disposable storage/schema/migration/constraints.
5. A03/A04 if selected: real identity/session and owner-scoped minimal operation.
6. Selected A06-A09 providers/jobs/uploads; A10 lifecycle and applicable P requirements.
7. M01-M03 public marketing routes; D01-D08 selected runtime/release/recovery.
8. C08-C09: fresh-clone/public review and evidence handoff.

Each ID becomes a granular setup task; split independently verifiable services/routes. Preserve established property/mutation contracts. Source-specific production restrictions do not override existing user authorization or the target's own rules.
