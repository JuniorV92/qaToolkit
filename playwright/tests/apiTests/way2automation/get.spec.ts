import { test, expect, request } from "@playwright/test";

test("GET request", async ({ request }) => {
    const response = await request.get("");
});