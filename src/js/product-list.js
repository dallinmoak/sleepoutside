import ProductList from "./components/ProductList.svelte";
import { getParam, renderComponent } from "./utils.mjs";

import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";

const category = getParam("category");

renderComponent("#main-header", MainHeader);
renderComponent("#product-list", ProductList, { category });
renderComponent("#main-footer", MainFooter);
