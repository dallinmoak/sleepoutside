import { getParam } from "./utils.mjs";
import renderProductDetails from "./productDetails.mjs";

const productId = getParam("product");
renderProductDetails(productId, ".product-detail");
