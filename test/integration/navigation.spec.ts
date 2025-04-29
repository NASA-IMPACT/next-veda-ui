import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have a header, and main element', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);
  });

  test('navigates to the correct page when a nav item is clicked', async ({
    page,
  }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation');
    const aboutNavItem = nav.getByRole('link', { name: 'About' });
    await aboutNavItem.click();
    await expect(page).toHaveURL(/.*about/i);
  });

  test.skip('navigates to the correct page when a dropdown item is clicked', async ({
    page,
  }) => {
    await page.goto('/');

    const dropdownButton = page.getByRole('button', { name: /themes/i });
    await dropdownButton.click();

    const dropdownItem = page.getByRole('menuitem', { name: 'Air Quality' });
    await dropdownItem.click();

    expect(window.location.pathname).toBe('/air-quality');
  });
});
