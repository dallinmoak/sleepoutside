<script>
  export let message;

  let removed = false;
  function handleClick() {
    removed = true;
  }
</script>

{#if !removed}
  <div class="alert">
    <p>{message}</p>
    <button on:click={handleClick}>X</button>
  </div>
{/if}

<style>
  .alert {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;
    background-color: var(--primary-color);
    border: 1px solid darkorange;
    width: 20em;
    margin-bottom: 0.1em;
  }
  .alert > p {
    margin: 0;
  }
  .alert > button {
    border: none;
    color: inherit;
    background-color: inherit;
    font-weight: inherit;
    font-size: inherit;
    cursor: pointer;
    margin-left: 1em;
  }
</style>
