import { addItemToStorageArray, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

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
  } else {
    incrementCartItemQuantity(matchId);
  }
}

export function incrementCartItemQuantity(matchId, amount = 1) {
  const cartItems = getLocalStorage("so-cart");
  const newCartItems = cartItems.map((item) => {
    if (item.Id === matchId) {
      item.quantity += amount;
    }
    return item;
  });
  localStorage.setItem("so-cart", JSON.stringify(newCartItems));
}

export function decrementCartItemQuantity(matchId, amount = 1) {
  const cartItems = getLocalStorage("so-cart");
  const newCartItems = cartItems
    .map((item) => {
      if (item.Id === matchId) {
        if (item.quantity == 1) {
          // if the quantity is 1, remove the item from the cart instead of having a quantity of 0
          return null;
        }
        item.quantity -= amount;
      }
      return item;
    })
    .filter((item) => item !== null);
  localStorage.setItem("so-cart", JSON.stringify(newCartItems));
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
  let cartCount = 0;
  if (cartItems) {
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  return cartCount;
  // const cartCountElement = document.getElementById("cartCount");
  // if (cartCountElement) {
  //   cartCountElement.textContent = cartCount;
  // }
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
