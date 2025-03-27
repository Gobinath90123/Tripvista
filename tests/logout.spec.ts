import { test, expect } from '@playwright/test';
import { loginCredentials, navigation } from '../utils/test-helpers';

test.describe('Logout Screen Functionality', { tag: ['@E2E'] }, () => {

    test.beforeEach(async ({ page }) => {
        await navigation(page);
    });

    test.describe('UI &  functionality validation', { tag: ['@logout'] }, () => {

        test('TC_LOGOUT_13 : Verify Logout Functionality', { tag: ['@smoke'] }, async ({ page }) => {
            await loginCredentials(page, 'agent@gmail.com', 'SmartWork@1234');

            await expect(page.getByText('Login Successful! Welcome')).toBeVisible();
            await expect(page.getByRole('link', { name: 'Trip Vista' })).toBeVisible();

            const myBalanceLocator = page.locator('div').filter({ hasText: /^MyBalance : ₹[\d,]+\.\d{2}$/ }).nth(2);
            await expect(myBalanceLocator).toBeVisible();

            const balanceText = await myBalanceLocator.textContent();
            console.log('Displayed Balance: ', balanceText);

            await expect(page.getByRole('img', { name: '@simonguo' })).toBeVisible();
            await page.getByText('Sign out').click();
            await expect(page.getByText('Logged out Successfully...')).toBeVisible();
        });

    });
});
