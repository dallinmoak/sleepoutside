<script>
  import ProductCategories from "../ProductCategories.svelte";
</script>

<div class="hero">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    src="/images/banner-sm.jpg"
    srcset="images/banner-sm.jpg 500w, images/banner.jpg"
    alt="photo of a high mountain lake"
  />
  <div class="logo logo--square">
    <img src="/images/noun_Tent_2517.svg" alt="tent for logo" />
    <div>Sleep<span class="highlight">Outside</span></div>
  </div>
</div>
<section class="mission">
  <p>We spend too much time these days indoors...sitting usually.</p>
  <p>No wonder we are a mess!</p>
  <p>
    What we really need is to get outside...in fact SLEEP outside. Our mission
    is to provide you with everything you need to do this comfortably at an
    affordable price.
  </p>
</section>
<section class="products"><ProductCategories /></section>

<style>
  .mission {
    padding: 0 0.5em;
    /* margin: 0.5em 0; */
    line-height: 1.3;
    max-width: 600px;
    margin: auto;
  }
  .hero {
    position: relative;
  }
  .hero .logo {
    position: absolute;
    left: calc(50% - 60px);
    bottom: -10px;
    background-color: white;
  }
  .logo--square {
    font-size: var(--small-font);
    width: 110px;
    height: 80px;

    flex-direction: column;
    align-items: flex-end;
    box-shadow: 1px 1px 4px var(--light-grey);
    justify-content: center;
    align-items: center;
    line-height: 1;
  }
  .logo--square img {
    width: 90px;
    height: 90px;
    margin-top: -1.3em;
  }
  .logo--square > div {
    margin-top: -1.7em;
  }
  @media screen and (min-width: 550px) {
    .mission {
      font-size: 1.2em;
    }
  }
</style>
