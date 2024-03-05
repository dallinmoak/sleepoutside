<script>
  export let fields;
  export let legend;
</script>

<fieldset>
  <legend>{legend}</legend>
  {#each fields as field}
    <div class={field.readOnly ? "readonly" : ""}>
      <label for={field.id}>{field.label}</label>
      {#if field.readOnly}
        <span id={field.id}>{field.value}</span>
      {:else}
        <input
          type={field.type}
          name={field.id}
          id={field.id}
          required={field.required}
        />
      {/if}
    </div>
  {/each}
</fieldset>

<style>
  fieldset {
    margin: 1em 0;
    padding: 1em;
    border: 2px solid var(--primary-color);
    width: 100%;
  }

  legend {
    padding: 0.5em;
    background-color: var(--secondary-color);
    color: white;
  }
  div {
    margin: 0.5em 0;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid var(--light-grey);
  }

  div.readonly {
    display: flex;
    justify-content: space-between;
  }

  div:has(span#orderTotal) {
    border-top: 1px solid black;
    font-weight: 900;
  }
</style>
