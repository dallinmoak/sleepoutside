import MainHeader from "./components/MainHeader.svelte";
import Cart from "./components/Cart.svelte";
import MainFooter from "./components/MainFooter.svelte";
import { renderComponent } from "./utils.mjs";

renderComponent("#main-header", MainHeader);
renderComponent("#cart-contents", Cart);
renderComponent("#main-footer", MainFooter);
