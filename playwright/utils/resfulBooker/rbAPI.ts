import { APIRequestContext, APIResponse } from "@playwright/test";

export const RESTFUL_BOOKER_BASE_URL = "https://restful-booker.herokuapp.com";

/**
 * Sends a POST request to the /auth endpoint of Restful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @param username Username for authentication (defaults to "admin").
 * @param password Password for authentication (defaults to "password123").
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function getToken(
    request: APIRequestContext,
    username: string = "admin",
    password: string = "password123"
): Promise<APIResponse> {
    return await request.post(`${RESTFUL_BOOKER_BASE_URL}/auth`, {
        data: {
            username,
            password
        }
    });
}

/**
 * Calls the getToken function and extracts the token string from the response.
 * @param request Playwright APIRequestContext instance.
 * @param username Username for authentication (defaults to "admin").
 * @param password Password for authentication (defaults to "password123").
 * @returns Token string
 */
export async function extractToken(
    request: APIRequestContext,
    username?: string,
    password?: string
): Promise<string> {
    const tokenResponse = await getToken(request, username, password);
    const tokenData = await tokenResponse.json();
    return tokenData.token;
}

/**
 * Sends a GET request to the /booking endpoint of Resful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function getBookingIds(
    request: APIRequestContext,
    firstName?: string,
    lastName?: string,
    checkIn?: Date,
    checkOut?: Date
): Promise<APIResponse> {
    const params: Record<string, string | number | boolean> = {};

    if (firstName !== undefined) params.firstname = firstName;
    if (lastName !== undefined) params.lastname = lastName;
    if (checkIn !== undefined) params.checkin = checkIn.toISOString().split("T")[0];
    if (checkOut !== undefined) params.checkout = checkOut.toISOString().split("T")[0];

    return await request.get(`${RESTFUL_BOOKER_BASE_URL}/booking`, {
        params
    });
}

/**
 * Sends a GET request to the /booking/:id endpoint of Resful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function getBooking(
    request: APIRequestContext,
    bookingId: string
): Promise<APIResponse> {
    return await request.get(`${RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`);
}

export interface BookingPayload {
    firstname?: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    checkin: string | Date;
    checkout: string | Date;
    additionalneeds?: string;
}

/**
 * Sends a POST request to the /booking endpoint of Resful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @param bookingData Single spec object containing booking details.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function createBooking(
    request: APIRequestContext,
    bookingData: BookingPayload
): Promise<APIResponse> {
    const {
        firstname,
        lastname,
        totalprice,
        depositpaid,
        checkin,
        checkout,
        additionalneeds
    } = bookingData;

    const formattedCheckin = checkin instanceof Date ? checkin.toISOString().split("T")[0] : checkin;
    const formattedCheckout = checkout instanceof Date ? checkout.toISOString().split("T")[0] : checkout;

    return await request.post(`${RESTFUL_BOOKER_BASE_URL}/booking`, {
        data: {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin: formattedCheckin,
                checkout: formattedCheckout
            },
            ...(additionalneeds !== undefined && { additionalneeds })
        }
    });
}

/**
 * Sends a PUT request to the /booking/:id endpoint of Restful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @param bookingId Booking id to update.
 * @param bookingData Single spec object containing booking details.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function updateBooking(
    request: APIRequestContext,
    token: string,
    bookingId: string,
    bookingData: BookingPayload
): Promise<APIResponse> {
    const {
        firstname,
        lastname,
        totalprice,
        depositpaid,
        checkin,
        checkout,
        additionalneeds
    } = bookingData;

    const formattedCheckin = checkin instanceof Date ? checkin.toISOString().split("T")[0] : checkin;
    const formattedCheckout = checkout instanceof Date ? checkout.toISOString().split("T")[0] : checkout;

    return await request.put(`${RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin: formattedCheckin,
                checkout: formattedCheckout
            },
            ...(additionalneeds !== undefined && { additionalneeds })
        }
    });
}

/**
 * Sends a PATCH request to the /booking/:id endpoint of Restful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @param bookingId Booking id to update.
 * @param bookingData Single spec object containing booking details, in this case can be partial.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function partialUpdateBooking(
    request: APIRequestContext,
    token: string,
    bookingId: string,
    bookingData: Partial<BookingPayload>
): Promise<APIResponse> {
    const {
        firstname,
        lastname,
        totalprice,
        depositpaid,
        checkin,
        checkout,
        additionalneeds
    } = bookingData;

    const formattedCheckin = checkin instanceof Date ? checkin.toISOString().split("T")[0] : checkin;
    const formattedCheckout = checkout instanceof Date ? checkout.toISOString().split("T")[0] : checkout;

    return await request.patch(`${RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin: formattedCheckin,
                checkout: formattedCheckout
            },
            ...(additionalneeds !== undefined && { additionalneeds })
        }
    });
}

/**
 * Sends a DELETE request to the /booking/:id endpoint of Restful Booker.
 *
 * @param request Playwright APIRequestContext instance.
 * @param bookingId Booking id to update.
 * @returns Promise<APIResponse> representing the HTTP response.
 */
export async function deleteBooking(
    request: APIRequestContext,
    token: string,
    bookingId: string
): Promise<APIResponse> {
    return await request.delete(`${RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });
}