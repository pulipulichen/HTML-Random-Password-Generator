[English](./README.md) | [繁體中文](./README_zh_tw.md)

# 隨機密碼產生器

在瀏覽器端運作的隨機密碼產生器，支援自訂規則、種子固定密碼、歷史紀錄、多語系介面與 PWA 安裝。密碼產生完全在本地完成，偏好設定與歷史紀錄儲存於 `localStorage`。

**線上示範：** [pulipulichen.github.io/HTML-Random-Password-Generator](https://pulipulichen.github.io/HTML-Random-Password-Generator/)

## 功能重點

- **密碼產生** — 可選擇長度（8 / 12 / 16 / 自訂）與字元類型（英文、數字、特殊符號）。
- **易識別字母** — 可排除 `I`、`l`、`O`、`o`，降低混淆。
- **自訂特殊符號** — 可編輯允許使用的符號集合。
- **固定密碼模式** — 輸入種子與目標文字（例如網站名稱），在相同規則下產生固定密碼。
- **歷史紀錄** — 最多保留 20 筆，支援複製與單筆刪除。
- **自動儲存** — 偏好設定與歷史紀錄寫入 `localStorage`。
- **多語系** — 支援 English 與繁體中文（`zh-TW`），語系選擇會存入 `localStorage`。
- **PWA** — 可透過 `manifest.json` 安裝；Service Worker 僅轉發網路請求，**不提供離線快取**。

## 技術堆疊

| 層級 | 說明 |
| --- | --- |
| 介面 | HTML、[Tailwind CSS](https://tailwindcss.com/)（CDN）、[Lucide](https://lucide.dev/) 圖示 |
| 邏輯 | 原生 JavaScript（模組化腳本位於 `scripts/`） |
| 儲存 | `localStorage` |
| PWA | `manifest.json`、`sw.js` |
| E2E | 透過 `compose.yml` 在 Podman 中執行 [Playwright](https://playwright.dev/) |
| CI | GitHub Actions（`.github/workflows/e2e.yml`） |

## 使用方式

### 線上使用

以現代瀏覽器開啟[線上示範](https://pulipulichen.github.io/HTML-Random-Password-Generator/)即可，無需建置步驟。

### 本機執行

將專案根目錄以靜態檔案方式提供服務，例如：

```bash
npx http-server . -p 8080
```

再開啟 `http://localhost:8080`。

### 執行 E2E 測試

需安裝 [Podman](https://podman.io/) 與 `podman-compose`：

```bash
npm run start
```

此指令會執行 `podman compose up --build --exit-code-from test-runner`。若測試失敗，可查看 `playwright-report/` 與 `playwright-report-videos/`。

## 專案結構

```text
├── index.html              # 主頁面
├── manifest.json           # PWA manifest
├── sw.js                   # 僅網路轉發的 Service Worker
├── styles/                 # CSS
├── scripts/
│   ├── core/               # 密碼產生核心邏輯
│   ├── services/           # localStorage
│   ├── ui/                 # DOM、事件、歷史、剪貼簿
│   ├── utils/              # PRNG 工具
│   └── modules/i18n/       # 語系字典
├── e2e/                    # Playwright 測試
├── compose.yml             # Podman Compose 測試環境
└── Containerfile.test      # 測試映像
```

## 授權

請參閱 [LICENSE](./LICENSE)。
