import { renderComponent } from "./utils.mjs";
import CartPage from "./components/pages/CartPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: CartPage });
