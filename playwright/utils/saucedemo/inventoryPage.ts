import { Page, expect } from "@playwright/test";

export const SAUCEDEMO_INVENTORY_PAGE_URL = "https://www.saucedemo.com/inventory.html";
export const TITLE = ".title";
export const LOGO = ".app_logo";
export const SHOPPING_CART = ".shopping_cart_link";
export const BURGER_MENU = "#react-burger-menu-btn";
export const INVENTORY_CONTAINER = ".inventory_container";
export const INVENTORY_ITEM = ".inventory_item";
export const SORT_DROPDOWN = ".product_sort_container";
export const SIDE_PANEL_BUTTON = "#react-burger-menu-btn";

// Get item card by name
export async function getItem(page: Page, name: string) {
    return page.locator(INVENTORY_ITEM).filter({ hasText: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') });
}

// Get all items
export async function getAllItems(page: Page) {
    return page.locator(INVENTORY_ITEM);
}

// Get all items names
export async function getAllItemsNames(page: Page): Promise<string[]> {
    return page.$$eval(".inventory_item_name", elements => elements.map(el => el.textContent?.trim() || ""));
}

// Get all items prices
export async function getAllItemsPrices(page: Page): Promise<number[]> {
    let values = await page.$$eval(".inventory_item_price", elements => elements.map(el => el.textContent?.trim() || ""));
    // Removing special characters from prices
    let cleanedValues = values.map(value => value.replace("$", ""));
    // Convert to numbers
    let numberValues = cleanedValues.map(value => parseFloat(value));
    return numberValues;
}

// Get item price
export async function getItemPrice(page: Page, name: string): Promise<number> {
    const element = page.locator(INVENTORY_ITEM).filter({ hasText: name }).locator(".inventory_item_price");
    const price = await element.innerText();
    return parseFloat(price.split("$")[1]);
}

// Get item description
export async function getItemDescription(page: Page, name: string): Promise<string> {
    const description = page.locator(INVENTORY_ITEM).filter({ hasText: name }).locator(".inventory_item_desc");
    const text = await description.innerText();
    return text;
}

// Get item image
export async function getItemImage(page: Page, name: string) {
    return page.locator(INVENTORY_ITEM).filter({ hasText: name }).locator("img");
}

// Get item button
export async function getItemButton(page: Page, name: string) {
    return page.locator(INVENTORY_ITEM).filter({ hasText: name }).locator("button");
}

// Validate item card UI
export async function validateItemCardUI(page: Page, name: string) {
    expect(await getItem(page, name)).toBeVisible();
    let price = await getItemPrice(page, name);
    let description = await getItemDescription(page, name);
    let image = await getItemImage(page, name);
    let button = await getItemButton(page, name);

    expect(await image).toBeVisible();
    expect(await button).toBeVisible();

    expect(await price).toBeGreaterThan(0);
    expect(await description).not.toEqual("");
    await expect(image).toHaveAttribute("alt", name);
    await expect(button).toHaveText("Add to cart");
}

// Validate main elements of page are visible
export async function validatePageUI(page: Page) {
    expect(await page.locator(TITLE)).toHaveText("Products");
    expect(await page.locator(LOGO)).toBeVisible();
    expect(await page.locator(SHOPPING_CART)).toBeVisible();
    expect(await page.locator(BURGER_MENU)).toBeVisible();
    expect(await page.locator(INVENTORY_CONTAINER)).toBeVisible();
}