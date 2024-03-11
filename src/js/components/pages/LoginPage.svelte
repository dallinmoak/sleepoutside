<script>
  import { getParam } from "../../utils.mjs";
  import { login } from "../../auth.mjs";
  let redirect = getParam("redirect");
  redirect = redirect === null ? undefined : redirect;
  let resource = getParam("resource");
  resource = resource === null ? undefined : resource;
  let username = "user1@email.com";
  let password = "user1";
  const handleLogin = async () => {
    login({ username, password }, redirect);
  };
</script>

{#if redirect && resource}
  <p>You need to log in to access {resource}</p>
{/if}

<h1>Login</h1>

<form on:submit|preventDefault={handleLogin}>
  <label for="username">Username:</label>
  <input
    bind:value={username}
    type="text"
    id="username"
    name="username"
    required
  />
  <label for="password">Password:</label>
  <input
    bind:value={password}
    type="password"
    id="password"
    name="password"
    required
  />
  <input type="submit" value="Submit" />
</form>

{username}
{password}
