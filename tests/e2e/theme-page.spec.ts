import { test, expect } from '@playwright/test';
import { DATA_THEMES } from 'app/constants';

test.describe('Theme pages', () => {
  for (const { title } of DATA_THEMES) {
    const href = `/themes/${title.toLowerCase().replace(/\s+/g, '-')}`;

    if (href) {
      test(`${title} page loads`, async ({ page }) => {
        await page.goto(href);
        await expect(page).toHaveURL(href);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('main')).not.toContainText('404');
        await expect(page.locator('h1')).toHaveText(new RegExp(title, 'i'));
        await page.goBack();
      });
    }
  }

  test('Details of Air Quality page', async ({ page }) => {
    const href = `/themes/air-quality`;
    await page.goto(href);
    await expect(page.getByTestId('theme-hero')).toContainText('Published on');

    await expect(
      page
        .getByTestId('theme-hero')
        .getByRole('heading', { name: 'Air Quality' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Info' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Did you know?' }),
    ).toBeVisible();

    await expect(
      page.getByRole('img', { name: 'Visualization of the ozone' }),
    ).toBeVisible();
  });
});
