import { getParam } from "./utils.mjs";
import { renderComponent } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import Product from "./components/Product.svelte";

const productId = getParam("product");

renderComponent("#main-header", MainHeader);
renderComponent(".product-detail", Product, { productId });
renderComponent("#main-footer", MainFooter);
