import { addItemToStorageArray, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { cartCount } from "./stores.mjs";

const myProduct = new ProductData("tents");

let product = {};

export default async function renderProductDetails(productId, selector) {
  product = await myProduct.findProductById(productId);
  const el = document.querySelector(selector);
  el.innerHTML = productDetailsTemplate(product);
  document.getElementById("addToCart").addEventListener("click", () => {
    addToCart(product);
  });
}

export function addToCart(newProduct) {
  const matchId = checkCartForItem(newProduct);
  if (matchId == -1) {
    addItemToStorageArray("so-cart", { ...newProduct, quantity: 1 });
    cartCount.set(getCartCount());
  } else {
    adjustCartItemQuantity(matchId, 1);
  }
}

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
}

function checkCartForItem(newProduct) {
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

function productDetailsTemplate(newProduct) {
  return `<h3>${newProduct.Brand.Name}</h3>
  <h2 class="divider">${newProduct.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${newProduct.Image}"
    alt="${newProduct.Name}"
  />
  <p class="product-card__price">$${newProduct.FinalPrice}</p>
  <p class="product__color">${newProduct.Colors[0].ColorName}</p>
  <p class="product__description">
  ${newProduct.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${newProduct.Id}">Add to Cart</button>
  </div>`;
}
