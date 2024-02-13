import {
  adjustCartItemQuantity,
  animateCartIcon,
  getTotalPrice,
} from "./productDetails.mjs";
import { getLocalStorage } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import { renderComponent } from "./utils.mjs";
import { get } from "svelte/store";

renderComponent("#main-header", MainHeader);
renderComponent("#main-footer", MainFooter);

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    const emptyCart = `<h3 class="empty-cart">Your Cart is Empty!</h3>`;
    document.querySelector("#empty-cart-message").innerHTML = emptyCart;
    document.querySelector(".product-list").innerHTML = "";
    document.querySelector("#cart-total").innerHTML = "";
  } else {
    document.querySelector("#empty-cart-message").innerHTML = "";
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    addButtonListeners(".increment", 1);
    addButtonListeners(".decrement", -1);
    document.querySelector(
      "#cart-total"
    ).innerHTML = `Total: $${getTotalPrice()}`;
  }
}

function addButtonListeners(selector, amount) {
  document.querySelectorAll(selector).forEach((button) =>
    button.addEventListener("click", () => {
      const matchId = button.id.replace(`${selector.replace(".", "")}-`, "");
      adjustCartItemQuantity(matchId, amount);
      renderCartContents();
      animateCartIcon();
    })
  );
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(
    2
  )}</p>
  <button class="decrement" title="decrese quantity by 1" id="decrement-${
    item.Id
  }">-</button>
  <button class="increment" title="increase quantity by 1" id="increment-${
    item.Id
  }">+</button>
</li>`;

  return newItem;
}

renderCartContents();
