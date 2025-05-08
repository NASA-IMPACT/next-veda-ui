import { test, expect } from '@playwright/test';

test.describe('homepage', () => {
  test('should have a header, and main element', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);
  });
});
