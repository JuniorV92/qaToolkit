import { Page, expect } from "@playwright/test";

export const CART_BADGE = ".shopping_cart_badge";
export const SAUCEDEMO_CART_PAGE_URL = "https://www.saucedemo.com/cart.html";
export const TITLE = ".title";
export const CART_LIST = ".cart_list";
export const CART_ITEM = ".cart_item";

export async function validateCartPageUI(page: Page) {
    await expect(page, "Incorrect URL for cart page").toHaveURL(SAUCEDEMO_CART_PAGE_URL);
    await expect(page.locator(TITLE), "Incorrect Tile For Cart Page").toHaveText("Your Cart");
    await expect(page.getByRole("button", { name: "Continue Shopping" }), "Continue Shopping button is not visible").toBeVisible();
    await expect(page.getByRole("button", { name: "Checkout" }), "Checkout button is not visible").toBeVisible();
    await expect(page.locator(CART_LIST), "Cart list is not visible").toBeVisible();
}

// Get item card by name
export async function getItem(page: Page, name: string) {
    return page.locator(CART_ITEM).filter({ hasText: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') });
}

// Get item price
export async function getItemPrice(page: Page, name: string): Promise<number> {
    const element = page.locator(CART_ITEM).filter({ hasText: name }).locator(".inventory_item_price");
    const price = await element.innerText();
    return parseFloat(price.split("$")[1]);
}