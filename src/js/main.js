import { renderComponent } from "./utils.mjs";
import Home from "./components/pages/Home.svelte";
import PageLayout from "./components/PageLayout.svelte";
renderComponent("body", PageLayout, { PageComponent: Home });
