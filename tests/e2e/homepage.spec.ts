import { test, expect } from '@playwright/test';

test.describe('homepage', () => {
  test('should have a header, and main element', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('section.usa-banner')).toBeVisible();
    // <header /> can exist in <section />, we are checking Global Navigation here
    await expect(page.locator('header.usa-header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);
  });
});
