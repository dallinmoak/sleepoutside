<script>
  let categories = [
    {
      cat: "tents",
      img: "tent.svg",
      alt: "Tent Icon from Noun Project: Mustofa Bayu",
      label: "Tents",
    },
    {
      cat: "sleeping-bags",
      img: "sleeping-bag.svg",
      alt: "Sleeping Bag Icon from Noun Project: Mustofa Bayu",
      label: "Sleeping bags",
    },
    {
      cat: "backpacks",
      img: "backpack.svg",
      alt: "Backpack Icon from Noun Project: Mustofa Bayu",
      label: "Backpacks",
    },
    {
      cat: "hammocks",
      img: "hammock.svg",
      alt: "Hammock Icon from Noun Project: Paul Richard",
      label: "Hammocks",
    },
  ];
</script>

<div class="product-categories">
  {#each categories as category}
    <a href={`./product-list/index.html?category=${category.cat}`}>
      <img
        src={`./images/product-category-icons/${category.img}`}
        alt={category.alt}
      />
      {category.label}
    </a>
  {/each}
</div>

<style>
  .product-categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.5em;
  }
  .product-categories a {
    text-decoration: none;
    color: var(--dark-grey);
    padding: 0.5em;
    border: 1px solid var(--light-grey);
    margin: 0.5em;
    border-radius: 0.3em;
    text-align: center;
    width: 45%;
    font-weight: bold;
  }
  .product-categories a:hover {
    background-color: var(--light-grey);
    transition: background-color 0.2s;
  }

  @media (min-width: 500px) {
    .product-categories a {
      flex-wrap: nowrap;
      width: 21%;
    }
  }
</style>
