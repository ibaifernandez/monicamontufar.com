import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Quality Gate: A11y and Visual Regression', () => {
  const pages = [
    { name: 'Home ES', url: '/' },
    { name: 'Home EN', url: '/en/' },
    { name: 'About ES', url: '/sobre-mi/' }
  ];

  for (const { name, url } of pages) {
    test(`[${name}] should pass accessibility checks`, async ({ page }) => {
      await page.goto(url);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`[${name}] should match visual baseline`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${name.replace(/\s+/g, '-').toLowerCase()}-baseline.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05
      });
    });
  }
});
