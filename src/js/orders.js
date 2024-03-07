import { renderComponent } from "./utils.mjs";
import OrderPage from "./components/pages/OrderPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: OrderPage });
