const charList = document.getElementById("characters");
const charButton = document.getElementById("character-button");
const logoutButton = document.getElementById("logout-button");
const deleteButton = document.getElementsByClassName("delete-button");

let token = null;

const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

charButton.addEventListener("click", () => {
  window.location.href = "character.html";
});

document.addEventListener("DOMContentLoaded", async (e) => {
  token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
  } else {
    try {
      const response = await fetch("/api/v1/character", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.count < 1) {
        charList.innerHTML = "<p>No List</p>";
      } else {
        const allCharacters = data.characters
          .map((character) => {
            const {
              _id: charId,
              name,
              age,
              species,
              classes,
              backgrounds,
            } = character;

            return `
            <div class="charbox">
                <p>Name: ${name}</p>
                <p>Age: ${age}</p>
                <p>Class: ${classes}</p>
                <p>Background: ${backgrounds}</p>
                <p>Species: ${species}</p>
                <a href="editcharacter.html?id=${charId}" class="edit-link">Edit</a>
                <a href="journal.html?cid=${charId}&name=${name}" class="journal-link">Quest Journal</a>
                <a href="backstory.html?cid=${charId}" class="backstory-link">Backstory Guide</a>
                </div>
          `;
          })
          .join("");

        charList.innerHTML = allCharacters;
      }
    } catch (error) {
      console.error(error);
    }
  }
});
