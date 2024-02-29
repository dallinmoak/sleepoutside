import AlertMessage from "./components/AlertMessage.svelte";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addItemToStorageArray(key, data) {
  const existingDataString = localStorage.getItem(key);
  const existingData = existingDataString ? JSON.parse(existingDataString) : [];

  existingData.push(data);
  localStorage.setItem(key, JSON.stringify(existingData));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderComponent(selector, Component, props) {
  const myComponent = new Component({
    target: document.querySelector(selector),
    props: props,
  });
  return myComponent;
}

export function alertMessage(message, scroll = true) {
  renderComponent("body", AlertMessage, { message });
  if (scroll) window.scrollTo(0, 0);
}
