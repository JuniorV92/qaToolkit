import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";
import * as products from "../../../utils/saucedemo/products";

// Testing SauceDemo Inventory Page

test("Verify inventory page UI", async ({ page }) => {
    await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
    expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    inventoryPage.validatePageUI(page);
    const items = await inventoryPage.getAllItems(page);
    expect(await items.count()).toBeGreaterThan(0);
    expect(await page.locator(inventoryPage.SORT_DROPDOWN)).toBeVisible();
    // Asserting item "Sauce Labs Backpack"
    await inventoryPage.validateItemCard(page, "Sauce Labs Backpack");
    await page.close();
});

test.skip("dummy test for products object", async ({ page }) => {
    let prod1 = products.ALL_PRODUCTS[0];
    expect(prod1.name).toEqual("Sauce Labs Backpack");
    expect(prod1.price).toEqual(29.99);
    expect(prod1.description).toEqual("carry.allTheThings() with the sleek, red Sauce Labs Backpack. Includes a laptop sleeve.");
    expect(prod1.image).toEqual("/sauce-labs-backpack.jpg");
    await page.close();
});