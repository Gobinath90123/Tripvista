
import { test, expect } from '@playwright/test';

test.describe('Forgot Screen Functionality', { tag: ['@E2E'] }, () => {
  test.beforeEach(async ({ page }) => {
    // Visit the login page or main page if already logged in
    await page.goto('https://tripvista.appxpay.in/', { waitUntil: 'load' });
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
    await page.getByRole('link', { name: 'Forgot password?' }).click();
  });

  test('TC_FORGOTPASSWORD_09 : Verify "Forgot Password" functionality', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('TC_FORGOTPASSWORD_10 : Ensure that a valid toast message is displayed when the system is unable to identify the user, stating: "Unable to identify the User."', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('ggdf');
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('TC_FORGOTPASSWORD_11 : Ensure that a valid toast message is displayed when the system is unable to identify the user, stating: "successfully sent the Email""', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('agent@gmail.com');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

});
