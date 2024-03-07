import { renderComponent } from "./utils.mjs";
import LoginPage from "./components/pages/LoginPage.svelte";
import PageLayout from "./components/PageLayout.svelte";

renderComponent("body", PageLayout, { PageComponent: LoginPage });
