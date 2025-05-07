import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('user can navigate through main menu and theme pages', async ({ page }, {
    project: {
      metadata: { isMobile },
    },
  }) => {
    await page.goto('/');

    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);

    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      await page.waitForTimeout(300);
    }

    const nav = page.getByTestId('header').getByRole('navigation');
    const aboutNavItem = nav.getByRole('link', { name: 'About' });
    await aboutNavItem.click();

    await expect(page).toHaveURL(/.*about/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('About');

    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      await page.waitForTimeout(300);
    }

    await page.locator('button[aria-controls="themesDropDown"]').click();
    await page.locator('a[href="/themes/air-quality"]').click();
    await expect(page).toHaveURL('/themes/air-quality');
    await expect(page.locator('h1')).toHaveText('Air Quality');
  });
});
