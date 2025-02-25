let token = null;

const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

const charList = document.getElementById("characters");
const charButton = document.getElementById("character-button");

document.addEventListener("DOMContentLoaded", async (e) => {
  token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/v1/character", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const allCharacters = data.characters
      .map((character) => {
        const {
          _id: charID,
          name,
          age,
          species,
          classes,
          background,
        } = character;

        return `<div class="charbox">
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        </div>`;
      })
      .join("");

    console.log(allCharacters);
    charList.innerHTML = allCharacters;
  } catch (error) {
    console.error(error);
  }
});
