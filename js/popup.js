document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("hideWelcomePopup")) {
    showWelcomeModal();
  }
}); // 페이지 로드되면 환영 팝업 표시 여부 확인하고 보여주는 함수

function showWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "flex";
} // 환영 모달 팝업 보여주는 함수

function hideWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "none";
} // 환영 모달 팝업 숨기는 함수

function neverShowAgain() {
  localStorage.setItem("hideWelcomePopup", "true");
  hideWelcomeModal();
} // "다시 보지 않기" 선택하면 로컬스토리지에 저장하고 팝업 닫는 함수

// 로그인 팝업 관련 함수들 (다른 파일에서 사용)
function showLoginPopup() {
  document.getElementById("loginPopup").style.display = "flex";
} // 로그인 팝업 보여주는 함수

function closePopup() {
  const loginPopup = document.getElementById("loginPopup");
  if (loginPopup) {
    loginPopup.style.display = "none";
  }
} // 로그인 팝업 닫는 함수

// ESC 키로 팝업 닫기 기능
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
    hideWelcomeModal();
  }
}); // ESC 키 누르면 모든 팝업 닫는 이벤트 리스너

// 팝업 외부 클릭시 닫기 기능
document.addEventListener("click", function (event) {
  const welcomeModal = document.getElementById("welcomeModal");
  const loginPopup = document.getElementById("loginPopup");

  if (event.target === welcomeModal) {
    hideWelcomeModal();
  }

  if (event.target === loginPopup) {
    closePopup();
  }
}); // 팝업 배경 클릭하면 팝업 닫는 이벤트 리스너
