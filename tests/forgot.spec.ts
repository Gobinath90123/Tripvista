import { test, expect } from '@playwright/test';

test.describe('Forgot Screen Functionality', { tag: ['@E2E'] }, () => {

test('TC_01 : Verify "Forgot Password" functionality', async ({ page }) => {
  await page.goto('https://tripvista.appxpay.in/', { waitUntil: 'load' });
  await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

});