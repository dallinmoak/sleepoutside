import { renderComponent } from "./utils.mjs";
import ProductPage from "./components/pages/ProductPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: ProductPage });
