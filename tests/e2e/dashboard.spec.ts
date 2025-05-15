import { test, expect } from '@playwright/test';
import { DATA_THEMES } from '../../app/constants';

test.describe('Dashboard Page', () => {
  test('should be accessible from home page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(
      page.getByRole('heading', { name: /explore/i, level: 1 }),
    ).toBeVisible();
  });

  test('should be accessible directly via URL', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(
      page.getByRole('heading', { name: /explore/i, level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: /learn about earth themes/i,
        level: 2,
      }),
    ).toBeVisible();
  });

  test('should display all theme cards', async ({ page }) => {
    await page.goto('/dashboard');

    for (const theme of DATA_THEMES) {
      const card = page.getByRole('link', {
        name: new RegExp(theme.title, 'i'),
      });
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('href', `/themes/${theme.id}`);
    }
  });

  test('should navigate to a theme page correctly', async ({ page }) => {
    await page.goto('/dashboard');

    const theme = DATA_THEMES[0];
    const card = page.getByRole('link', { name: new RegExp(theme.title, 'i') });

    await card.click();
    await expect(page).toHaveURL(`/themes/${theme.id}`);
    await expect(
      page
        .getByTestId('theme-hero')
        .getByRole('heading', { name: theme.title }),
    ).toBeVisible();
  });
});
