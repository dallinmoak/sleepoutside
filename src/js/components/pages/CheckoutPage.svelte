<script>
  import { cartCount as count } from "../../stores.mjs";
  import { getTotalPrice } from "../../productDetails.mjs";
  import Button from "../ui/Button.svelte";
  import ProductData from "../../ProductData.mjs";
  import { getLocalStorage } from "../../utils.mjs";

  const checkOutData = new ProductData();

  let subtotal = getTotalPrice();
  console.log(count);
  $: shipping = 10 + $count * 2;
  const taxRate = 0.06;
  $: tax = subtotal * taxRate;
  $: orderTotal = parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax);
  const handlePlaceOder = async (e) => {
    const order = {};
    order.items = getLocalStorage("so-cart").map((cartItem) => ({
      id: cartItem.Id,
      name: cartItem.Name,
      price: cartItem.FinalPrice,
      quantity: cartItem.quantity,
    }));
    order.orderDate = new Date().toISOString();
    const data = new FormData(e.currentTarget);
    data.forEach((val, key) => {
      order[key] = val;
    });
    order.orderTotal = orderTotal;
    order.shipping = shipping;
    order.tax = tax;
    console.log(order);
    console.log(data.entries);
    const response = await checkOutData.postOrder(order);
    console.log(response);
  };
</script>

<h2>Review & Place your Order</h2>

<form method="POST" on:submit|preventDefault={handlePlaceOder}>
  <fieldset>
    <lEgend>Shipping</lEgend>
    <label for="fname">First Name</label>
    <input type="text" name="fname" />
    <label for="lname">Last Name</label>
    <input type="text" name="lname" />
    <label for="street">Street</label>
    <input type="text" name="street" />
    <label for="city">City</label>
    <input type="text" name="city" />
    <label for="state">State</label>
    <input type="text" name="state" />
    <label for="zip">Zip</label>
    <input type="text" name="zip" />
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card Number</label>
    <input type="text" name="cardNumber" />
    <label for="expiration">Expiration Date</label>
    <input type="text" name="expiration" />
    <label for="code">Security Code</label>
    <input type="text" name="code" />
  </fieldset>
  <fieldset>
    <legend>Order Summary</legend>
    <span>Item Subtotal({$count}):</span>
    <span>{subtotal}</span>
    <span>Shipping Estimate</span>
    <span>{shipping}</span>
    <span>Tax</span>
    <span>{tax}</span>
    <span>Order Total</span>
    <span>{orderTotal}</span>
  </fieldset>
  <Button type="submit">Real Check Out</Button>
</form>
