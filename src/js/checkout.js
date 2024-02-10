import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import { renderComponent } from "./utils.mjs";

renderComponent("#main-header", MainHeader);
renderComponent("#main-footer", MainFooter);
