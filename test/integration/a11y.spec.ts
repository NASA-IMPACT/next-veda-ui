import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText(/Data for/i);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('About page', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toHaveText(/About/i);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Not Found page', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('/ohoh');
    await expect(page.locator('h1')).toHaveText(/404 - Page Not Found/i);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
