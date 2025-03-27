import { test, expect } from '@playwright/test';
import { loginCredentials, navigation } from '../utils/test-helpers';

test.describe('Login Screen Functionality', { tag: ['@E2E'] }, () => {

    test.beforeEach(async ({ page }) => {
        await navigation(page);
    });

    test('TC_LOGIN_01 : Verify the systems response when attempting to log in without entering credentials.', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Please enter a valid email')).toBeVisible();
        await expect(page.getByText('Password must be at least 8')).toBeVisible();
    });

    test('TC_LOGIN_02 : Verify the systems response when attempting to log in with only the email details entered.', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('agent@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Password must be at least 8')).toBeVisible();
    });

    test('TC_LOGIN_03 : Verify the systems response when attempting to log in with only the password details entered.', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('Smartwork@123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Please enter a valid email')).toBeVisible();
    });

    test('TC_LOGIN_04 : Verify the systems response when attempting to log in with invalid credentials.', async ({ page }) => {
        await loginCredentials(page, 'ghvhvh@gmail.com', 'Smartwojjb');
        await expect(page.getByText('Invalid username or password.').first()).toBeVisible();
        await expect(page.getByText('Invalid username or password.').nth(1)).toBeVisible();
    });

    test('TC_LOGIN_05 : Verify successful login to the Trip Vista application with valid credentials.', async ({ page }) => {
        await loginCredentials(page, 'agent@gmail.com', 'SmartWork@1234');
        await expect(page.getByText('Login Successful! Welcome')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Trip Vista' })).toBeVisible();
    });

    test('TC_LOGIN_06 : Verify the Sign-Up link in the login page.', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByText('Agent Register')).toBeVisible();
    });

    test('TC_LOGIN_07 : Verify that the "Eye" icon in the password field toggles the visibility of the entered password correctly.', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('agent@gmail.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('SmartWork@1234');
        await expect(page.getByRole('button').filter({ hasText: /^$/ })).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await expect(page.getByRole('textbox', { name: 'Enter your password' })).toHaveValue('SmartWork@1234');
    });

    test('TC_LOGIN_08 : Verify usernames & MyBalance are displayed correctly in the right-side corner of the Dashboard Page.', async ({ page }) => {
        await loginCredentials(page, 'agent@gmail.com', 'SmartWork@1234');

        await expect(page.getByText('Login Successful! Welcome')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Trip Vista' })).toBeVisible();

        const myBalanceLocator = page.locator('div').filter({ hasText: /^MyBalance : ₹[\d,]+\.\d{2}$/ }).nth(2);
        await expect(myBalanceLocator).toBeVisible();

        const balanceText = await myBalanceLocator.textContent();
        console.log('Displayed Balance: ', balanceText);

        await expect(page.getByRole('img', { name: '@simonguo' })).toBeVisible();
    });

});
