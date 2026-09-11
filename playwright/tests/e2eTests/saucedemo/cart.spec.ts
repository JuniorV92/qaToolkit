import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";
import * as cartPage from "../../../utils/saucedemo/cartPage";

// Testing SauceDemo Cart Page

test.describe("Verify Cart Page UI", () => {
    test.beforeEach(async ({ page }) => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
        await expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
        await expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
        await inventoryPage.openCart(page);
    });

    test("Validate cart page UI", async ({ page }) => {
        await cartPage.validateCartPageUI(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

test.describe("Using cart", () => {
    test.beforeEach(async ({ page }) => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
        await expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
        await expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
    });

    test("Adding item to cart", async ({ page }) => {
        const itemName = "Sauce Labs Backpack";
        let itemPrice: number;

        await test.step("Adding item to cart", async () => {
            itemPrice = await inventoryPage.getItemPrice(page, itemName);
            let testItem = await inventoryPage.getItemButton(page, itemName);
            await testItem.click();
            await expect(testItem).toHaveText("Remove");
            await expect(page.locator(inventoryPage.CART_BADGE)).toHaveText("1");
        });

        await test.step("Opening cart", async () => {
            await inventoryPage.openCart(page);
        });

        await test.step("Validate cart list item", async () => {
            let cartTest = await cartPage.getItem(page, itemName);
            let priceTest = await cartPage.getItemPrice(page, itemName);
            await expect(cartTest).toHaveCount(1);
            await expect(cartTest).toBeVisible();
            await expect(priceTest).toBe(itemPrice);
            await expect(cartTest.locator("button")).toHaveText("Remove");
        });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});