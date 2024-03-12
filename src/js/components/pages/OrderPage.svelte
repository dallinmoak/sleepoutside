<script>
  import { checkLogin } from "../../auth.mjs";
  import ProductData from "../../ProductData.mjs";
  import OrdersList from "../OrdersList.svelte";
  let auth = null;
  auth = checkLogin("Orders");
  let ordersPromise = null;
  if (auth) {
    console.log("authed, attempting to fetch orders");
    const myOrdersConnection = new ProductData();
    ordersPromise = myOrdersConnection.getOrders();
  }
</script>

{#if auth}
  {#await ordersPromise}
    <div>loading...</div>
  {:then orders}
    <OrdersList {orders} />
  {:catch e}
    <p>Error: {JSON.stringify(e)}</p>
  {/await}
{:else}
  <div>⛔401: not authorized ⛔</div>
{/if}
