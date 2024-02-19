import { renderComponent } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import ProductCategories from "./components/ProductCategories.svelte";

renderComponent("#main-header", MainHeader);
renderComponent(".products", ProductCategories);
renderComponent("#main-footer", MainFooter);
