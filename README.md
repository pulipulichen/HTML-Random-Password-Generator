[English](./README.md) | [繁體中文](./README_zh_tw.md)

# Random Password Generator

A client-side random password generator with customizable rules, deterministic seed mode, history, multilingual UI, and PWA install support. All generation runs in the browser; preferences and history are stored in `localStorage`.

**Live demo:** [pulipulichen.github.io/HTML-Random-Password-Generator](https://pulipulichen.github.io/HTML-Random-Password-Generator/)

## Features

- **Password generation** — Choose length (8 / 12 / 16 / custom) and character types (letters, numbers, special symbols).
- **Readable letters** — Optional “easy to read” mode that excludes `I`, `l`, `O`, and `o`.
- **Custom special characters** — Edit the allowed symbol set.
- **Deterministic mode** — Enter a seed and target (e.g. site name) to produce the same password for the same rules.
- **History** — Keeps up to 20 recent passwords with copy and per-entry delete.
- **Persistence** — Saves options and history in `localStorage`.
- **i18n** — English and Traditional Chinese (`zh-TW`), with language preference stored in `localStorage`.
- **PWA** — Installable via `manifest.json`; uses a network-only Service Worker (no offline cache).

## Tech Stack

| Layer | Details |
| --- | --- |
| UI | HTML, [Tailwind CSS](https://tailwindcss.com/) (CDN), [Lucide](https://lucide.dev/) icons |
| Logic | Vanilla JavaScript (modular scripts under `scripts/`) |
| Storage | `localStorage` |
| PWA | `manifest.json`, `sw.js` |
| E2E | [Playwright](https://playwright.dev/) in Podman via `compose.yml` |
| CI | GitHub Actions (`.github/workflows/e2e.yml`) |

## Getting Started

### Use online

Open the [live demo](https://pulipulichen.github.io/HTML-Random-Password-Generator/) in a modern browser. No build step is required.

### Run locally

Serve the project root as static files. For example:

```bash
npx http-server . -p 8080
```

Then open `http://localhost:8080`.

### Run E2E tests

Requires [Podman](https://podman.io/) and `podman-compose`:

```bash
npm run start
```

This runs `podman compose up --build --exit-code-from test-runner`. On failure, check `playwright-report/` and `playwright-report-videos/`.

## Project Structure

```text
├── index.html              # Main page
├── manifest.json           # PWA manifest
├── sw.js                   # Network-only Service Worker
├── styles/                 # CSS
├── scripts/
│   ├── core/               # Password generation logic
│   ├── services/           # localStorage
│   ├── ui/                 # DOM, events, history, clipboard
│   ├── utils/              # PRNG helpers
│   └── modules/i18n/       # Translation dictionaries
├── e2e/                    # Playwright specs
├── compose.yml             # Podman Compose for tests
└── Containerfile.test      # Test runner image
```

## License

See [LICENSE](./LICENSE).
