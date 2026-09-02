import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";

// Testing SauceDemo Login

test("Verify valid login", async ({ page }) => {
    await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
    await expect(page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await expect(page.locator(inventoryPage.TITLE)).toHaveText("Products");
    await page.close();
});

test("Verify invalid login", async ({ page }) => {
    await logIn.login(page, process.env.STANDAR_USER!, "incorrect_password");
    const errorContainer = page.locator(logIn.ERROR_MESSAGE_CONTAINER);
    await expect(errorContainer, "Incorrect error message displayed").toHaveText(logIn.LOGIN_ERROR_MESSAGE);
    await expect(page, "Incorrect URL for login page").not.toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await expect(page.locator(inventoryPage.TITLE)).not.toBeVisible();
    await page.close();
});

test("Verify locked account login", async ({ page }) => {
    await logIn.login(page, process.env.LOCKED_OUT_USER!, process.env.PASSWORD!);
    const errorContainer = page.locator(logIn.ERROR_MESSAGE_CONTAINER);
    await expect(errorContainer, "Incorrect error message displayed").toHaveText(logIn.LOCKED_OUT_ERROR_MESSAGE);
    await expect(page, "Incorrect URL for login page").not.toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await expect(page.locator(inventoryPage.TITLE)).not.toBeVisible();
    await page.close();
});

test.skip("Verify problem user login", async ({ page }) => {
    await logIn.login(page, process.env.PROBLEM_USER!, process.env.PASSWORD!);
    await expect(page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await page.close();
});

test.skip("Verify performance glitch user login", async ({ page }) => {
    await logIn.login(page, process.env.PERFORMANCE_GLITCH_USER!, process.env.PASSWORD!);
    await expect(page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await page.close();
});

test.skip("Verify error user login", async ({ page }) => {
    await logIn.login(page, process.env.ERROR_USER!, process.env.PASSWORD!);
    await expect(page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await page.close();
});

test.skip("Verify visual user login", async ({ page }) => {
    await logIn.login(page, process.env.VISUAL_USER!, process.env.PASSWORD!);
    await expect(page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await page.close();
});