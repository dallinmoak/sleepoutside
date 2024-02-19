<script>
  import { adjustCartItemQuantity } from "../productDetails.mjs";
  import Buttton from "./ui/buttton.svelte";
  export let item;
  export let updateCartItems;
  const handlequantityClick = (id, amount) => {
    adjustCartItemQuantity(id, amount);
    updateCartItems({ ...item, quantity: item.quantity + amount });
  };
</script>

<li class="cart-card divider">
  <a
    href={`/product_pages/index.html?product=${item.Id}`}
    class="cart-card__image"
  >
    <img src={item.Images.PrimaryLarge} alt={item.Name} />
  </a>
  <a href={`/product_pages/index.html?product=${item.Id}`}>
    <h2 class="cart__name">{item.Name}</h2>
  </a>
  <p class="cart-card__color">{item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <div class="quantity-wrapper">
      <div>
        <Buttton
          size="small"
          title="decrease quantity by 1"
          onClick={() => handlequantityClick(item.Id, -1)}>-</Buttton
        >
      </div>
      <p>qty: {item.quantity}</p>
      <div>
        <Buttton
          size="small"
          title="increase quantity by 1"
          onClick={() => handlequantityClick(item.Id, +1)}>+</Buttton
        >
      </div>
    </div>
  </div>
  <p class="cart-card__price">
    ${(item.FinalPrice * item.quantity).toFixed(2)}
  </p>
  <div>
    <button
      class="close"
      type="button"
      title="remove item from cart"
      on:click={() => handlequantityClick(item.Id, -1 * item.quantity)}
      >x</button
    >
  </div>
</li>

<style>
  .cart-card {
    display: grid;
    width: 100%;
    grid-template-columns: 25% auto 15% 2em;
    font-size: var(--small-font);
    /* max-height: 120px; */
    align-items: center;
  }
  .cart-card__image {
    grid-row: 1/3;
    grid-column: 1;
  }
  .cart-card p {
    margin-top: 0;
  }
  .cart__name {
    grid-row: 1;
    grid-column: 2;
  }

  .cart-card__color {
    grid-row: 2;
    grid-column: 2;
  }

  .cart-card__quantity {
    grid-row: 1;
    grid-column: 3;
  }

  .cart-card__price {
    grid-row: 2;
    grid-column: 3;
  }

  .quantity-wrapper {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    margin: 1em;
  }

  .quantity-wrapper > * {
    margin: 0.5em;
  }
  .quantity-wrapper > p {
    margin: 0 0.5em;
    text-wrap: nowrap;
  }

  div:has(> .close) {
    height: 90%;
  }

  button.close {
    background-color: var(--alert);
    color: white;
    border-radius: 50%;
    border: none;
    padding: 0.3em;
    height: 2em;
    width: 2em;
    font-size: 0.8em;
    cursor: pointer;
  }

  button.close:active {
    background-color: var(--alert-dark);
  }

  @media (hover: hover) {
    button.close:hover {
      background-color: var(--alert-dark);
    }
  }

  @media screen and (min-width: 500px) {
    .cart-card {
      font-size: inherit;
      grid-template-columns: 150px auto 15% 2em;
    }

    .quantity-wrapper {
      flex-direction: row;
    }

    .quantity-wrapper > * {
      margin: 0;
    }
  }
</style>
