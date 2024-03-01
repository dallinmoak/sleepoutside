<script>
  import { cartCount as count } from "../../stores.mjs";
  import { getTotalPrice } from "../../productDetails.mjs";
  import Button from "../ui/Button.svelte";
  import FormFieldGroup from "../ui/FormFieldGroup.svelte";
  import { getLocalStorage } from "../../utils.mjs";
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
    // window.location = "/";
    // history.pushState({}, "", "/");
    orderState = res.ok ? "success" : "failed";
    orderResData = await res.json();
    if (res.ok) {
      //TODO: clear cart
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
            value: `$${subtotal}`,
          },
          {
            id: "shipping",
            label: "Shipping Estimate:",
            type: "number",
            readOnly: true,
            value: `$${shipping}`,
          },
          {
            id: "tax",
            label: "Tax:",
            type: "number",
            readOnly: true,
            value: `$${tax}`,
          },
          {
            id: "orderTotal",
            label: "Order Total:",
            type: "number",
            readOnly: true,
            value: `$${orderTotal}`,
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

<h2>{checkoutHeading}</h2>
{#if orderState == "failed"}
  {#each Object.keys(orderResData) as alert}
    <AlertMessage message={`${orderResData[alert]}`}></AlertMessage>
  {/each}
{/if}
{#if orderState != "success"}
  <form on:submit|preventDefault={handleSubmit}>
    {#each fieldGroups as group}
      <FormFieldGroup fields={group.fields} legend={group.legend} />
    {/each}
    <Button type="submit" title="Place Order"
      >{orderState == "failed" ? "Try Again" : "Place Order"}</Button
    >
  </form>
{/if}
{#if orderState === "success"}
  <p>Thank you for your order.</p>
  <p>Your order number is: {orderResData.orderId}</p>
{/if}
{#if orderState === "failed"}
  <p>Sorry, there was a problem placing your order.</p>
{/if}
{#if orderState === "success"}
  <a class="button" href="/"><Button>Back to Browsing</Button></a>
{/if}

<style>
  h2 {
    color: white;
    background-color: var(--tertiary-color);
    padding: 0.5em;
    border-radius: 0.2em;
  }
</style>
