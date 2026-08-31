import { test, expect } from "@playwright/test";
import { getToken, extractToken, getBookingIds, getBooking, createBooking, updateBooking, partialUpdateBooking, deleteBooking } from "../../../utils/resfulBooker/rbAPI";

// Testing Auth on Restful Booker

// Auth token scenarios
test("Auth request - Negative Scenario", async ({ request }) => {
    let wrongToken = await getToken(request, "admin", "incorrectPassword");

    expect(wrongToken).toBeOK();
    expect(await wrongToken.json()).toMatchObject({ reason: "Bad credentials" });
    expect(await wrongToken.json()).not.toHaveProperty("token");
});

test("Auth request", async ({ request }) => {
    let authToken = await getToken(request);

    expect(authToken).toBeOK();
    expect(await authToken.json()).toHaveProperty("token");
    expect(await authToken.json()).not.toMatchObject({ reason: "Bad credentials" });
});

// Booking scenarios
test("GetBookingIds - All IDs Scenario", async ({ request }) => {
    let bookingIds = await getBookingIds(request);

    expect(bookingIds).toBeOK();
    const ids = await bookingIds.json();
    expect(ids.length).toBeGreaterThan(0);
    expect(ids[0]).toHaveProperty("bookingid");
});

test("GetBookingIds - Filter by name Scenario", async ({ request }) => {
    let bookingIds = await getBookingIds(request, "Mark", "Jackson");
    // console.log(await bookingIds.json());
});

test("GetBooking", async ({ request }) => {
    let bookingIdsResponse = await getBookingIds(request);
    let ids = await bookingIdsResponse.json();
    let firstId = ids[0].bookingid.toString();

    let booking = await getBooking(request, firstId);
    expect(booking).toBeOK();

    const properties = ['firstname', 'lastname', 'bookingdates', 'totalprice', 'depositpaid'];
    const body = await booking.json();

    for (const property of properties) {
        expect(body).toHaveProperty(property);
        expect(body[property]).not.toBeNull();
    }
});

test("CreateBooking", async ({ request }) => {
    let newBooking = await createBooking(request, {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        checkin: "2026-01-01",
        checkout: "2026-01-05",
        additionalneeds: "Breakfast"
    });

    expect(newBooking).toBeOK();
    const responseBody = await newBooking.json();
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody.booking).toMatchObject({
        firstname: "Jim",
        lastname: "Brown"
    });
});

test("UpdateBooking", async ({ request }) => {
    const token = await extractToken(request);
    let updatedBooking = await updateBooking(request, token, "1", {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        checkin: "2026-01-01",
        checkout: "2026-01-05",
        additionalneeds: "Breakfast"
    });

    expect(updatedBooking).toBeOK();
    const responseBody = await updatedBooking.json();
    expect(responseBody).toMatchObject({
        firstname: "Jim",
        lastname: "Brown"
    });
});

test("PartialUpdateBooking", async ({ request }) => {
    const token = await extractToken(request);
    let updatedBooking = await partialUpdateBooking(request, token, "1", {
        firstname: "James",
        lastname: "Smith",
    });

    expect(updatedBooking).toBeOK();
    const responseBody = await updatedBooking.json();
    expect(responseBody).toMatchObject({
        firstname: "James",
        lastname: "Smith"
    });
});

test("DeleteBooking", async ({ request }) => {
    const token = await extractToken(request);
    let deletedBooking = await deleteBooking(request, token, "10");

    expect(deletedBooking).toBeOK();
    expect(deletedBooking.status()).toBe(201);
    console.log(await deletedBooking.text());
});

test("PING", async ({ request }) => {
    let ping = await request.get('https://restful-booker.herokuapp.com/ping');
    expect(ping).toBeOK();
    expect(ping.status()).toBe(201);
    expect(await ping.text()).toBe('Created');
});