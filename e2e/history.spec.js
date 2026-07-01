import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('adds generated password to history list', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  const password = await page.locator('#passwordResult').inputValue();
  const historyItems = page.locator('#historyList > div');
  await expect(historyItems).toHaveCount(1);
  await expect(historyItems.first()).toContainText(password);

  await assertNoConsoleErrors(consoleErrors);
});

test('clears all history after confirmation', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  page.on('dialog', (dialog) => dialog.accept());
  await page.locator('#clearHistoryBtn').click();

  await expect(page.locator('#emptyHistoryMsg')).toBeVisible();
  await expect(page.locator('#historyList > div')).toHaveCount(0);

  await assertNoConsoleErrors(consoleErrors);
});

test('removes a single history entry when delete is clicked', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await page.locator('input[name="length"][value="8"]').check();
  await page.locator('#generateBtn').click();
  await page.locator('input[name="length"][value="16"]').check();
  await page.locator('#generateBtn').click();
  await expect(page.locator('#historyList > div')).toHaveCount(2);

  await page.locator('#historyList > div').first().getByTitle('Delete this entry').click();
  await expect(page.locator('#historyList > div')).toHaveCount(1);

  await assertNoConsoleErrors(consoleErrors);
});
