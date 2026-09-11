import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as sidePanel from "../../../utils/saucedemo/sidePanel";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";

// Testing SauceDemo Inventory Page Side panel

test.describe("Verify Side panel UI", () => {
    test.beforeEach(async ({ page }) => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
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
        expect(await options.length).toBe(5);
        expect(await options).toEqual(sidePanel.SIDE_PANEL_OPTIONS);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

test.describe("Verify Side panel Links", () => {
    test.beforeEach(async ({ page }) => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
        await expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
        await expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
        await sidePanel.openSidePanel(page);
        await expect(await sidePanel.isOpen(page)).toBeTruthy();
    });

    test("All Items link", async ({ page }) => {
        // Clicking All Items link
        await test.step("Clicking All Items link", async () => {
            await sidePanel.clickSidePanelOption(page, "All Items");
            expect(await page).toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
            expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
        });

        await test.step("Closing side panel", async () => {
            await sidePanel.closeSidePanel(page);
            expect(await sidePanel.isOpen(page)).toBeFalsy();
        });

        await test.step("Verify results", async () => {
            await expect(await page).toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
            await expect(await page.locator(inventoryPage.TITLE)).toHaveText("Products");
        });
    });

    test("About link", async ({ page }) => {
        // Clicking About link
        await test.step("Clicking About link", async () => {
            await sidePanel.clickSidePanelOption(page, "About");
        });

        await test.step("Verify results", async () => {
            await expect(await page).toHaveURL("https://saucelabs.com/");
        });
    });

    test("Logout link", async ({ page }) => {
        // Clicking About link
        await test.step("Clicking About link", async () => {
            await sidePanel.clickSidePanelOption(page, "Logout");
        });

        await test.step("Verify results", async () => {
            expect(await page).toHaveURL("https://www.saucedemo.com/");
        });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});