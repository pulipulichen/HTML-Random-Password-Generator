# 0.0.1

Initial release of the HTML Random Password Generator.

### Added

- Single-page random password generator built with HTML, CSS, and JavaScript.
- Password length presets (8, 12, 16) and custom length (4–128 characters).
- Character set options: letters, numbers, and special symbols.
- Letter modes: standard mixed case and easy-to-read (excludes `I`, `l`, `O`, `o`).
- Customizable special-character set with a sensible default.
- Deterministic password mode using seed and target text (same inputs always produce the same password).
- One-click copy for the generated password, with clipboard fallback.
- Password history (up to 20 entries) with timestamps, per-item delete, and clear-all.
- Automatic persistence of preferences and history via `localStorage`.
- Responsive two-column layout (generator + history sidebar) styled with Tailwind CSS.
- Lucide icons and Traditional Chinese (`zh-TW`) UI.
