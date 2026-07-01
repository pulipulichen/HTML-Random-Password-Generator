import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('defaults to English and sets html lang attribute', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Random Password Generator');
  await expect(page.locator('h1')).toContainText('Random Password Generator');

  await assertNoConsoleErrors(consoleErrors);
});

test('switches to Traditional Chinese and persists in localStorage', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#language-select').selectOption('zh-TW');

  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  await expect(page).toHaveTitle('隨機密碼產生器');
  await expect(page.locator('h1')).toContainText('隨機密碼產生器');
  await expect(page.locator('#generateBtn')).toContainText('產生密碼');

  const savedLanguage = await page.evaluate(() => localStorage.getItem('pwdGen_language'));
  expect(savedLanguage).toBe('zh-TW');

  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#passwordResult').waitFor({ state: 'visible' });

  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  await expect(page.locator('h1')).toContainText('隨機密碼產生器');

  await assertNoConsoleErrors(consoleErrors);
});

test('updates dynamic history UI text after language switch', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#language-select').selectOption('zh-TW');
  await page.locator('#generateBtn').click();

  await expect(page.locator('#historyList > div').first().getByTitle('點擊複製')).toBeVisible();

  await page.locator('#language-select').selectOption('en');
  await expect(page.locator('#historyList > div').first().getByTitle('Click to copy')).toBeVisible();

  await assertNoConsoleErrors(consoleErrors);
});
