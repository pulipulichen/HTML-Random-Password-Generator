import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('produces deterministic password when seed and target are set', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#seedInput').fill('e2e-test-seed');
  await page.locator('#targetInput').fill('ExampleSite');
  await page.waitForTimeout(300);

  const firstPassword = await page.locator('#passwordResult').inputValue();
  expect(firstPassword.length).toBeGreaterThan(0);

  await page.locator('#generateBtn').click();
  const secondPassword = await page.locator('#passwordResult').inputValue();
  expect(secondPassword).toBe(firstPassword);

  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#targetInput').fill('ExampleSite');
  await page.waitForTimeout(300);

  const afterReloadPassword = await page.locator('#passwordResult').inputValue();
  expect(afterReloadPassword).toBe(firstPassword);

  await assertNoConsoleErrors(consoleErrors);
});

test('toggles seed visibility when clicking the show/hide button', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await expect(page.locator('#seedInput')).toHaveAttribute('type', 'password');

  await page.locator('#toggleSeedBtn').click();
  await expect(page.locator('#seedInput')).toHaveAttribute('type', 'text');

  await page.locator('#toggleSeedBtn').click();
  await expect(page.locator('#seedInput')).toHaveAttribute('type', 'password');

  await assertNoConsoleErrors(consoleErrors);
});
