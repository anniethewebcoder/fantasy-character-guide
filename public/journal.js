const entryTitle = document.getElementById("entryTitle");
const entryEntry = document.getElementById("entryEntry");
const entryButton = document.getElementById("journal-button");
const entries = document.getElementById("entries");
const questChar = document.getElementById("questchar");
const editButton = document.getElementById("edit-journal-button");

const params = window.location.search;
const characterId = new URLSearchParams(params).get("cid");
const characterName = new URLSearchParams(params).get("name");
const entryId = new URLSearchParams(params).get("id");
const editToken = new URLSearchParams(params).get("edit");
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async (e) => {
  questChar.innerHTML += ` for ${characterName}`;

  if (editToken === "yes") {
    entryButton.style = "display: none;";
    editButton.style = "display: block;";

    try {
      const response = await fetch(
        `/api/v1/journal/${characterId}/${entryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      const { title, entry } = data.entry;

      entryTitle.value = title;
      entryEntry.value = entry;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await fetch(`/api/v1/journal/${characterId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const allEntries = data.entries
        .map((day) => {
          const { _id: entryId, characterBy, title, entry } = day;

          return `<div class="entrybox">
            <h2>${title}</h2>
            <p>${entry}</p>
            <p><a href="journal.html?edit=yes&name=${characterName}&cid=${characterId}&id=${entryId}">Edit</a></p>
            </div>`;
        })
        .join("");

      entries.innerHTML = allEntries;
    } catch (error) {
      console.error(error);
    }
  }
});

entryButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!token) {
    window.location.href = "login.html";
  } else {
    try {
      const response = await fetch(`/api/v1/journal/${characterId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: entryTitle.value
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          entry: entryEntry.value,
          characterBy: characterId,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        entryTitle.value = "";
        entryEntry.value = "";
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
});

editButton.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("clicking the edit button");
  try {
    const response = await fetch(`/api/v1/journal/${characterId}/${entryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title: entryTitle.value
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        entry: entryEntry.value,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      window.location.href = `journal.html?cid=${characterId}&name=${characterName}`;
    }
  } catch (error) {
    console.error(error);
  }
});
