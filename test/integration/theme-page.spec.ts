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

    // Navigate to theme page
    if (isMobile) {
      await page.getByTestId('navMenuButton').click();
      await page.waitForTimeout(300);
    }

    // click on the themes dropdown
    await page.locator('button[aria-controls="themesDropDown"]').click();

    // click on the themes dropdown item
    await page.locator('a[href="/themes/air-quality"]').click();

    // expect to be on the theme page
    await expect(page).toHaveURL('/themes/air-quality');

    // hero includes pub date
    await expect(page.getByTestId('theme-hero')).toContainText(
      'Published on November 27, 2023',
    );
  });
});
