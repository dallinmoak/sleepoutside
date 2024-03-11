<script>
  import { checkLogin } from "../../auth.mjs";
  let auth = null;
  if (checkLogin("Orders")) {
    auth = true;
  } else {
    auth = false;
  }
</script>

{#if auth}
  <div>test</div>
{:else}
  <div>⛔401: not authorized ⛔</div>
{/if}
