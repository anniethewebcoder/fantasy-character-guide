const entryTitle = document.getElementById("entryTitle");
const entryEntry = document.getElementById("entryEntry");
const entryButton = document.getElementById("journal-button");
const entries = document.getElementById("entries");

const params = window.location.search;
const characterId = new URLSearchParams(params).get("cid");
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const response = await fetch(`/api/v1/journal/${characterId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data.entries);

    const { title, entry } = data.entries;

    const allEntries = data.entries
      .map((day) => {
        const { _id: entryId, characterBy, title, entry } = day;

        return `<div class="entrybox">
        <p>${title}</p>
        <p>${entry}</p>`;
      })
      .join("");

    entries.innerHTML = allEntries;
  } catch (error) {
    console.error(error);
  }
});

entryButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!token) {
    window.location.href = "login.html";
  } else {
    try {
      const response = await fetch(`/api/v1/journal/${characterId}`);
    } catch (error) {}
  }
});
