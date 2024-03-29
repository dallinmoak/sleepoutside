import { getLocalStorage } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

export function adjustCartItemQuantity(matchId, amount = 1) {
  const cartItems = getLocalStorage("so-cart");
  const newCartItems = cartItems
    .map((item) => {
      if (item.Id === matchId) {
        if (item.quantity + amount <= 0) {
          return null;
        }
        item.quantity += amount;
      }
      return item;
    })
    .filter((item) => item !== null);
  localStorage.setItem("so-cart", JSON.stringify(newCartItems));
  cartCount.set(getCartCount());
  animateCartIcon();
}

export function checkCartForItem(newProduct) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    return -1;
  } else {
    const match = cartItems.find((item) => item.Id === newProduct.Id);
    const matchId = match ? match.Id : -1;
    return matchId;
  }
}

export function getCartCount() {
  const cartItems = getLocalStorage("so-cart");
  let currentCartCount = 0;
  if (cartItems) {
    currentCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
  return currentCartCount;
}

export function getTotalPrice() {
  const cartItems = getLocalStorage("so-cart");
  let totalPrice = 0;
  if (cartItems) {
    totalPrice = cartItems.reduce(
      (total, item) => total + item.FinalPrice * item.quantity,
      0
    );
  }
  return totalPrice.toFixed(2);
}

export function animateCartIcon() {
  const cartIcon = document.querySelector(".cart");
  cartIcon.classList.remove("animate");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("animate");
}
