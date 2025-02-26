const charname = document.getElementById("charname");
const charage = document.getElementById("charage");
const charspecies = document.getElementById("charspecies");
const charclass = document.getElementById("charclass");
const charbackground = document.getElementById("charbackground");
const charButton = document.getElementById("character-button");

charButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/v1/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: charname.value,
        age: charage.value,
        class: charclass.value,
        background: charbackground.value,
        species: charspecies.value,
      }),
    });

    const data = await response.json();

    if (response.status === 201) {
      message.style = "display: block;";
      message.innerHTML = `<p>You have successfully created a character. Redirecting to the list...</p>`;

      setTimeout(function () {
        window.location.href = "list.html";
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    message.style = "display: block;";
    message.textContent = "A communication error has occured.";
  }
});
