# house-hunting-app

A small single-page app for browsing house listings: search by title or city, filter by city, max
price and minimum bedrooms, and save favorites.

Stack: React 19 + TypeScript + Vite, tested with Vitest and React Testing Library, linted with
oxlint.

## Requirements

- Node.js 22 (see `.nvmrc`; Vite 8 requires Node `^20.19 || >=22.12`)

## Setup

```bash
nvm use      # or otherwise select Node 22
npm ci       # npm install on first setup
```

## Commands

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start the dev server on `localhost:5173` |
| `npm run build`     | Typecheck (`tsc -b`) and build to `dist/` |
| `npm run preview`   | Serve the production build               |
| `npm test`          | Run the test suite once                  |
| `npm run test:watch`| Run tests in watch mode                  |
| `npm run lint`      | Lint with oxlint                         |
| `npm run typecheck` | Typecheck only                           |

## Layout

```
src/
  App.tsx                 filter state, results and saved-homes wiring
  filters.ts              pure filtering/formatting helpers (unit tested)
  data/listings.ts        in-memory listing fixtures
  components/ListingCard.tsx
  test/setup.ts           jest-dom matchers for Vitest
```
