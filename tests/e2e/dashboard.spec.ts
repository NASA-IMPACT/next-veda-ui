import { test, expect } from '@playwright/test';
import { DATA_THEMES, DATA_INTERACTIVES } from '../../app/constants';

test.describe('Dashboard Page', () => {
  test('should be accessible and display content correctly', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page).toHaveURL('/dashboard');

    const h1 = page.getByRole('heading', { name: /explore/i, level: 1 });
    const h2 = page.getByRole('heading', {
      name: /learn about earth themes/i,
      level: 2,
    });
    await expect(h1).toBeVisible();
    await expect(h2).toBeVisible();

    for (const theme of DATA_THEMES) {
      const card = page.getByRole('link', {
        name: new RegExp(theme.title, 'i'),
      });
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('href', `/themes/${theme.id}`);
    }
  });

  test('should navigate to theme pages correctly', async ({ page }) => {
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

  test('should navigate to interactives correctly', async ({ page }) => {
    await page.goto('/dashboard');

    const interactiveHeading = page.getByRole('heading', {
      name: /interactive tools/i,
      level: 2,
    });
    await expect(interactiveHeading).toBeVisible();

    const carousels = page.locator('section.carousel');
    const carousel = carousels.nth(1);
    await expect(carousel).toBeVisible();

    const nextButton = carousel.getByRole('button', { name: /next/i });
    await nextButton.click();

    await page.waitForTimeout(500);

    const secondInteractive = DATA_INTERACTIVES[1]; // Hometown Dashboard
    const card = carousel.getByRole('link', {
      name: new RegExp(secondInteractive.title, 'i'),
    });
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('href', secondInteractive.url);

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      card.click(),
    ]);

    await newPage.waitForLoadState();

    expect(newPage.url()).toBe(secondInteractive.url);

    await newPage.close();
  });
});
