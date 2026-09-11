import { Page, expect } from "@playwright/test";

export const SIDE_PANEL_BUTTON = "#react-burger-menu-btn";
export const SIDE_PANEL_CLOSE = "#react-burger-cross-btn";
export const SIDE_PANEL = ".bm-menu";
export const SIDE_PANEL_OPTIONS = [
    "All Items",
    "Dynamic Catalog",
    "About",
    "Logout",
    "Reset App State"
];

// Open sidepanel menu
export async function openSidePanel(page: Page) {
    await page.click(SIDE_PANEL_BUTTON);
    await page.waitForTimeout(1000);
}

// Close sidepanel menu
export async function closeSidePanel(page: Page) {
    await page.click(SIDE_PANEL_CLOSE);
    await page.waitForTimeout(1000);
}

// Click sidepanel option
export async function clickSidePanelOption(page: Page, option: string) {
    await page.locator(`a[id*='sidebar_link']`, { hasText: option }).click();
}

// Is sidepanel open
export async function isOpen(page: Page): Promise<boolean> {
    const sidePanel = page.locator(SIDE_PANEL);
    return await sidePanel.isVisible();
}