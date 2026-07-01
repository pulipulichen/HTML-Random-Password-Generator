import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('generates password with selected length of 8 characters', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('input[name="length"][value="8"]').check();
  await page.locator('#generateBtn').click();

  const password = await page.locator('#passwordResult').inputValue();
  expect(password).toHaveLength(8);

  await assertNoConsoleErrors(consoleErrors);
});

test('generates password with custom length', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#customLengthRadio').check();
  await page.locator('#customLengthInput').fill('10');
  await page.locator('#generateBtn').click();

  const password = await page.locator('#passwordResult').inputValue();
  expect(password).toHaveLength(10);

  await assertNoConsoleErrors(consoleErrors);
});

test('disables letter sub-options when letters are unchecked', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('#useLetters').uncheck();
  await expect(page.locator('#letterOptions')).toHaveClass(/opacity-50/);
  await expect(page.locator('#letterOptions')).toHaveClass(/pointer-events-none/);

  await page.locator('#useLetters').check();
  await expect(page.locator('#letterOptions')).not.toHaveClass(/opacity-50/);

  await assertNoConsoleErrors(consoleErrors);
});
