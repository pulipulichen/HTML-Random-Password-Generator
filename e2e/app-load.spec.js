import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('loads the homepage with title and main controls', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  await expect(page).toHaveTitle('Random Password Generator');
  await expect(page.locator('h1')).toContainText('Random Password Generator');
  await expect(page.locator('#passwordResult')).toBeVisible();
  await expect(page.locator('#useLetters')).toBeVisible();
  await expect(page.locator('#historyList')).toBeVisible();

  await assertNoConsoleErrors(consoleErrors);
});
