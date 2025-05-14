import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  async function openMenu(page) {
    await page.getByTestId('navMenuButton').click();
    await expect(
      page.getByTestId('header').getByRole('navigation'),
    ).toBeVisible();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);
  });

  test('user can navigate through the main menu', async ({ page }, {
    project: {
      metadata: { isMobile },
    },
  }) => {
    if (isMobile) await openMenu(page);

    const nav = page.getByTestId('header').getByRole('navigation');

    await nav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('About');

    if (isMobile) await openMenu(page);

    await nav.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/.*dashboard/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Explore');
  });

  test('user can navigate to all theme pages', async ({ page }, {
    project: {
      metadata: { isMobile },
    },
  }) => {
    if (isMobile) await openMenu(page);
    await page.locator('button[aria-controls="themesDropDown"]').click();

    const themeLinks = page.locator('#themesDropDown').getByRole('link');
    const themeCount = await themeLinks.count();
    for (let i = 0; i < themeCount; i++) {
      const themeLink = themeLinks.nth(i);
      const themeText = await themeLink.innerText();

      await themeLink.click();
      await expect(page).toHaveURL(
        new RegExp(`/themes/${themeText.toLowerCase().replace(/\s+/g, '-')}`),
      );
      await expect(page.locator('h1')).toHaveText(new RegExp(themeText, 'i'));

      if (isMobile) await openMenu(page);
      await page.locator('button[aria-controls="themesDropDown"]').click();
    }

    if (isMobile) await page.getByTestId('navCloseButton').click();
  });
});

test.describe('Footer Navigation', () => {
  test('footer navigation links work', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByTestId('footer');
    const nav = footer.getByRole('navigation');
    const footerLinks = nav.getByRole('link');

    for (let i = 0; i < (await footerLinks.count()); i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href) {
        await link.click();
        await expect(page).toHaveURL(href);
        await expect(page.locator('main')).toBeVisible();
        if (href.startsWith('/')) {
          await expect(page.locator('main')).not.toContainText('404');
        }
        await page.goBack();
      }
    }

    // Ensure user can return to the home page
    const homeLink = footer.getByRole('link', { name: 'Earth.gov' });
    await homeLink.click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toHaveText(/DATA FOR.*/i);
  });
});
