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

test.describe('Theme pages', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('/themes/air-quality');
    await expect(page.locator('h1')).toHaveText(/Air Quality/i);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Dashboard page', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toHaveText(/Explore/i);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Visit page', () => {
  const visitPages = [
    { path: '/visit', heading: /Plan your visit/i },
    { path: '/visit/exhibit/nasa-hq', heading: /NASA HQ/i },
    {
      path: '/visit/exhibit/kennedy-space-center',
      heading: /KENNEDY SPACE CENTER/i,
    },
    {
      path: '/visit/exhibit/smithsonian-museum',
      heading: /Smithsonian National Museum of Natural History/i,
    },
  ];

  for (const { path, heading } of visitPages) {
    test(`should not have any automatically detectable accessibility issues on ${path}`, async ({
      page,
    }, testInfo) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveText(heading);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json',
      });

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
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
