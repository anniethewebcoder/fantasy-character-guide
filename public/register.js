const registerDiv = document.getElementById("register-div");
const firstname = document.getElementById("fname");
const lastname = document.getElementById("lname");
const username = document.getElementById("uname");
const regemail = document.getElementById("remail");
const regpass01 = document.getElementById("rpass1");
const regpass02 = document.getElementById("rpass2");
const message = document.getElementById("message");
const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (regpass01.value !== regpass02.value) {
    message.style = "display: block;";
    message.textContent = "The passwords do not match.";
  } else {
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname:
            firstname.value.charAt(0).toUpperCase() + firstname.value.slice(1),
          lastname:
            lastname.value.charAt(0).toUpperCase() + lastname.value.slice(1),
          username: username.value
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          email: regemail.value,
          password: regpass01.value,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        message.style = "display: block;";
        message.innerHTML = `<p>You have successfully signed up. Welcome ${data.user.name}!</p><p>Please sign in. It will load in a few seconds.</p>`;

        firstname.value = "";
        lastname.value = "";
        username.value = "";
        regemail.value = "";
        regpass01.value = "";
        regpass02.value = "";

        setTimeout(function () {
          window.location.href = "login.html";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      message.style = "display: block;";
      message.textContent = "A communication error has occured.";
    }
  }
});
