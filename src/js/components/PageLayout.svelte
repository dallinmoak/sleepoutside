<script>
  import MainHeader from "./MainHeader.svelte";
  import MainFooter from "./MainFooter.svelte";
  export let PageComponent;
</script>

<MainHeader />
<main class="divider"><svelte:component this={PageComponent} /></main>
<MainFooter />

<style>
  main {
    z-index: 0;
    padding-top: 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
