<script>
  import { cartCount as count } from "../../stores.mjs";
  import { getTotalPrice } from "../../productDetails.mjs";
  import Button from "../ui/Button.svelte";
  import FormFieldGroup from "../ui/FormFieldGroup.svelte";
  import { getLocalStorage, setLocalStorage } from "../../utils.mjs";
  import ProductData from "../../ProductData.mjs";
  import { beforeUpdate } from "svelte";
  import AlertMessage from "../AlertMessage.svelte";

  let subtotal = getTotalPrice();
  $: shipping = 10 + $count * 2;
  const taxRate = 0.06;
  const tax = subtotal * taxRate;
  $: orderTotal = parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax);
  let orderState = "pending";
  let orderResData = {};

  const handleSubmit = async (e) => {
    let order = {};
    order.orderDate = new Date().toISOString();
    const data = Object.fromEntries(new FormData(e.target));
    order = { ...order, ...data };
    order.items = getLocalStorage("so-cart").map((item) => {
      return {
        id: item.Id,
        quantity: item.quantity,
        name: item.Name,
        price: item.FinalPrice,
      };
    });
    order.orderTotal = orderTotal;
    order.shipping = shipping;
    order.tax = tax;
    const checkoutConnection = new ProductData();
    const res = await checkoutConnection.postOrder(order);
    orderState = res.ok ? "success" : "failed";
    orderResData = await res.json();
    window.scrollTo(0, 0);
    if (res.ok) {
      setLocalStorage("so-cart", []);
      count.set(0);
    }
  };

  //NOTE: fieldGroups depends on calculated values, and so has to be set in beforeUpdate (setting values normally results in calculated values being undefined)
  let fieldGroups = [];
  beforeUpdate(() => {
    fieldGroups = [
      {
        legend: "Shipping",
        fields: [
          {
            id: "fname",
            label: "First Name",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "lname",
            label: "Last Name",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "street",
            label: "Street",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "city",
            label: "City",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "state",
            label: "State",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "zip",
            label: "Zip",
            type: "number",
            readOnly: false,
            value: null,
            required: true,
          },
        ],
      },
      {
        legend: "Payment",
        fields: [
          {
            id: "cardNumber",
            label: "Card Number",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "expiration",
            label: "Expiration Date",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
          {
            id: "code",
            label: "Security Code",
            type: "text",
            readOnly: false,
            value: null,
            required: true,
          },
        ],
      },
      {
        legend: "Order Summary",
        fields: [
          {
            id: "subtotal",
            label: `Item Subtotal(${$count}):`,
            type: "number",
            readOnly: true,
            value: `$${parseFloat(subtotal).toFixed(2)}`,
          },
          {
            id: "shipping",
            label: "Shipping Estimate:",
            type: "number",
            readOnly: true,
            value: `$${shipping.toFixed(2)}`,
          },
          {
            id: "tax",
            label: "Tax:",
            type: "number",
            readOnly: true,
            value: `$${tax.toFixed(2)}`,
          },
          {
            id: "orderTotal",
            label: "Order Total:",
            type: "number",
            readOnly: true,
            value: `$${orderTotal.toFixed(2)}`,
          },
        ],
      },
    ];
  });

  let CheckoutHeadingMap = {
    pending: "Review & Place your Order",
    success: "Order Placed 👍",
    failed: "Order Failed 👎",
  };
  $: checkoutHeading = CheckoutHeadingMap[orderState];
</script>

{#if ($count <= 0 && orderState !== "success") || orderResData == {}}
  <p>Your cart is empty; no order to process</p>
{:else}
  <div class="checkout-wrapper">
    <h2>{checkoutHeading}</h2>
    {#if orderState != "success"}
      {#each Object.keys(orderResData) as alert}
        <AlertMessage message={`${orderResData[alert]}`}></AlertMessage>
      {/each}
      <form on:submit|preventDefault={handleSubmit}>
        {#each fieldGroups as group}
          <FormFieldGroup fields={group.fields} legend={group.legend} />
        {/each}
        <Button type="submit" title="Place Order"
          >{orderState == "failed" ? "Try Again" : "Place Order"}</Button
        >
      </form>
    {:else if orderState === "success"}
      <p>Thank you for your order.</p>
      <p>Your order number is: {orderResData.orderId}</p>
      <a class="button" href="/"><Button>Back to Browsing</Button></a>
    {:else if orderState === "failed"}
      <p>Sorry, there was a problem placing your order.</p>
    {/if}
  </div>
{/if}

<style>
  h2 {
    color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
    font-weight: 700;
    padding: 0.5em 0;
    border-width: 3px 0;
    text-align: center;
  }

  .checkout-wrapper {
    padding-bottom: 1em;
  }
</style>
