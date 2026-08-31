import { test, expect, request } from "@playwright/test";

// Testing GET Requests on reqres.in

test.skip("GET request", async ({ request }) => {
    const response = await request.get("");
});