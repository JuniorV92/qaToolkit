import { Page, expect } from "@playwright/test";

export const ALL_PRODUCTS = [
    {
        name: "Sauce Labs Backpack",
        price: 29.99,
        description: "carry.allTheThings() with the sleek, red Sauce Labs Backpack. Includes a laptop sleeve.",
        image: "/sauce-labs-backpack.jpg"
    },
    {
        name: "Sauce Labs Bike Light",
        price: 9.99,
        description: "A red light à la French Bicycle style that clips to your bike or backpack. Legs are adjustable so you can shine bright from any angle.",
        image: "/sauce-labs-bike-light.jpg"
    },
    {
        name: "Sauce Labs Bolt T-Shirt",
        price: 15.99,
        description: "Get your day started with the best looking T-shirt on the market. Cream colored with red "
    },
    {
        name: "Sauce Labs Fleece Jacket",
        price: 49.99,
        description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
        image: "/sauce-labs-fleece-jacket.jpg"
    },
    {
        name: "Sauce Labs Onesie",
        price: 7.99,
        description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
        image: "/sauce-labs-onesie.jpg"
    },
    {
        name: "Test.allTheThings() T-Shirt (Red)",
        price: 15.99,
        description: "This classic Sauce Labs T-Shirt is perfect for any occasion. Made from 100% cotton, it's comfortable, durable, and stylish.",
        image: "/test.allTheThings() t-shirt (red).jpg"
    },
];