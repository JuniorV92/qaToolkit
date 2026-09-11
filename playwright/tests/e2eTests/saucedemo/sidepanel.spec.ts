import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as sidePanel from "../../../utils/saucedemo/sidePanel";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";

// Testing SauceDemo Inventory Page Side panel

test.describe("Verify Side panel UI", () => {
    test.beforeEach(async ({ page }) => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
        await console.log('After login URL:', page.url());
        await expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
        await expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
    });

    test("Visibility of side panel", async ({ page }) => {
        // Initially the side panel should not be visible
        expect(await sidePanel.isOpen(page)).toBeFalsy();

        // Opening side panel
        await test.step("Opening", async () => {
            await sidePanel.openSidePanel(page);
            expect(await sidePanel.isOpen(page)).toBeTruthy();
        })

        // Closing side panel
        await test.step("Closing", async () => {
            await sidePanel.closeSidePanel(page);
            expect(await sidePanel.isOpen(page)).toBeFalsy();
        })
    });

    test("Side panel menus", async ({ page }) => {
        await sidePanel.openSidePanel(page);
        let options: string[] = await page.locator(sidePanel.SIDE_PANEL).locator("a").allTextContents();
        expect(await options.length).toBe(4);
        expect(await options).toEqual(sidePanel.SIDE_PANEL_OPTIONS);
    })

    test.afterAll(async ({ page }) => {
        await page.close();
    });
});