# Lead Flow

A browser-based lead pipeline board: drag leads between stages, add or edit a card, and watch the pipeline value update — the same kind of internal tool that replaces a messy spreadsheet of leads and follow-ups. Nothing leaves your machine.

**Live demo:** https://gatix1.github.io/lead-flow/

## Features

- Kanban board with five stages — New, Contacted, Proposal Sent, Won, Lost
- Drag-and-drop cards between stages, plus an accessible "move to stage" dropdown on every card
- Add, edit, and delete leads (name, company, deal value, notes) through a modal form
- Per-column and pipeline-wide value totals, formatted per locale
- Seeded with sample leads so the board looks populated on first load, with a one-click reset back to the sample data
- Trilingual UI — Romanian, Russian, and English, with a persisted language switcher
- Light/dark theme, persisted across visits

## Tech stack

Vite, React, TypeScript, Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

---

Built by [mpintea.dev](https://mpintea.dev) as a portfolio demo project.
