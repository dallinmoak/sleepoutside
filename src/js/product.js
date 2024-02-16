import { getParam } from "./utils.mjs";
import renderProductDetails from "./productDetails.mjs";
import { renderComponent } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";

const productId = getParam("product");
renderProductDetails(productId, ".product-detail");

renderComponent("#main-header", MainHeader);
renderComponent("#main-footer", MainFooter);
