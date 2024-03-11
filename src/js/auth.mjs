import { jwtDecode } from "jwt-decode";
import ProductData from "./ProductData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export async function login(creds, redirect = "/") {
  if (!checkLogin()) {
    const loginConnection = new ProductData();
    try {
      const res = await loginConnection.loginRequest({
        email: creds.username,
        password: creds.password,
      });
      if (isTokenValid(res.accessToken)) {
        setLocalStorage("so-token", res.accessToken);
        performRedirect(redirect);
      } else {
        console.log("invalid token");
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    performRedirect(redirect);
  }
}

export function checkLogin(resource = "") {
  const token = getLocalStorage("so-token");
  const valid = isTokenValid(token);
  if (!valid) {
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
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

const performRedirect = (path) => {
  window.location = path;
};
