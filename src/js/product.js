import { getParam } from "./utils.mjs";
import renderProductDetails from "./productDetails.mjs"; 

const productId = getParam("product"); 
renderProductDetails(productId, ".product-detail"); 

//MOVED TO productDetails.mjs

// const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   addItemToStorageArray("so-cart", product);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);


// const myProduct = new ProductData("tents"); 
// async function getProduct() {
//   const currentProduct = await myProduct.findProductById(productId); 
//   console.log(currentProduct); 
// }
// getProduct(); 


