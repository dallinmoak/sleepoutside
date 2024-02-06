import ProductList from "./components/ProductList.svelte";
import { renderFooterHeader } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";

renderFooterHeader("#main-header", MainHeader);
renderFooterHeader("#main-footer", MainFooter);

new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});
