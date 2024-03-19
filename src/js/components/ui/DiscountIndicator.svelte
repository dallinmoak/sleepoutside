<script>
  export let list;
  export let suggested;
</script>

{#if suggested > list}
  <div class="discount">
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"
      />
    </svg>
    ${(suggested - list).toFixed(2)}
    off
  </div>
{/if}

<style>
  .discount {
    font-size: 0.75em;
    font-weight: bold;
    padding: 0.4em;
    background: var(--primary-color);
    border-radius: 0.25em;
    display: flex;
    align-items: center;
  }
  .discount > svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.25em;
  }
</style>
