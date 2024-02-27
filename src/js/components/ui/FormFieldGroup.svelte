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
        <input type={field.type} name={field.id} id={field.id} />
      {/if}
    </div>
  {/each}
</fieldset>
