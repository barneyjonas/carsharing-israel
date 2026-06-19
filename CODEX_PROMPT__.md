# Codex build prompt — Carsharing Israel bilingual MVP

Build or refactor a mobile-first MVP website for comparing carsharing and app-based short-term car access options in Israel.

## Product goal

Create a clean, practical overview website where users can see shared car access options in Israel at a glance, filter by city and trip type, compare providers, and switch between English and Hebrew.

The product should be simpler and less overloaded than CoMoUK, consumer-first like carsharing.at, and methodologically careful like CHACOMO.

## Scope

This is an MVP. Do not build:

- booking
- login
- payment
- live station availability
- live vehicle availability
- vehicle unlock
- backend admin panel
- TOMP-API integration

TOMP-API may be added later only if interoperability with MaaS platforms, municipalities, public transport apps, or resellers becomes relevant.

## Core positioning

Use the broad category:

> Carsharing and app-based short-term car access in Israel.

This avoids overclaiming, because some Israeli services are classic carsharing while others are closer to short-term rental.

## Required pages

1. `/` homepage
2. `/compare` comparison table
3. `/guide/how-carsharing-works-in-israel`
4. `/methodology`

If implementing as static HTML, use:

- `index.html`
- `compare.html`
- `guide.html`
- `methodology.html`

If implementing in Next.js, use corresponding routes.

## Required language support

The site must support both:

- English
- Hebrew

Requirements:

- Add visible language switcher: `EN | עברית`
- Store selected language in localStorage
- English uses `dir="ltr"`
- Hebrew uses `dir="rtl"`
- Header, cards, filters, tables, guide, methodology, disclaimers and map labels should translate
- Provider data should include bilingual fields where possible:
  - English name
  - Hebrew name
  - English description
  - Hebrew description
  - English service model label
  - Hebrew service model label
  - English return model
  - Hebrew return model
  - English pricing labels
  - Hebrew pricing labels
  - English best-for labels
  - Hebrew best-for labels
  - English data status
  - Hebrew data status
- Filters should keep their underlying machine values in English but display translated labels in Hebrew
- Do not use machine translation at runtime; use explicit translation dictionaries or data fields

## Required homepage structure

Homepage should be city-first.

Hero:

Title EN:
`Where do you need a car?`

Title HE:
`איפה אתם צריכים רכב?`

Subtitle EN:
`Compare carsharing and app-based short-term car access in Israel by city, trip type and service model.`

Subtitle HE:
`השוו אפשרויות שיתוף רכב וגישה קצרה לרכב בישראל לפי עיר, סוג נסיעה ומודל שירות.`

Primary CTA:
- EN: `Find providers`
- HE: `מצאו ספקים`

Secondary CTA:
- EN: `What we include`
- HE: `מה כלול באתר`

## Quick situation shortcuts

Add four shortcut cards/buttons:

1. Tel Aviv city trip
2. Jerusalem access
3. Family or planned trip
4. No private car

These should pre-filter the provider overview. They are not recommendations.

## Service taxonomy

Use these service categories:

1. `round_trip_carsharing`
   - EN: Round-trip carsharing
   - HE: שיתוף רכב הלוך-חזור
   - Meaning: pick up and return to a defined station or parking location

2. `free_floating_area_carsharing`
   - EN: Free-floating / area-based carsharing
   - HE: שיתוף רכב אזורי / חופשי
   - Meaning: pick up and return within a defined service area

3. `self_service_short_term_access`
   - EN: Self-service short-term app rental
   - HE: השכרה קצרה בשירות עצמי דרך אפליקציה
   - Meaning: rental-like access with app-based or low-friction pickup

4. `brand_short_term_access`
   - EN: Brand-based short-term access
   - HE: גישה קצרה לרכב של מותג
   - Meaning: manufacturer or network-based short-term car access

## Provider cards

Each card should show:

- Logo/fav icon
- English provider name
- Hebrew provider name
- Description in selected language
- Cities / areas
- Service model
- Return model
- Pricing structure
- App-based yes/no
- Tourist-friendly yes/no/unknown
- Best for
- Confidence level
- Last checked
- Data status
- Link to official provider website

## Logos

Add company logos where they fit, especially:

- provider cards
- comparison table

For the MVP, lightweight external favicon URLs are acceptable as placeholders, for example:

```ts
logoUrl: "https://www.google.com/s2/favicons?sz=96&domain=gotoglobal.com"
```

For production, replace these with licensed official brand assets or provider-approved logos.

## Map

Add a coverage map on the homepage.

Requirements:

- Use city-level coverage only
- Do not imply exact stations, vehicles or live availability
- Markers should show cities/areas with mapped coverage
- Map should update with provider filters
- Add a side panel/list of mapped cities
- Translate map explanatory text into Hebrew
- If Leaflet/OpenStreetMap is used, note that it requires an internet connection

## Comparison page

Create a comparison table with columns:

- Provider, including logo and Hebrew name
- Main cities / areas
- Service model
- Return model
- Pricing structure
- App-based
- Tourist-friendly
- Best for
- Last checked
- Data status
- Website

Mobile behavior:

- horizontal scroll is acceptable for MVP
- table must remain readable

## Guide page

Create a practical guide with sections:

1. What counts as carsharing?
2. Carsharing vs. traditional rental
3. Round-trip carsharing
4. Free-floating / area-based access
5. Short-term app rental
6. What to check before booking
7. Common cost factors
8. What this MVP does not do yet

All guide content must be available in English and Hebrew.

## Methodology page

Explain:

- inclusion rule
- exclusion rule
- classification logic
- verification status
- fields needing verification
- future trust layer

The methodology should make clear that the site is an independent MVP overview and not a legally exhaustive database.

## Initial provider data

Seed with these providers:

1. GoTo / CAR2GO
2. AutoTel
3. CityCar
4. Share - Israel Car Sharing / Shlomo Share
5. My Car
6. Toyota SHARE

For each provider include:

```ts
id: string;
name: string;
hebrewName?: string;
description: string;
descriptionHe: string;
category: string;
serviceTypeLabel: string;
serviceTypeLabelHe: string;
returnModel: string;
returnModelHe: string;
pricingModels: string[];
pricingModelsHe: string[];
cities: string[];
cityNamesHe: string[];
appBased: boolean;
touristFriendly: "yes" | "no" | "unknown";
bestFor: string[];
bestForHe: string[];
website: string;
logoUrl?: string;
confidence: "high" | "medium" | "low";
lastChecked: string;
lastCheckedHe: string;
dataStatus: string;
dataStatusHe: string;
sourceLabel?: string;
notes?: string;
```

## Visual style

- Clean, trustworthy, transport-oriented
- Avoid heavy visual clutter
- Do not overload the homepage with too many menu items or content blocks
- Mobile-first
- High contrast
- Clear cards and badges
- RTL layout should feel natural in Hebrew

## Disclaimer

Include this idea in both languages:

EN:
`This website is an independent MVP overview. Prices, vehicle availability, service areas, eligibility rules, insurance conditions and app access may change. Always check the provider’s official website or app before booking.`

HE:
`זהו אתר MVP עצמאי. מחירים, זמינות רכבים, אזורי שירות, כללי זכאות, תנאי ביטוח וגישה לאפליקציה עשויים להשתנות. תמיד בדקו באתר או באפליקציה הרשמית של הספק לפני הזמנה.`

## Acceptance criteria

- Site runs locally without build errors
- English/Hebrew language toggle works
- Hebrew mode switches document direction to RTL
- Homepage shows all providers
- Filters work in both languages
- Provider cards include logos/favicons
- Comparison table includes logos/favicons
- Map appears on homepage and uses city-level coverage only
- Guide and methodology pages translate correctly
- Provider data is stored separately from components
- No login, no booking, no payment, no backend, no TOMP-API
