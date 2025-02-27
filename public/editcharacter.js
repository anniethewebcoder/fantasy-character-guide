const charname = document.getElementById("charname");
const charage = document.getElementById("charage");
const charspecies = document.getElementById("charspecies");
const charclass = document.getElementById("charclass");
const charbackground = document.getElementById("charbackground");
const editButton = document.getElementById("update-button");
const deleteButton = document.getElementById("delete-button");
const message = document.getElementById("message");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`/api/v1/character/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const { name, age, species, classes, backgrounds } = data.character;

    charname.value = name;
    charage.value = age;
    charclass.value = classes;
    charbackground.value = backgrounds;
    charspecies.value = species;
  } catch (error) {
    console.error(error);
  }
});

editButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`/api/v1/character/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: charname.value
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        age: charage.value,
        classes: charclass.value
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        backgrounds: charbackground.value
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        species: charspecies.value
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      window.location.href = "list.html";
    } else {
      message.style = "display: block";
      message.textContent = "A communication error has occured.";
    }
  } catch (error) {
    console.error(error);
    message.style = "display: block;";
    message.textContent = "A communication error has occured.";
  }
});

deleteButton.addEventListener("click", async (e) => {
  try {
    const response = await fetch(`/api/v1/character/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      window.location.href = "list.html";
    } else {
      message.style = "display: block;";
      message.textContent = "A communication error has occured.";
    }
  } catch (error) {
    console.error(error);
    message.style = "display: block;";
    message.textContent = "A communication error has occured.";
  }
});
