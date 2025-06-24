// about.js - 공정무역 소개 페이지 JavaScript 기능

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 통계 애니메이션 시작
  animateStats();

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScrollAnimations);
});

// 원칙 카드 토글 함수
function toggleCard(card) {
  // 다른 카드들의 active 클래스 제거
  const allCards = document.querySelectorAll(".principle-card");
  allCards.forEach((c) => {
    if (c !== card) {
      c.classList.remove("active");
    }
  });

  // 클릭된 카드의 active 클래스 토글
  card.classList.toggle("active");

  // 애니메이션 효과
  if (card.classList.contains("active")) {
    card.style.transform = "scale(1.02)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 200);
  }
}

// 통계 숫자 애니메이션 함수
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-target"));
    const duration = 2000; // 2초
    const increment = target / (duration / 16); // 60fps 기준
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // 숫자 포맷팅 (천 단위 콤마)
      stat.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// 스크롤 애니메이션 처리 함수
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".principle-card, .stat-item");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// 페이지 로드 시 초기 스타일 설정
window.addEventListener("load", () => {
  const animatedElements = document.querySelectorAll(
    ".principle-card, .stat-item"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // 스크롤 애니메이션 초기 실행
  handleScrollAnimations();
});

// 키보드 접근성 지원
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
  }

  // Enter 키로 원칙 카드 토글
  if (
    event.key === "Enter" &&
    event.target.classList.contains("principle-card")
  ) {
    toggleCard(event.target);
  }
});

// 원칙 카드에 키보드 포커스 지원 추가
document.querySelectorAll(".principle-card").forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-expanded", "false");

  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(this);

      // aria-expanded 속성 업데이트
      const isActive = this.classList.contains("active");
      this.setAttribute("aria-expanded", isActive);
    }
  });
});
