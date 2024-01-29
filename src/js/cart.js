import {
  decrementCartItemQuantity,
  incrementCartItemQuantity,
} from "./productDetails.mjs";
import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    const emptyCart = `<h3 class="empty-cart">Your Cart is Empty!</h3>`;
    document.querySelector("#empty-cart-message").innerHTML = emptyCart;
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelectorAll(".increment").forEach((button) =>
      button.addEventListener("click", () => {
        const matchId = button.id.replace("inc-", "");
        incrementCartItemQuantity(matchId);
        renderCartContents();
      })
    );
    document.querySelectorAll(".decrement").forEach((button) =>
      button.addEventListener("click", () => {
        const matchId = button.id.replace("dec-", "");
        decrementCartItemQuantity(matchId);
        renderCartContents();
      })
    );
  }
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
  <button class="increment" id="inc-${item.Id}">+</button>
  <button class="decrement" id="dec-${item.Id}">-</button>
</li>`;

  return newItem;
}

renderCartContents();
