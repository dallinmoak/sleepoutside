import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import { renderFooterHeader } from "./utils.mjs";

renderFooterHeader("#main-header", MainHeader);
renderFooterHeader("#main-footer", MainFooter);
