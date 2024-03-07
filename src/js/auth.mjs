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
      window.location = redirect;
    } catch (err) {
      console.log(err);
    }
  } else {
    window.location = redirect;
  }
}

function checkLogin() {
  const token = getLocalStorage("so-token");
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem("so-token");
    const location = window.location;
    console.log(location);
    // window.location = `/login/index.html?redirect=${location.pathname}`;
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
      console.log("Token expired");
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  } else return false;
}
