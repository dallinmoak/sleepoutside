import { writable } from "svelte/store";
import { getCartCount } from "./productDetails.mjs";

export const cartCount = writable(getCartCount());
