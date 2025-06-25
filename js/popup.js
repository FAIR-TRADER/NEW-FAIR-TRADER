document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("hideWelcomePopup")) {
    showWelcomeModal();
  }
});

function showWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "flex";
}

function hideWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "none";
}

function neverShowAgain() {
  localStorage.setItem("hideWelcomePopup", "true");
  hideWelcomeModal();
}
