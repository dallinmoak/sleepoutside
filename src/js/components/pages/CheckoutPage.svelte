<script>
    import { cartCount as count} from "../../stores.mjs";
    import { getTotalPrice } from "../../productDetails.mjs";
    
    let subtotal = getTotalPrice();
    console.log(count)
    $: shipping = 10 + $count * 2;
    const taxRate=0.06;
    $: tax = subtotal*taxRate;
    $: orderTotal = parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax);
</script>

<h2>Review & Place your Order</h2>
<form>
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
</form>