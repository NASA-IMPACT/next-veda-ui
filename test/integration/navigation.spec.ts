import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('user can navigate through main menu and theme pages', async ({ page }, {
    project: {
      metadata: { isMobile },
    },
  }) => {
    // Visit home page
    await page.goto('/');

    // Verify home page elements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);

    // Handle mobile navigation menu
    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      // Wait for menu animation to complete
      await page.waitForTimeout(300);
    }

    // Navigate to about page
    const nav = page.getByTestId('header').getByRole('navigation');
    const aboutNavItem = nav.getByRole('link', { name: 'About' });
    await aboutNavItem.click();

    // Verify navigation to about page
    await expect(page).toHaveURL(/.*about/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('About');

    // Navigate to theme page
    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      await page.waitForTimeout(300);
    }

    // Open the themes dropdown
    await page.locator('button[aria-controls="themesDropDown"]').click();

    // Click air quality theme
    await page.locator('a[href="/themes/air-quality"]').click();

    // Verify navigation to theme page
    await expect(page).toHaveURL('/themes/air-quality');
    await expect(page.locator('h1')).toHaveText('Air Quality');
  });
});
