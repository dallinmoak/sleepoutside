import { addItemToStorageArray } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const myProduct = new ProductData("tents"); 

// async function addToCartHandler(e) {
//     const product = await myProduct.findProductById(e.target.dataset.id);
//     addProductToCart(product);
// }  

let product = {}; 

export default async function renderProductDetails(productId, selector) {
    product = await myProduct.findProductById(productId); 
    console.log(product);
    const el = document.querySelector(selector); 
    el.innerHTML = productDetailsTemplate(product); 
    document.getElementById("addToCart").addEventListener("click", ()=> addToCart(product));
    
    // const currentProduct = await myProduct.findProductById(productId); 
    // document.querySelector(selector).innerHTML = productDetailsTemplate(currentProduct); 
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  // add a listener to Add to Cart button
}

export function addToCart(product) {
    addItemToStorageArray("so-cart", product);
}

function productDetailsTemplate(product) {
    return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Image}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}