// main.js - 메인 페이지 JavaScript 기능

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll);
});

// 공지사항 팝업 닫기 함수

// 제품 섹션으로 스크롤하는 함수
function scrollToProducts() {
  const productsSection = document.getElementById("products-section");
  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
window.scrollToProducts = scrollToProducts;

// 뉴스레터 구독 처리 함수
function subscribeNewsletter(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value;

  // 이메일 유효성 검사
  if (validateEmail(email)) {
    // 사용자 데이터 업데이트
    userData.email = email;
    userData.subscribed = true;

    // 성공 메시지 표시
    showMessage("뉴스레터 구독이 완료되었습니다!", "success");

    // 폼 초기화
    form.reset();
  } else {
    showMessage("올바른 이메일 주소를 입력해주세요.", "error");
  }
}

// 로그인 처리 함수

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 메시지 표시 함수

// 로그인 메뉴 업데이트 함수

// 로그아웃 함수

// 스크롤 이벤트 처리 함수
function handleScroll() {
  const header = document.querySelector(".header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // 스크롤 시 헤더에 그림자 효과 추가
  if (scrollTop > 100) {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  } else {
    header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  }
}
