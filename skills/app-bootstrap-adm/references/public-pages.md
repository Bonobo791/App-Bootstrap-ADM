# Public pages within an app

Apply to an app's selected marketing/legal/help pages. Use SvelteKit route/layout/load conventions from the target; a content CMS is a separate selected feature.

## M01 Public layout and metadata

**Files:** public layout/page routes, central public site metadata/config, shared head/SEO component and synthetic public fixtures.

- Keep public UI separate from private dashboard/session data.
- Define semantic landmarks, document language, navigation, focus/reduced-motion and mobile/desktop tokens.
- Render page-specific title/description, canonical and social metadata. Validate origin/slash/base-path; omit arbitrary queries/fragments.
- Generate structured data only from visible supported facts.
- Static/prerendered versus request-time behavior is recorded per route. Public page rendering must not leak account/provider/session data.
- Remove source-product copy, branding, pricing, license claims and tracking IDs.

**Tests/evidence:** built/served metadata, valid social image, navigation/keyboard/narrow/desktop, long/empty content and secret sentinel absent from HTML/page data/JS.

## M02 Sitemap, robots and private indexing

**Files:** selected public sitemap/robots routes and private-route header policy, often in server hooks.

Define public canonical inventory and draft/preview/private exclusions. Apply private/internal noindex and cache policy even on redirects. Robots is crawl guidance, not access control; avoid blocking crawl merely to hide a noindex header.

Moderaty exempts safe public health/config/robots/sitemap routes from session/DB work. Adapt that dependency boundary; public metadata should not unnecessarily fail because private account storage is unavailable.

**Tests:** public sitemap/robots output and exclusions; direct private route/redirect headers; no account IDs/URLs in feeds; dependency outage behavior; unknown URL status and selected redirects.

**Done:** actual served route inventory/headers agree with the route matrix.

## M03 Media, performance and browser checks

**Files:** selected image/font assets, responsive components and built-target browser tests.

Use licensed/project-owned assets, informative/decorative alt rules, dimensions and responsive loading. Add remote origins/fonts only when selected. Choose realistic performance budgets after representative content exists.

**Tests:** media resolves without layout gaps; first public navigation/CTA works; keyboard/focus/reduced motion; narrow/desktop screenshots; offline/unavailable states where selected.

Marketing analytics uses P01-P04 and stays off in local/preview/forks. Private app navigation and auth/billing/provider callbacks are ineligible. A CTA click cannot count as a verified signup/payment.
