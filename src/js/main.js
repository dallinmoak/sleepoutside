import { renderComponent } from "./utils.mjs";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";

renderComponent("#main-header", MainHeader);
renderComponent("#main-footer", MainFooter);
