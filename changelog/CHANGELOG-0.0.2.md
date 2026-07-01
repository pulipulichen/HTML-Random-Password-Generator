# 0.0.2

Expanded the project with modular frontend architecture, PWA support, multilingual UI, and automated E2E testing infrastructure.

## Added

- Modular JavaScript structure under `scripts/` (`core`, `ui`, `services`, `utils`, and `modules/i18n`).
- English and Traditional Chinese (`zh-TW`) translation dictionaries with runtime language switching and persisted language preference.
- PWA assets and configuration (`manifest.json`, favicon assets, and `sw.js` network-only service worker).
- Playwright E2E test suite covering app load, generation rules, history, i18n, PWA behavior, and deterministic seed mode.
- Podman-based test environment files (`compose.yml`, `Containerfile.test`) and npm script for E2E execution.
- GitHub Actions workflow for running E2E tests and uploading Playwright artifacts on failure.

## Changed

- Refactored `index.html` to load external `styles/main.css` and modular script files instead of inline-heavy logic.
- Improved app metadata and installability setup with manifest, theme color, and favicon declarations.

## Documentation

- Updated `README.md` with current architecture, PWA details, and Podman-based E2E instructions.
- Added `README_zh_tw.md` for Traditional Chinese documentation parity.

## Tooling

- Added `.gitignore` and `.jshintrc` to standardize workspace hygiene and JavaScript linting configuration.
