<script>
  import Cart from "../Cart.svelte";
</script>

<h2>My Cart</h2>
<div id="cart-contents"><Cart /></div>

<style>
  @media screen and (min-width: 1024px) {
    #cart-contents {
      width: 800px;
    }
  }
</style>
