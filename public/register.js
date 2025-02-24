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
          firstname: firstname.value,
          lastname: lastname.value,
          username: username.value,
          email: regemail.value,
          password: regpass01.value,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log(data);

        message.textContent = `Registration successful. Welcome ${data.user.name}`;

        firstname.value = "";
        lastname.value = "";
        username.value = "";
        regemail.value = "";
        regpass01.value = "";
        regpass02.value = "";
      }
    } catch (error) {
      console.error(error);
      message.style = "display: block;";
      message.textContent = "A communication error has occured.";
    }
  }
});
