import { test, expect } from '@playwright/test';

test.describe('Theme page', () => {
  test('On the home page, click on the Themes dropdown takes to a theme page', async ({
    page,
  }, {
    project: {
      metadata: { isMobile },
    },
  }) => {
    await page.goto('/');

    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      await page.waitForTimeout(300);
    }

    await page.locator('button[aria-controls="themesDropDown"]').click();

    await page.locator('a[href="/themes/air-quality"]').click();

    await expect(page).toHaveURL('/themes/air-quality');

    await expect(page.getByTestId('theme-hero')).toContainText(
      'Published on November 27, 2023',
    );
  });
});
