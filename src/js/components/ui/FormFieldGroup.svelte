<script>
  export let fields;
  export let legend;
</script>

<fieldset>
  <legend>{legend}</legend>
  {#each fields as field}
    <div>
      <label for={field.id}>{field.label}</label>
      {#if field.readOnly}
        <span id={field.id} readonly>{field.value}</span>
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

  /* fieldset {
    margin: 1em 0;
    padding: 1em;
    border: 1px solid var(--primary-color);
    width: 100%; 
  }
  legend {
    padding: 0.5em;
    background-color: var(--secondary-color);
    color: white;
  }
  div {
    margin: 0.5em 0;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    padding: 0.5em;
  } */
  /* input:read-only {
    background-color: var(--primary-color);
    color: white;
  } */
</style>
