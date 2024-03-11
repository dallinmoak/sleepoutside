<script>
  export let orders;
  let ordersSorted = orders.sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });
</script>

<ul>
  {#each ordersSorted as order}
    <li>
      <p>Order ID: {order.id}</p>
      <p>Customer: {`${order.fname} ${order.lname}`}</p>
      <p>Order Date: {new Date(order.orderDate).toDateString()}</p>
      <p>Order Total: ${order.orderTotal}</p>
    </li>
  {/each}
</ul>
