# Carsharing Israel

An overview website for comparing carsharing providers in Israel.

---

## What It Is

A simple, mobile-first website that helps people in Israel find and compare carsharing options — all in one place. Covers multiple providers with filters, a map, and a comparison table. Available in English and Hebrew.

---

## Status

Early MVP — in development. Static/semi-static site, no backend required.

---

## MVP Features

- Provider overview with cards and logos
- City and use-case filters
- Comparison table
- Map showing provider coverage
- Bilingual: English / Hebrew (EN/HE)
- Simple provider data file (JSON) — easy to update

---

## Tech Stack

| Tool | Purpose |
|---|---|
| HTML | Structure |
| CSS | Styling (mobile-first) |
| JavaScript | Filters, map, language switching |
| JSON | Provider data file |
| Leaflet | Interactive map |

---

## Project Structure

```
index.html           # Main entry point
styles.css           # Main stylesheet
script.js            # Filters, map, language logic
providers.json       # Provider data (name, coverage, links, logos)
assets/
  logos/             # Provider logos
CODEX_PROMPT.md      # Instructions for AI coding agents
```

---

## Getting Started

No build step required. Open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
```

---

## Adding a Provider

Open `providers.json` and add a new entry following the existing structure. Make sure all required fields are filled — missing fields will break the filter and comparison logic.

---

## Bilingual Support

The site supports English and Hebrew. Language switching is handled in `script.js`. When adding new content, make sure both language versions are updated.

Hebrew content uses RTL layout — test any UI changes in both directions.

---

## Not in MVP

- User accounts or login
- Booking or payment
- Real-time vehicle availability
- TOMP-API integration
- Backend or database

TOMP-API and MaaS integration may be considered in a later version if the project expands toward public transport interoperability.

---

## Next Steps

- Complete provider data for all major Israeli carsharing services
- Finalize map coverage per provider
- Test bilingual layout on mobile
- Deploy (e.g. Netlify)
