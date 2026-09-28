# Crypto Exchange Dashboard

Frontend-only dashboard for live cryptocurrency prices from the **Binance WebSocket API**, built with **React**, **TypeScript**, **Zustand**, and **Tailwind CSS**.

The app shows real-time market data, price direction and baseline change, 2% alerts, a live crypto converter, favorites and hidden markets (persisted locally), search and sort (in the URL), and explicit WebSocket connection states with automatic reconnection.

## Demo

<!-- Optional: add a screenshot and/or live URL after deploy -->
<!-- ![Dashboard screenshot](./docs/screenshot.png) -->

Repository: [github.com/gujakupreishvili/Crypto-Exchange-Dashboard](https://github.com/gujakupreishvili/Crypto-Exchange-Dashboard)

## Features

### Real-time market data

- One **shared WebSocket** for all pairs via Binance combined streams (`@miniTicker`).
- Markets: **BTC**, **ETH**, **SOL**, **BNB**, **XRP** (all vs USDT), with display names from `marketNames.ts`.
- Prices update in place (no full page reload).
- Per-tick **direction** (up / down / unchanged) and row styling when the latest tick moves the price.

### Price change and alerts

- The **first price** received for each symbol after load is stored as a **baseline** (kept across reconnects; reset on full page reload).
- **Change %** in the table is vs that baseline.
- When absolute change reaches **≥ 2%**, a toast-style alert shows symbol, initial price, current price, direction, and percentage.
- While price stays beyond 2%, the same symbol does **not** spam alerts; if it drops back under 2% and crosses again, a **new** alert can fire.

### Cryptocurrency converter

- Pick source and target assets, enter an amount, swap currencies.
- Conversion uses **latest live prices**; the result **updates automatically** when those prices change.
- Validation blocks non-numeric input and amounts ≤ 0.

### Search and sorting

- Search by **symbol** or **name**.
- Sort by **name**, **current price**, or **price change** (vs baseline).
- `search` and `sort` live in the **URL query string** (React Router), so refresh and share keep the same view.

### Favorites and hidden markets

- Star favorites; hide markets from the main list.
- Tabs: **All**, **Favorite**, **Hidden** (restore hidden items from the Hidden tab).
- Persisted in `localStorage`: `crypto-favorites`, `crypto-hidden`.

### Connection status

UI states: **loading**, **connected**, **reconnecting**, **disconnected**, **error** (header pill + empty-state messages when the list has no rows).

WebSocket layer:

- Reference-counted **acquire / release** so multiple components share one connection and the socket closes when unused.
- **Reconnect** after unexpected close or error (immediate retry on clean close, delayed retry after error).
- **Stale socket guard**: handlers ignore events from a socket instance that is no longer current.

## Tech stack

| Layer    | Tools                                                                  |
| -------- | ---------------------------------------------------------------------- |
| UI       | React 19, Tailwind CSS 4                                               |
| Language | TypeScript 6                                                           |
| Build    | Vite 8                                                                 |
| State    | Zustand                                                                |
| Routing  | React Router (URL search/sort)                                         |
| Icons    | react-icons                                                            |
| Data     | Binance WebSocket (`wss://stream.binance.com:9443/stream?streams=...`) |
| Quality  | ESLint, Prettier (+ import sort plugin)                                |

## Project structure

Layout matches the repository (feature folders under `components/`, shared hooks under `hook/`).

```text
src/
├── components/
│   ├── alert/                 # 2% price alerts
│   ├── connectStatus/         # WebSocket status pill
│   ├── cryptoConverter/
│   │   └── hook/              # useCryptoConvert
│   ├── cryptoSelect/          # Shared currency dropdown
│   ├── header/
│   ├── market/
│   │   ├── MarketList.tsx
│   │   ├── MarketRow.tsx
│   │   └── hooks/             # favorites, hidden, list filter/sort
│   ├── search/
│   └── sort/
├── data/
│   ├── pairs.ts               # MARKET_PAIRS
│   └── marketNames.ts
├── hook/
│   ├── useAlert.ts
│   ├── useMarketStream.ts     # subscribe + store selectors
│   └── useQueryParams.ts
├── lib/
│   └── price.ts               # % change, tick direction (pure)
├── services/
│   └── binanceSocket.ts       # connect, reconnect, cleanup
├── store/
│   └── marketStore.ts
├── types/
│   ├── market.ts
│   └── CryptoSelectProps.ts
├── App.tsx
├── main.tsx
└── index.css
```

**Separation of concerns**

- **Services** — WebSocket only (no React).
- **Store** — prices, directions, baselines, connection status.
- **Lib** — pure calculations.
- **Hooks** — alerts, stream subscription, URL params; market/converter logic colocated with UI where it is feature-specific.
- **Components** — presentation and user actions.

## Design decisions

1. **Single combined stream** — One URL with multiple `symbol@miniTicker` streams avoids N parallel connections for five pairs.
2. **Subscriber counting** — `acquireMarketStream` / `releaseMarketStream` in `useMarketStream` so Strict Mode and multiple consumers do not leak sockets or open duplicates.
3. **Baselines in the store** — Set once per symbol on first tick; used for table change % and alert threshold logic in `useAlert`.
4. **URL-driven search/sort** — Shareable state without extra global store fields.
5. **localStorage for preferences** — Favorites and hidden lists are user-specific and do not belong in the market store.

## Getting started

### Requirements

- **Node.js** `20.19+`, `22.13+`, or `24+` (see ESLint/Vite engine ranges in `package.json`)
- **npm** (or pnpm/yarn)

### Install and run

```bash
git clone https://github.com/gujakupreishvili/Crypto-Exchange-Dashboard.git
cd Crypto-Exchange-Dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Development server (HMR)       |
| `npm run build`        | `tsc -b` then production build |
| `npm run preview`      | Serve production build locally |
| `npm run ts-check`     | Type-check only (`tsc -b`)     |
| `npm run lint`         | ESLint                         |
| `npm run format`       | Prettier write                 |
| `npm run format:check` | Prettier check (CI-friendly)   |

## Persistence keys

| Key                | Content                      |
| ------------------ | ---------------------------- |
| `crypto-favorites` | JSON array of symbol strings |
| `crypto-hidden`    | JSON array of symbol strings |

## Responsive UI

- Header wraps on small screens; search and sort stay usable.
- Market table scrolls horizontally on narrow viewports.
- Converter stacks beside the market list on large screens (`App` layout).
