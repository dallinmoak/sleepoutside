<script>
  import ProductData from "../ProductData.mjs";
  import { addItemToStorageArray, getParam } from "../utils.mjs";
  import {
    animateCartIcon,
    getCartCount,
    adjustCartItemQuantity,
    checkCartForItem,
  } from "../productDetails.mjs";
  import { cartCount } from "../stores.mjs";
  import Button from "./ui/Button.svelte";
  import DiscountIndicator from "./ui/DiscountIndicator.svelte";

  const productId = getParam("product");
  const myProduct = new ProductData();
  let product = myProduct.getProductData(productId);

  const handleAddCart = (newProduct) => {
    const matchId = checkCartForItem(newProduct);
    if (matchId == -1) {
      addItemToStorageArray("so-cart", { ...newProduct, quantity: 1 });
      cartCount.set(getCartCount());
      animateCartIcon();
    } else {
      adjustCartItemQuantity(matchId, 1);
    }
  };
</script>

{#await product}
  <p>Loading...</p>
{:then newProduct}
  {#if !newProduct.error}
    <h3>{newProduct.Brand.Name}</h3>
    <h2 class="divider">{newProduct.NameWithoutBrand}</h2>
    <img
      class="divider"
      src={newProduct.Images.PrimaryExtraLarge}
      alt={newProduct.Name}
    />
    <div class="price">
      <p>${newProduct.FinalPrice}</p>
      <DiscountIndicator
        list={newProduct.ListPrice}
        suggested={newProduct.SuggestedRetailPrice}
      />
    </div>
    <p>{newProduct.Colors[0].ColorName}</p>
    <p>
      {@html newProduct.DescriptionHtmlSimple}
    </p>
    <div>
      <Button onClick={() => handleAddCart(newProduct)} title="Add to Cart"
        >Add to Cart</Button
      >
    </div>
  {:else}
    <p>Product not found</p>
  {/if}
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}

<style>
  img {
    width: 100%;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
