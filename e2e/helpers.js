import { expect } from '@playwright/test';

export const BASE_URL = 'http://localhost:8080';

export function trackConsoleErrors(page) {
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  return consoleErrors;
}

export async function gotoFreshApp(page) {
  await page.goto(BASE_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#passwordResult').waitFor({ state: 'visible' });
}

export async function assertNoConsoleErrors(consoleErrors) {
  const filtered = consoleErrors.filter(
    (text) => !text.includes('cdn.tailwindcss.com') && !text.includes('should not be used in production')
  );
  expect(filtered).toHaveLength(0);
}
