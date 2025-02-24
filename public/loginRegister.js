import { inputEnabled, setDiv } from ".";
import { showLogin } from "./login";
import { showRegister } from "./register";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("loginregister");
};

export const showLoginRegister = () => {};
