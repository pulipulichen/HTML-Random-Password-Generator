import { test, expect } from '@playwright/test';
import { gotoFreshApp, trackConsoleErrors, assertNoConsoleErrors } from './helpers.js';

test('exposes a valid web app manifest', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  const manifestLink = page.locator('link[rel="manifest"]');
  await expect(manifestLink).toHaveAttribute('href', 'manifest.json');

  const manifestHref = await manifestLink.getAttribute('href');
  const response = await page.request.get(`http://localhost:8080/${manifestHref}`);
  expect(response.ok()).toBeTruthy();

  const manifest = await response.json();
  expect(manifest.name).toBe('Random Password Generator');
  expect(manifest.display).toBe('standalone');
  expect(manifest.icons.length).toBeGreaterThan(0);

  await assertNoConsoleErrors(consoleErrors);
});

test('registers a network-only service worker', async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoFreshApp(page);

  const swRegistered = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const registration = await navigator.serviceWorker.getRegistration();
    return Boolean(registration && registration.active);
  });

  expect(swRegistered).toBeTruthy();

  await assertNoConsoleErrors(consoleErrors);
});
