import { addItemToStorageArray, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const myProduct = new ProductData("tents");

let product = {};

export default async function renderProductDetails(productId, selector) {
  product = await myProduct.findProductById(productId);
  const el = document.querySelector(selector);
  el.innerHTML = productDetailsTemplate(product);
  document
    .getElementById("addToCart")
    .addEventListener("click", () => addToCart(product));
}

export function addToCart(newProduct) {
  const matchId = checkCartForItem(newProduct);
  if (matchId < 0) {
    addItemToStorageArray("so-cart", { ...newProduct, quantity: 1 });
  } else {
    incrementCartItemQuantity(matchId);
  }
}

function incrementCartItemQuantity(matchId) {
  const cartItems = getLocalStorage("so-cart");
  cartItems[matchId].quantity++;
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

function checkCartForItem(newProduct) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    return -1;
  } else {
    const matchId = cartItems.findIndex((item) => item.Id === newProduct.Id);
    return matchId;
  }
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
