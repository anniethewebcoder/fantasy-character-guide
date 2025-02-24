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

charList.addEventListener("DOMContentLoaded", async () => {
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

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

const charSubmit = document.getElementById("character-submit");

charSubmit.addEventListener("click", async (e) => {});
