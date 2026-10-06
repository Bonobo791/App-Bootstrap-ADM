# Environment registry

Replace illustrative names with actual framework/provider names. Include only selected capabilities. Secrets and project IDs have no copied values.

| Name | Purpose/capability | Public/private | Build/runtime | Dev/test/preview/production | Default | Validation + bounds | Missing/invalid behavior | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SITE_URL | Canonical/app origin | Public value | Explicit per target | Isolated origins | Chosen local origin | URL scheme/host/path/query policy | Fail selected production config | |
| DATABASE_URL | Persistent data if selected | Private | Runtime except isolated migration | Separate disposable/production resources | Empty | Selected engine/provider + destination guard | Selected data module unavailable/fails visibly | |
| AUTH_SECRET | Only if chosen auth requires it | Private | Runtime | Separate keys | Empty | Library contract | Required auth fails visibly | |
| BILLING_SECRET_KEY | Only for selected provider | Private | Runtime | Sandbox/live isolated | Empty | Provider/environment contract | Billing unavailable/fails visibly | |
| BILLING_WEBHOOK_SECRET | Selected signature validation | Private | Runtime | Separate endpoints/keys | Empty | Provider contract | Reject verification when missing | |
| ANALYTICS_ENABLED | Requested marketing collection | Server config/public projection | Runtime | Off in local/preview/fork | false | Explicit boolean policy | Ineligible | |
| UMAMI_URL / UMAMI_WEBSITE_ID | Requested collector | Public values via projection, no credentials | Runtime | Deployment-owned | Empty | Approved origin/ID | Invalid enabled config diagnosed; no collection | |
| ANALYTICS_ALLOWED_HOSTNAMES | Exact deployment host gate | Public projection | Runtime | Explicit aliases | Empty | Exact hostname list | No collection | |
| DRY_RUN | Only for tested external-write feature | Private | Runtime | Explicit | true | Boolean + exact write prohibition | Safe documented failure | |

Add bounds/units for body size, timeout, batch limit, session/lease/retention duration when those settings exist. Record how secrets are injected, public projections are served, invalid values are tested and sentinel leakage is checked. A static host cannot magically supply private runtime env to built files.
