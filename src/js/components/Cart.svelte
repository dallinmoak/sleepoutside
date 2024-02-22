<script>
  import { getLocalStorage } from "../utils.mjs";
  import { getTotalPrice } from "../productDetails.mjs";
  import CartItem from "./CartItem.svelte";
  import Button from "./ui/Button.svelte";

  let cartItems = getLocalStorage("so-cart") || [];
  let totalPrice = getTotalPrice();
  let updateCartItems = (updateItem) => {
    const newCartItems = cartItems;
    const targetIndex = cartItems.findIndex(
      (item) => updateItem.Id === item.Id,
    );

    if (updateItem.quantity < 1) {
      newCartItems.splice(targetIndex, 1);
    } else {
      newCartItems[targetIndex] = updateItem;
    }
    totalPrice = getTotalPrice();
    cartItems = newCartItems;
  };
</script>

{#if cartItems.length === 0}
  <h3 class="empty-cart">Your Cart is Empty!</h3>
{:else}
  <ul class="product-list">
    {#each cartItems as item}
      <CartItem {item} {updateCartItems} />
    {/each}
  </ul>
  <div class="cart-footer hide">
    <span id="cart-total">Total: ${totalPrice}</span>
  </div>
  <a href="/checkout/index.html"><Button>Check Out</Button></a>
{/if}

<style>
  #cart-total {
    margin: 1rem;
    padding: 1rem;
  }
  ul {
    list-style-type: none;
    padding: 0 0.5em;
  }
</style>
