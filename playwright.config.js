// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 60000,

  expect: {
    timeout: 10000
  },

  use: {
    browserName: 'chromium',
    headless: false,
    // baseURL: 'http://127.0.0.1:3000', // Uncomment if needed
  },

  reporter: 'html',
});