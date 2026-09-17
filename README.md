# Bloom Demo

A dependency-free local prototype of the Bloom at-home beauty and wellness platform.

## Run locally

No paid services, API keys, build tools, or database are required.

1. Download or clone this repository.
2. Open `index.html` directly in a browser, or serve the folder with any static server:

   ```bash
   python -m http.server 8080
   ```

3. Visit `http://localhost:8080`.

The prototype stores demo data in browser `localStorage`, so bookings and settings remain available between refreshes on the same machine. Use **Reset demo** in the profile menu to restore the sample state.

## Architecture

The app is intentionally split into replaceable layers:

- `index.html` — semantic shell and UI regions.
- `styles.css` — presentation only; no component logic.
- `app.js` — small modules for state, repository, domain actions, views, and application shell.

The in-browser repository implements the storage port. It can be replaced later with REST, GraphQL, SQLite, or a hosted backend without changing the view layer. Notifications, payments, mapping, identity, and messaging are represented by local adapters so they can be swapped for real providers when needed.

## Prototype coverage

- Customer onboarding and profile context
- Service catalog, search, categories, offers, and pricing
- Address/location selection
- Slot selection and booking creation
- Payment/wallet placeholder flow
- Live order timeline and status updates
- Reschedule/cancel actions
- Partner roster and capacity
- Inventory kit monitoring
- Admin operations dashboard and module health
- Customer support/SOS shortcut
- Role-aware navigation for customer, partner, and administrator experiences

The screen is based on the supplied Bloom requirements and module breakdown, while intentionally keeping external integrations mocked for a fully local demo.
