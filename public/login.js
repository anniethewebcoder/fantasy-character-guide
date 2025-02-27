let token = null;

if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
  setTimeout(function () {
    window.location.href = "list.html";
  }, 1000);
}

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

    if (response.status === 200) {
      message.style = "display: block;";
      message.textContent = `You have signed in successfully. Welcome ${data.user.name}! Loading...`;
      setToken(data.token);

      setTimeout(function () {
        window.location.href = "list.html";
      }, 2000);
    } else {
      message.style = "display: block;";
      message.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
    message.textContent = "A communication error occured.";
  }
});
