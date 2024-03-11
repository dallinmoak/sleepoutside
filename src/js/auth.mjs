import { jwtDecode } from "jwt-decode";
import ProductData from "./ProductData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export async function login(creds, redirect = "/") {
  console.log("logging in with", creds, redirect);
  if (!checkLogin()) {
    const loginConnection = new ProductData();
    try {
      const res = await loginConnection.loginRequest({
        email: creds.username,
        password: creds.password,
      });
      console.log("res found", res);
      if (isTokenValid(res.accessToken)) {
        setLocalStorage("so-token", res.accessToken);
        performRedirect(redirect);
      } else {
        console.log("invalid token");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    performRedirect(redirect);
  }
}

export function checkLogin(resource = "") {
  const token = getLocalStorage("so-token");
  const valid = isTokenValid(token);
  if (!valid) {
    console.log("removing token");
    localStorage.removeItem("so-token");
    const location = window.location.pathname;
    if (location !== "/login/index.html") {
      performRedirect(
        `/login/index.html?redirect=${location}&resource=${resource}`
      );
    }
    return false;
  } else {
    return true;
  }
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    let currentDate = new Date();
    console.log("token expires", new Date(decoded.exp * 1000));
    console.log("current date", currentDate);
    console.log("token initiated", new Date(decoded.iat * 1000));
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired");
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  } else {
    console.log("no token");
    return false;
  }
}

const performRedirect = (path) => {
  console.log(`redirecting to ${path}`);
  window.location = path;
};
