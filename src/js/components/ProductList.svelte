<script>
  import ProductData from "../ProductData.mjs";
  export let category;
  const myProductData = new ProductData(category);
  let productListPromise = myProductData.getCategoryData();
</script>

getCategoryData
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
