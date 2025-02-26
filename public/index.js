let token = null;

if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
  setTimeout(function () {
    window.location.href = "list.html";
  }, 1000);
}

const createButton = document.getElementById("create-button");

createButton.addEventListener("click", () => {
  window.location.href = "register.html";
});
