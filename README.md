# Carsharing Israel

Carsharing Israel is an independent, NGO-style public information website about carsharing and short-term shared-car access in Israel.

## Product Identity

This project is:

- A neutral consumer-information and research website.
- A public comparison of Israeli carsharing operators, prices, coverage and service models.
- Independent from every operator listed on the site.
- Designed to improve transparency and help people make informed transport choices.
- Available in English and Hebrew.

This project is **not an app**, booking platform, marketplace, carsharing operator or commercial affiliate website.

## Non-Negotiable Boundaries

Do not turn this website into an app or add:

- User accounts, login or personal profiles.
- Booking, payment or vehicle-unlock functionality.
- Live vehicle or station availability.
- Operator account connections or TOMP/MaaS integrations.
- Referral rankings, paid placement or undisclosed sponsored recommendations.
- Claims that the site operates, owns or supplies vehicles.

Links may send users to official operator websites or apps, but all transactions and registrations happen outside this website.

## Editorial Principles

The website should remain factual, cautious and useful:

1. Prefer official operator tariff, FAQ, terms and service pages.
2. Show a direct source link beside provider and pricing information.
3. Record the date on which information was checked.
4. Label dated, secondary or app-only information clearly.
5. Never invent a price when a current public tariff cannot be verified.
6. Distinguish classic carsharing from rental-like short-term access.
7. Avoid declaring one operator "best" or "cheapest" without a reproducible trip comparison.
8. Remind readers that the final operator website or app price controls.

The current provider research was checked on **21 June 2026**. AutoTel's accessible official tariff is dated 2020, and CityCar's current prices are presented through a dynamic tariff interface; the website discloses both limitations.

## Current Website Features

- Provider information cards with dated price snapshots and sources.
- Filters for city, use case, service model, pricing model and eligibility status.
- Approximate city coverage map, not live vehicle locations.
- Provider comparison table.
- English and Hebrew content with RTL support.
- Methodology, guide, FAQ and research-based articles.

## Technology

The website is deliberately static and requires no backend or build step:

- HTML for pages.
- CSS in `css/styles.css`.
- Vanilla JavaScript in `js/`.
- Leaflet for the approximate coverage map.
- GitHub Pages-compatible static hosting.

The primary provider dataset is `js/providers.js`. It includes bilingual descriptions, pricing snapshots, verification dates and source URLs.

## Project Structure

```text
index.html              Main provider overview and map
compare.html            Provider comparison table
methodology.html        Inclusion and verification policy
guide.html              Consumer guide
faq.html                Frequently asked questions
blog.html               Research article index
blog-*.html             Informational articles
css/styles.css          Active site styles
js/providers.js         Primary researched provider dataset
js/app.js               Provider cards and filters
js/compare.js           Comparison table rendering
js/i18n.js              English/Hebrew translations
js/map.js               Approximate coverage map
```

Some older root-level files and archives remain in the repository for historical reasons. Confirm which files are loaded by the active HTML pages before editing.

## Running Locally

No installation or compilation is required. Serve the directory with any static server:

```bash
npx serve .
```

Then open the local URL printed by the server.

## Updating Provider Data

When updating `js/providers.js`:

1. Research the official operator website first.
2. Confirm the price components, including time, distance, membership and major surcharges.
3. Update both `pricingSummary` and `pricingSummaryHe`.
4. Update `lastChecked` and `lastCheckedHe` with an exact date.
5. Add every supporting URL to the provider's `sources` array.
6. Explain uncertainty in `dataStatus` and `dataStatusHe`.
7. Test English, Hebrew, desktop and mobile views.
8. Check related FAQ, guide and blog claims for contradictions.

## Guidance For AI Assistants

Before making changes, read this README and inspect the active files. Preserve the project's identity as an independent informational NGO-style website.

Do not propose app features merely because the subject involves mobility. Prioritize research quality, source visibility, accessibility, bilingual consistency and simple static publishing.

## Disclaimer

Carsharing Israel is not affiliated with the listed providers. Prices, service areas, vehicle availability, eligibility and insurance terms can change. Users must verify the final terms directly with the provider before registering or booking.
