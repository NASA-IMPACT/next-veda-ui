import { test, expect } from '@playwright/test';
import { DATA_THEMES, DATA_INTERACTIVES } from '../../app/constants';
import { DATA_CENTERS } from '../../app/constants';

test.describe('Explore Page', () => {
  test('should be accessible and display content correctly', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page).toHaveURL('/explore');

    const h1 = page.getByRole('heading', { name: /explore/i, level: 1 });
    const h2 = page.getByRole('heading', {
      name: /learn about earth themes/i,
      level: 2,
    });
    await expect(h1).toBeVisible();
    await expect(h2).toBeVisible();

    for (const theme of DATA_THEMES) {
      const card = page.getByRole('link', {
        name: `View ${theme.title} theme details.`,
      });
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('href', `/themes/${theme.id}`);
    }
  });

  test('should navigate to theme pages correctly', async ({ page }) => {
    await page.goto('/explore');
    const theme = DATA_THEMES[0];
    const card = page.getByRole('link', {
      name: `View ${theme.title} theme details.`,
    });

    await card.click();
    await expect(page).toHaveURL(`/themes/${theme.id}`);
    await expect(
      page
        .getByTestId('theme-hero')
        .getByRole('heading', { name: theme.title }),
    ).toBeVisible();
  });

  test('should navigate to interactives correctly', async ({ page }) => {
    await page.goto('/explore');

    const interactiveHeading = page.getByRole('heading', {
      name: /interactives/i,
      level: 2,
    });
    await expect(interactiveHeading).toBeVisible();

    const carousels = page.locator('section.carousel');
    const carousel = carousels.nth(1);
    await expect(carousel).toBeVisible();

    const nextButton = carousel.getByRole('button', { name: /next/i });
    await nextButton.click();

    await page.waitForTimeout(500);

    const secondInteractive = DATA_INTERACTIVES[1];
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

    expect(newPage.url()).toContain(secondInteractive.url);

    await newPage.close();
  });

  test('should display all center cards with correct info and links', async ({
    page,
  }) => {
    await page.goto('/explore');
    const h2 = page.getByRole('heading', {
      name: /explore our centers/i,
      level: 2,
    });
    await expect(h2).toBeVisible();

    for (const center of DATA_CENTERS) {
      // Check title
      const title = await page.getByRole('heading', {
        name: center.title,
        level: 3,
      });
      await expect(title).toBeVisible();
      // Check description
      await expect(page.getByText(center.description)).toBeVisible();
      // Check link
      const link = page.getByRole('link', {
        name: `Visit ${center.title} center.`,
      });
      await expect(link).toBeVisible();
      if (center.url) {
        await expect(link).toHaveAttribute('href', center.url);
      }
    }
  });

  test('should navigate to center pages when center card is clicked', async ({
    page,
  }) => {
    await page.goto('/explore');
    for (const center of DATA_CENTERS) {
      if (!center.url) continue;

      const link = page.getByRole('link', {
        name: `Visit ${center.title} center.`,
      });

      // Click the link and verify it opens in a new tab with the external URL
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        link.click(),
      ]);

      await newPage.waitForLoadState();
      expect(newPage.url()).toBe(center.url);
      await newPage.close();
    }
  });
});
