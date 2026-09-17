# Bloom Demo

A local-first Bloom at-home beauty and wellness web app.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm run dev
   ```

3. Open the local URL shown in the terminal, typically:

   ```text
   http://localhost:3000
   ```

## Architecture

This version is structured so the app can evolve without tying itself to one technology stack:

- `src/data/mockData.js` — seed data and module definitions
- `src/lib/formatters.js` — formatting helpers
- `src/components/Sidebar.jsx` — navigation shell
- `src/components/Pages.jsx` — page modules for customer, partner, and admin flows
- `src/App.jsx` — orchestration and state handling

The app keeps state in browser local storage, so it runs entirely on a local machine without subscriptions, cloud services, or third-party APIs.

## Included flows

- customer overview
- service discovery and booking
- partner management
- operations dashboard
- inventory tracking
- support and SOS mock flow

This gives a clean extension point for later migration to a real backend, database, or different frontend stack.
