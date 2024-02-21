import { renderComponent } from "./utils.mjs";
import CheckoutPage from "./components/pages/CheckoutPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: CheckoutPage });
