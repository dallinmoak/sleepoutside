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
    href={`/product_pages/index.html?product=${item.Id}`}
    class="cart-card__image"
  >
    <img src={item.Image} alt={item.Name} />
  </a>
  <a href={`/product_pages/index.html?product=${item.Id}`}>
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
