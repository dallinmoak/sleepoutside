import { renderComponent } from "./utils.mjs";
import ProductListPage from "./components/pages/ProductListPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: ProductListPage });
