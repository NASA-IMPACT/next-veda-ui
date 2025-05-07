import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/integration',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    navigationTimeout: 60000,
    browserName: 'chromium',
  },
  projects: [
    {
      name: 'Mobile',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
      },
      metadata: {
        isMobile: true,
      },
    },
    {
      name: 'Tablet',
      use: {
        viewport: { width: 820, height: 1180 },
        isMobile: true,
      },
      metadata: {
        isMobile: true,
      },
    },
    {
      name: 'Desktop',
      use: {
        viewport: { width: 1280, height: 720 },
        isMobile: false,
      },
      metadata: {
        isMobile: false,
      },
    },
  ],
  webServer: {
    command: 'yarn dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
