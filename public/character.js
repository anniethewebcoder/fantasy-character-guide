let token = null;

const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

const charList = document.getElementById("characterList");
const charButton = document.getElementById('character-button')
charButton.addEventListener("click", async (e) => {
  token = localStorage.getItem("token");
  console.log(e)
  try {
    const response = await fetch("/api/v1/character", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    charList.textContent = JSON.stringify(data)
  } catch (error) {
    console.error(error);
  }
});

const charSubmit = document.getElementById("character-submit");

charSubmit.addEventListener("click", async (e) => {});
