let activeDiv = null;

export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }

    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;

export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;

export const setToken = (value) => {
  token = value;

  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

import { showCharacter } from "./character";
import { handleRegister } from "./register";
import { handleLoginRegister, showLoginRegister } from "./loginRegister";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");

  handleLoginRegister();
  handleLogin();
  handleRegister();

  if (token) {
    showUser();
    showCharacter();
    showJournal();
  } else {
    showLoginRegister();
  }
});
