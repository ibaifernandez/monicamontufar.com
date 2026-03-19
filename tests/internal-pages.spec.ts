import { test, expect } from '@playwright/test';

test.describe('Internal Pages', () => {
  const routes = [
    '/sobre-mi/',
    '/en/about-me/',
    '/portafolio/',
    '/en/portfolio/'
  ];

  for (const route of routes) {
    test(`Should load ${route} correctly`, async ({ page }) => {
      await page.goto(route);
      
      // Check for title pattern
      await expect(page).toHaveTitle(/Mónica Montúfar/);
      
      // Check that the header H1 is visible
      const heading = page.locator('header h1.font-serif').first();
      await expect(heading).toBeVisible();
    });
  }
});
