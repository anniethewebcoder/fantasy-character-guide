let token = null;

const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async (e) => {
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      message.style = "display: block;";
      message.textContent = `Log on Succssfule. Welcome ${data.user.name}`;
      setToken(data.token);
    } else {
      message.style = "display: block;";
      message.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
    message.textContent = "A communication error occured.";
  }
});
