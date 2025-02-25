let token = null;

if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
  setTimeout(function () {
    window.location.href = "character.html";
  }, 2000);
}
