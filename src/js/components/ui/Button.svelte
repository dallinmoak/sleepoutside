<script>
  import { createEventDispatcher } from "svelte";
  export let type = "button";
  export let disabled = false;
  export let onClick = () => {};
  export let title = "";
  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("click");
    onClick();
  };

  export let size = "medium";

  const sizeMap = {
    small: { padding: "0.25rem 1em", fontSize: "small-font" },
    medium: { padding: "0.5rem 2em", fontSize: "large-font" },
    large: { padding: "0.75rem 3em", fontSize: "large-font" },
  };

  let styles = {
    "font-size": `var(--${sizeMap[size].fontSize})`,
    padding: sizeMap[size].padding,
  };

  $: cssVarStyles = Object.entries(styles)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");
</script>

<button style={cssVarStyles} {type} {title} on:click={handleClick} {disabled}
  ><slot /></button
>

<style>
  button {
    padding: var(--padding);
    background-color: var(--secondary-color);
    color: white;
    margin: auto;
    display: block;
    border: 0;
    font-size: var(--font-size);
    cursor: pointer;
    border-radius: 0.3rem;
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--dark-grey);
      transition: background-color 0.3s;
    }
  }
</style>
