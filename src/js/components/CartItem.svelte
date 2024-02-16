<script>
  import { adjustCartItemQuantity } from "../productDetails.mjs";
  export let item;
  export let updateCartItems;
  const handlequantityClick = (id, amount) => {
    adjustCartItemQuantity(id, amount);
    updateCartItems({ ...item, quantity: item.quantity + amount });
  };
</script>

<li class="cart-card divider">
  <a
    href={`/product_pages/index.html?product=${item.Id}&category=${item.Category}`}
    class="cart-card__image"
  >
    <img src={item.Images.PrimaryLarge} alt={item.Name} />
  </a>
  <a href={`/product_pages/index.html?product=${item.Id}&category=${item.Category}`}>
    <h2 class="cart__name">{item.Name}</h2>
  </a>
  <p class="cart-card__color">{item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: {item.quantity}</p>
  <p class="cart-card__price">
    ${(item.FinalPrice * item.quantity).toFixed(2)}
  </p>
  <button
    class="decrement"
    title="decrese quantity by 1"
    id={`decrement-${item.Id}`}
    on:click={() => handlequantityClick(item.Id, -1)}>-</button
  >
  <button
    class="increment"
    title="increase quantity by 1"
    id={`increment-${item.Id}`}
    on:click={() => handlequantityClick(item.Id, 1)}>+</button
  >
</li>

<style>
  .cart-card {
    display: grid;
    grid-template-columns: 25% auto 15%;
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

  @media screen and (min-width: 500px) {
    .cart-card {
      font-size: inherit;
      grid-template-columns: 150px auto 15%;
    }
  }
</style>
