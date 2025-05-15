import { test, expect } from '@playwright/test';

test.describe('Visit pages', () => {
  test('Visit Center page', async ({ page }) => {
    await page.goto('/visit');

    expect(page.locator('h1')).toHaveText(/Plan your Visit/i);
    expect(page.getByText('The Earth Information Center')).toBeVisible();

    const cardGroup = page.locator('[data-testid="CardGroup"]');
    await expect(cardGroup.locator('[data-testid="Card"]')).toHaveCount(3);
  });

  test('Each card should navigate to the correct page and back', async ({
    page,
  }) => {
    await page.goto('/visit');

    const cards = page.locator('[data-testid="Card"]');
    const cardCount = await cards.count();

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const heading = await card.locator('h2').innerText();
      const link = await card.getByRole('link');

      if (link) {
        await card.click();
        await expect(page).toHaveURL(/visit.*/i);
        await expect(page.locator('h1')).toHaveText(new RegExp(heading, 'i'));
        await page.getByRole('link', { name: 'Back' }).click();
        await expect(page).toHaveURL(/visit/i);
      }
    }
  });

  const visitPages = [
    { id: 'nasa-hq', heading: 'NASA HQ' },
    {
      id: 'kennedy-space-center',
      heading: 'KENNEDY SPACE CENTER',
    },
    {
      id: 'smithsonian-museum',
      heading: 'Smithsonian National Museum of Natural History',
    },
  ];

  for (const { id, heading } of visitPages) {
    test(`${heading} page`, async ({ page }) => {
      await page.goto(`/visit/exhibit/${id}`);
      await expect(page.locator('h1')).toHaveText(heading);
    });
  }
});
