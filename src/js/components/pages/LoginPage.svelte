<script>
  import { getParam } from "../../utils.mjs";
  import { login } from "../../auth.mjs";
  let redirect = getParam("redirect");
  let username;
  let password;
  const handleLogin = async () => {
    console.log("here");
    login({ username, password }, redirect);
  };
</script>

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
