import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('generates a password when clicking the generate button', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  const result = page.locator('#passwordResult');
  const initialPassword = await result.inputValue();
  expect(initialPassword.length).toBeGreaterThan(0);

  await page.locator('#generateBtn').click();
  const newPassword = await result.inputValue();
  expect(newPassword.length).toBeGreaterThan(0);

  await assertNoConsoleErrors(consoleErrors);
});

test('shows validation error when no character types are selected', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#useLetters').uncheck();
  await page.locator('#useNumbers').uncheck();
  await page.locator('#useSpecial').uncheck();
  await page.locator('#generateBtn').click();

  await expect(page.locator('#errorMsg')).toBeVisible();
  await expect(page.locator('#errorMsg')).toContainText('Please select at least one character type');

  await assertNoConsoleErrors(consoleErrors);
});
