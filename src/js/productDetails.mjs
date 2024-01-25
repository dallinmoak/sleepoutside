import { addItemToStorageArray } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const myProduct = new ProductData("tents"); 

async function addToCartHandler(e) {
    const product = await myProduct.findProductById(e.target.dataset.id);
    addProductToCart(product);
}

export default async function renderProductDetails(productId, selector) {
    const currentProduct = await myProduct.findProductById(productId); 
    console.log(currentProduct); 
    console.log(selector); 
    document.querySelector(selector).innerHTML = productDetailsTemplate(currentProduct); 
    document
        .getElementById("addToCart")
        .addEventListener("click", addToCartHandler);
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  // add a listener to Add to Cart button
}

export function addProductToCart(product) {
    addItemToStorageArray("so-cart", product);
}

function productDetailsTemplate(product) {
    return `${product.Name}`;
}