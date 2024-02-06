import { getParam } from "./utils.mjs";
import renderProductDetails from "./productDetails.mjs";
import { renderFooterHeader } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";

const productId = getParam("product");
renderProductDetails(productId, ".product-detail");

renderFooterHeader("#main-header", MainHeader);
renderFooterHeader("#main-footer", MainFooter);
