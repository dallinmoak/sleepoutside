<script>
  import ProductData from "../ProductData.mjs";
  export let category;
  const myProductData = new ProductData(category);
  let productListPromise = myProductData.getCategoryData();
</script>

<h2>Top Products: {category}</h2>
<ul class="product-list">
  {#await productListPromise}
    loading.....
  {:then productList}
    {#each productList as product}
      <li class="product-card">
        <a href="/product_pages/index.html?product={product.Id}">
          <img
            src={product.Images.PrimaryMedium}
            alt={product.NameWithoutBrand}
          />
          <h3 class="card__brand">{product.Brand.Name}</h3>
          <h2 class="card__name">{product.NameWithoutBrand}</h2>
          <p class="product-card__price">{product.ListPrice}</p>
        </a>
      </li>
    {/each}
  {:catch error}
    error: {error}
  {/await}
</ul>

<style>
  .product-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    list-style-type: none;
    padding: 0;
  }
  .product-list a {
    text-decoration: none;
    color: var(--dark-grey);
  }
  .product-card {
    flex: 1 1 45%;
    margin: 0.25em;
    padding: 0.5em;
    border: 1px solid var(--light-grey);
    max-width: 250px;
  }
  .product-card h2,
  .product-card h3,
  .product-card p {
    margin: 0.5em 0;
  }

  .card__brand {
    font-size: var(--small-font);
  }

  .card__name {
    font-size: 1em;
  }
</style>
