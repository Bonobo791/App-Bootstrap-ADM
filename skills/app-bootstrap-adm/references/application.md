# Application setup

Read for applications. Apply only selected capabilities; an app without accounts/storage/billing does not gain them from this checklist. Public marketing pages use M01-M03.

Contents: [boundaries](#a01-application-boundaries), [runtime](#a02-server-runtime-and-operational-errors), [accounts](#a03-accounts-and-sessions), [authorization](#a04-ownership-and-authorization), [data](#a05-durable-data-and-migrations), [billing](#a06-billing-and-entitlements), [integrations](#a07-email-oauth-and-external-apis), [jobs](#a08-background-work), [uploads](#a09-uploads-if-requested), [privacy](#a10-data-lifecycle-and-privacy), [UI](#a11-application-ui-foundation), [readiness](#a12-application-verification-and-readiness).

Order dependencies explicitly: shell/boundaries → disposable storage if needed → accounts if needed → ownership → selected integration modules → lifecycle/integration tests. Do not build every future business feature during bootstrap.

## A01 Application boundaries

**Files for a new SvelteKit target:** `svelte.config.js`, `vite.config.ts`, `src/routes/+layout.svelte`, `src/app.d.ts` where locals need types, `src/lib/server/` for private modules, `src/lib/` for public pure types/helpers, route matrix.

1. Select the primary compatible adapter. Preserve an existing adapter; add Node portability only when requested. An unknown adapter selector must fail.
2. Identify public/prerendered routes, authenticated server-rendered routes, actions/endpoints and browser-only interactions.
3. Keep secrets, DB/provider clients and authorization in server-only modules. Only safe serialized projections cross into page data/API responses.
4. Define which domain operations exist and their preconditions/output/error contracts. Establish a minimal real operation for each requested foundation, not a dummy function merely to make tests green.
5. Separate transport handlers from domain logic so real rules can be tested without mocking the rules themselves.
6. Define access/index/cache/analytics policy per route. Auth/private/account/reset/OAuth routes are excluded from marketing collection.
7. Do not rely on a client redirect or hidden button to enforce access. A client app using an external API documents that API's auth/ownership/CORS contracts and tests the real boundary.

**Tests:** production adapter builds/starts; secret sentinel absent from browser bundles/maps/page data; public and private routes have intended access; direct endpoint/action requests cannot bypass controls.

**Done:** directory/import boundaries, safe data projections and route responsibilities are concrete. Server setup is N/A for a wholly local client app; its storage/export/privacy boundaries still apply.

## A02 Server runtime and operational errors

**Files:** `src/lib/server/env.ts`, `src/hooks.server.ts`, framework error boundary and selected health/provenance routes.

- Use framework-supported private runtime config, such as SvelteKit's private dynamic env in server-only modules. Register variables in C04; don't turn private runtime secrets into PUBLIC/build constants.
- Define initialization failures separately from temporary dependency outages. Validate enabled integrations; optional absent features remain disabled.
- Establish request correlation/redaction and bounded provider calls. Avoid leaking wrapped DB error parameters.
- If sessions/data depend on a DB, an outage returns a visible maintenance/unavailable outcome; don't clear valid cookies or fabricate empty records merely because lookup failed.
- Define migration/schema compatibility readiness. A server with incompatible schema must not accept unsafe mutations.
- Keep dependency-free liveness/provenance endpoints outside auth/session/DB work. Readiness may check required dependencies with bounded calls and expose only safe status.
- Private/internal routes return intended noindex/cache headers even when redirecting. Do not expose account identifiers or detailed connection errors through health.

**Tests:** missing/invalid config; DB outage; behind/incompatible schema; safe error/log projection; liveness during dependency outage; readiness unavailable; private redirect headers; unavailable provider cannot report success.

**Done:** actual built server demonstrates each distinct failure; health cannot be mistaken for scheduler, provider or recovery proof.

## A03 Accounts and sessions

**Conditional:** requested user accounts. Choose a maintained supported library/provider; no custom password/session cryptography by default.

**Files:** server auth configuration, session helpers, hooks/request locals, sign-in/sign-out and selected recovery/verification routes; auth tests.

Record a concrete auth contract:
- Sign-in methods, verified identity rules and user provisioning policy.
- Session storage/type, expiration, renewal window, revocation and logout semantics.
- Cookie name/path, HttpOnly, Secure policy by environment, SameSite and explicit domain policy. Don't share across subdomains by accident.
- Rotation/fixation prevention; what happens after password/security/role changes.
- Mutations use server-validated session/identity; no trusting client user/owner/role fields.
- Login/reset/verification abuse limits, single-use/expiry rules and safe responses where those flows exist.
- Redirect-after-login uses relative/allowlisted destinations. Preserve framework CSRF/origin protections.
- OAuth-specific state/PKCE/redirect rules are in A07. Don't add password reset to an OAuth-only app unless needed.

**Tests:** valid sign-in/session/logout, exact expiry/renewal boundaries with injected time, tampered/expired/revoked session, rejected cross-origin mutation, unsafe redirect, fixation attempt, login/recovery rate limit and real browser cookie flags. An auth DB outage must remain distinguishable from an invalid session.

**Done:** browser + direct-handler tests prove the session contract; logs/analytics do not contain auth codes, cookies, email or reset links.

## A04 Ownership and authorization

**Conditional:** private records, roles, organizations or protected operations.

**Files:** central authorization helpers, scoped repositories/services, minimal real record route/action, ownership fixtures and properties.

1. Define the resource ownership model. Single-user app can use owner IDs; introduce organizations/membership/RBAC only when requested.
2. Bind principal from verified server identity. Scope reads/lists/counts/search/updates/deletes/exports by principal at the data operation, not after fetching private rows for serialization.
3. Define role/membership permissions and default denial where roles exist. Validate resource relations, not only the primary row ID.
4. Recheck authorization for background tasks, exports, billing changes and provider connections. A hidden UI control is insufficient.
5. Decide safe unauthorized/not-found outcomes consistently without disclosing another account's data.
6. Apply limits/pagination/sort allowlists to list APIs; enforce ownership on cursors and related-record IDs.

**Tests:** A creates a record; B cannot read/update/delete/export it or discover it through lists/counts/search/cursors. Client-supplied owner/role is ignored/rejected. Permission changes/revocation take effect. Unrelated tenant rows remain byte-identical after a denied request.

**Properties:** generated foreign IDs/relationships and operation sequences against real disposable persistence. Independent oracle is the ownership specification + before/after state. Removing an owner predicate must fail.

**Done:** real persisted and response observations prove denial and no side effects, not merely an authorization mock's call count.

## A05 Durable data and migrations

**Conditional:** requested persistent server data. Record actual provider/engine; no automatic Turso/Postgres adoption.

**Files:** connection module, schema/model definitions, versioned migrations, selected ORM config, fixture seeding and guarded disposable test reset scripts.

1. Define minimal tables/fields/relations for requested capabilities. For each field specify nullability, validation, source and retention classification.
2. Put ownership, uniqueness/idempotency and relation constraints in the database where supported. Define transactions and concurrency guarantees required by domain operations.
3. Keep dev/test/preview storage separate from production. Use disposable local/test DBs with synthetic fixtures.
4. Establish exact `db:migrate`, `db:seed:test` and `db:test:reset` contracts or existing equivalents. Reset refuses any non-disposable/non-allowlisted destination; it never guesses the target from ambient production config.
5. Exercise clean migration from empty storage, upgrade from a supported previous schema with representative records and repeated migration behavior. Inspect nullable/external legacy values.
6. Separate build-time codegen, release migrations and runtime schema compatibility. Never require production DB credentials to compile a reusable starter.
7. Document destructive changes, rollback limits and expand/contract steps when compatibility matters. Database rollback and code rollback are different.
8. Use actual provider backup/PITR capabilities; D06 requires an isolated restore before production readiness.

**Tests:** schema constraints, transactions rollback on failure, duplicates, concurrent conflicting writes if relevant, guarded reset rejection, clean install, upgrade preserving records, invalid persisted values, DB unavailable and tenant isolation. Properties reset state per run through rollback/isolated namespace/reset, not once per suite.

**Commands/evidence:** exact provision → migrate → seed → integration tests → reset → migrate sequence in disposable storage; upgrade fixture/schema outputs. A mocked repository is not migration/persistence evidence.

**Done:** reproducible local data setup, no production secret needed, verified constraints/clean install/upgrade. Provider recovery remains a distinct release task.

## A06 Billing and entitlements

**Conditional:** requested paid plan/payment behavior. Select the provider and current official integration contract; do not assume Stripe or copy Moderaty's pricing/license logic.

**Files:** server billing config/client, checkout/customer ownership service, webhook route, persisted event inbox/ledger and entitlement reducer/service; sandbox runbook.

Specify before implementation:
- Product/price mapping, currencies, plan limits and source of truth.
- Which subscription/payment/refund/cancellation states grant access, effective timing and any grace policy.
- Provider test/live environment isolation and how accidental live operations are prevented.
- Event signature verification over required raw request bytes; timestamp/replay rules, method/body limits and safe errors.
- Durable unique event/operation IDs, atomic inbox/state transitions and retry behavior. Duplicate delivery cannot repeat effects.
- Delayed/out-of-order events reconcile current authoritative state or obey a documented safe version rule. Never let an old success revive canceled access.
- Claiming webhook completion happens only after required state commits. In-progress/failed processing remains retryable under the provider contract.
- Browser checkout return is navigation, not proof of payment. Server-verified state controls entitlement.
- Provider customer/checkout changes require the current user's ownership; client price/user/account IDs are not authority.

**Tests:** valid signed event, invalid signature/raw-byte alteration, replay, concurrent duplicate, old/new event order, failure before/after write, provider timeout/unknown outcome, non-owner change, plan limit boundaries and cancellation/failure/refund states actually selected.

**Properties:** generated event sequences against an independently specified state model, with real persisted effects. Counters/credits never duplicate; unrelated users unchanged; unauthorized state cannot grant access.

**Integration gate:** observe real provider sandbox checkout → verified webhook → persisted entitlement → protected action; repeat event; exercise selected removal/failure path. Mocked provider tests leave this gate pending. Production money/credentials remain governed by user authorization.

## A07 Email, OAuth and external APIs

**Conditional:** requested provider communications/connections. Use separate tasks for each provider.

**Files:** server integration client, validated config, callback/send route, connection storage if required and sandbox fixtures.

| Capability | Concrete contract | Required evidence |
| --- | --- | --- |
| Email | Allowed recipients/templates, escaped input, credentials, timeouts, accepted/delivered semantics, retries/idempotency, bounce/failure handling where needed | Actual isolated recipient delivery plus rejection/timeout; no false success or copied destination |
| OAuth | State bound to initiating session, required PKCE/provider safeguards, exact callback/redirect allowlist, short expiry/single use, minimal scopes | Valid callback; wrong/missing/reused state, expired verifier, unsafe redirect and denial; token/code absent from logs/client/analytics |
| API connection | Principal ownership, minimal scopes, validated response/page limits, rate/timeout/retry contract, token storage/refresh/revocation | Real sandbox read/write as requested; wrong owner, malformed page, rate limit, expiry, refresh failure and revoked access |
| BYOK | Explicit memory-only versus persistent storage contract; private boundaries and deletion | Key never returned/logged; stated persistence behavior and shutdown/deletion verified |
| Dry-run | Exactly which writes are forbidden and what read/validation work still occurs | Observed zero external/DB mutations where forbidden; response labeled dry-run |

Persist provider tokens only when requested and protected using the selected storage/crypto approach. No homemade encryption format; define key management/rotation if encryption is required. A provider response with null fields is normal input to validate, not a reason to crash or invent values.

**Done:** local failure contracts + actual isolated provider path verified. Provider provisioning, delivery reputation and notices remain explicit release evidence.

## A08 Background work

**Conditional:** actual schedules, external writes, retryable jobs or long work. No queue/Redis/worker by default.

**Files:** bounded job function, authenticated trigger/worker entry point, selected durable lease/queue/checkpoint storage, tests and operational runbook.

1. Choose the simplest execution model meeting real concurrency/retry needs. Document whether one process or multiple workers can run.
2. Define auth for triggers, job/batch item limit, execution deadline, per-request timeout and shutdown behavior.
3. Define durable cursor/checkpoint, lease ownership/expiry, idempotency key and retry/backoff/exhaustion rules.
4. Acknowledge/mark complete only after required effects commit. Per-item failures are reported and do not erase successful progress.
5. Overlap/restart/lease expiry must not duplicate unsafe side effects or lose work. Unknown provider write outcomes require reconciliation.
6. Separate healthy HTTP server from completed scheduler ticks. Record safe heartbeat/last-success and pending/failed counts.
7. Define missed-tick/failed-job alert recipient/channel and recovery action. Actual alert delivery requires authorized operator setup and evidence.
8. If dry-run exists, test its exact write prohibition before enabling writes.

**Tests:** empty/full/oversized batch, max deadline, partial item failure, repeated trigger, overlapping workers, stale lease, crash/restart, duplicate provider response, retry exhaustion, cursor progress and honest incomplete outcome.

**Properties:** bounded work, conservation of processed/pending items, no unrelated writes, retry convergence under specified assumptions. Use scheduler/model-based tests only where concurrency/state transitions actually exist.

**Done:** isolated completed tick + overlap/recovery evidence; production scheduler and missed-tick alert remain pending until observed. A `/health` 200 cannot complete this requirement.

## A09 Uploads, if requested

**Files:** server upload policy/handler, selected private/public object storage config, metadata and cleanup routine.

Define maximum bytes/files, accepted content/types, untrusted filename policy, generated storage key, owner access, signed-link expiry, transformation/scanning needs, orphan cleanup and deletion/retention. Choose public versus private storage explicitly.

**Tests:** valid upload/download, oversized stream, misleading extension/type, dangerous filename/path, other-owner access, expired/tampered signed URL, incomplete upload and cleanup failure. Rejected input creates no usable object/record.

**Done:** storage permissions and observed object/metadata lifecycle match the policy. No bucket keys or account identifiers leak into public starter defaults.

## A10 Data lifecycle and privacy

**Conditional:** personal/user/provider data. For local-only storage, document browser/device/export behavior instead of inventing server retention.

**Files:** `docs/data-lifecycle.md`, deletion/export service if requested, retention cleanup and matching privacy/help content.

Inventory every store: DB, provider tokens, files, email payloads, logs, analytics and backups. Record purpose, fields, access, retention trigger/duration, deletion mechanism, owner and verification. Choose retention from actual product requirements; no copied legal/jurisdiction claims.

- Account/resource deletion has specified scope and cascade/anonymization. Provider disconnect/revocation and queued work cannot recreate deleted data.
- Export is owner-scoped and contains only intended fields; private operational secrets are excluded.
- Cleanup is bounded/idempotent with truthful progress and tests for partial failure.
- Describe residual backups/PITR honestly using actual provider policy; deletion from live DB is not proof of instant backup erasure.
- Logs retain only selected safe fields; disabled analytics remains off under P01-P05.

**Tests:** deletion/export for A with B unchanged; relevant tokens/files/jobs removed/revoked; repeated deletion; failure/retry; retention boundaries with controlled time; unrelated data remains intact. Inspect notices against actual behavior.

**Done:** implementation/notice/store registry agree; provider retention/recovery facts have evidence, not assumptions.

## A11 Application UI foundation

**Files:** shared shell/tokens/nav, public layout, protected layout/server load, error/loading/empty components and first requested minimal operation.

Set up:
- Semantic/keyboard-accessible responsive shell, document language, focus/reduced motion.
- Signed-out, signed-in, loading, empty, success, validation error, forbidden, unavailable and session-expired states applicable to the app.
- Server-side authorization plus safe client presentation. User-specific data cannot enter shared caches or another user's hydration payload.
- Accessible form errors linked to inputs, duplicate-submit handling and preserved safe inputs on recoverable failure.
- Clear distinction between accepted/pending/completed integration work. Never show a simulated successful payment/delivery as real.
- M01-M03 public metadata/sitemap and private noindex rules from the route matrix.
- Analytics has no private app route eligibility.

**Tests:** real browser sign-in/minimal operation/sign-out when accounts exist; unauthorized direct URL/action; mobile/desktop keyboard path; empty/long/malformed content; outage and expired-session states; simultaneous users with no cache leakage.

**Done:** browser observations plus server/persistence tests prove the shell's actual contracts. Avoid unrelated design-system/state-manager libraries.

## A12 Application verification and readiness

Run check/lint/format → ordinary tests including properties → disposable DB migration/integration tests if selected → production adapter build/start → browser tests. Run provider sandbox checks separately with actual isolated configuration. Apply T06 mutation/fault review to meaningful selected domain modules.

Record each applicable A requirement individually:
- **Local foundation:** private boundaries, controlled config/errors, real auth/ownership/data contracts where requested, harness and initial actual properties, built server and browser checks.
- **Integration:** real selected provider callbacks/delivery/webhooks, persistence and failure/retry cases.
- **Release:** exercised CI, served expected SHA, production configuration, actual scheduler/alerts if selected, data lifecycle/notices and isolated restore evidence.

Pending provider access blocks the dependent feature/integration; independent UI/domain work can continue. A local green suite or a directory of mocks cannot mark all app foundations or production readiness verified.
