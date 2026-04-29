import { test, expect } from '@playwright/test';

test.describe('Internal Pages', () => {
  // Pages that render full HTML content
  const contentRoutes = [
    '/sobre-mi/',
    '/en/about-me/',
  ];

  for (const route of contentRoutes) {
    test(`Should load ${route} correctly`, async ({ page }) => {
      await page.goto(route);

      // Check for title pattern
      await expect(page).toHaveTitle(/Mónica Montúfar/);

      // Check that the header H1 is visible
      const heading = page.locator('header h1.font-serif').first();
      await expect(heading).toBeVisible();
    });
  }

  // Portfolio routes redirect permanently (301) to portafolio.monicamontufar.com
  // Playwright follows the redirect; we just verify it doesn't 404
  const redirectRoutes = [
    '/portafolio/',
    '/en/portfolio/',
  ];

  for (const route of redirectRoutes) {
    test(`${route} redirects without error`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'commit' });
      // Accept any 2xx or 3xx (Playwright follows redirects and resolves to final 2xx)
      expect(response?.status()).toBeLessThan(400);
    });
  }
});
