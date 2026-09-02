import { Page, expect } from "@playwright/test";

export const SAUCEDEMO_BASE_URL = "https://www.saucedemo.com";
export const LOGIN_ERROR_MESSAGE = "Epic sadface: Username and password do not match any user in this service";
export const LOCKED_OUT_ERROR_MESSAGE = "Epic sadface: Sorry, this user has been locked out.";
export const ERROR_MESSAGE_CONTAINER = ".error-message-container";

export async function openLoginPage(page: Page) {
    await page.goto(SAUCEDEMO_BASE_URL);
    await page.waitForLoadState("domcontentloaded");
    await expect(page, "Incorrect URL for login page").toHaveURL(SAUCEDEMO_BASE_URL);
}

export async function login(page: Page, username: string, password: string) {
    await openLoginPage(page);
    await page.fill("#user-name", username);
    await page.fill("#password", password);
    await page.click("#login-button");
}