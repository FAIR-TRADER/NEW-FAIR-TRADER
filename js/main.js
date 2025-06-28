document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", handleScroll);

  if (!localStorage.getItem("hideWelcomePopup")) {
    showWelcomeModal();
  }
}); // 페이지 로드되면 스크롤 이벤트 등록하고 환영 팝업 보여주는 함수

let statsAnimated = false; // 통계 애니메이션 한 번만 실행하게 구분

function showWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "flex";
} // 환영 모달 보여주는 함수

function hideWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "none";
} // 환영 모달 숨기는 함수

function neverShowAgain() {
  localStorage.setItem("hideWelcomePopup", "true");
  hideWelcomeModal();
} // 다시 보지 않기 누르면 로컬스토리지에 저장하고 모달 닫는 함수

function scrollToProducts() {
  const productsSection = document.getElementById("products-section");
  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
} // 제품 섹션으로 부드럽게 스크롤하는 함수
window.scrollToProducts = scrollToProducts;

function subscribeNewsletter(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value;

  if (validateEmail(email)) {
    showMessage("뉴스레터 구독이 완료되었습니다!", "success");
    form.reset();
  } else {
    showMessage("올바른 이메일 주소를 입력해주세요.", "error");
  }
} // 뉴스레터 구독 처리하는 함수

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} // 이메일 형식 검증하는 함수

function showMessage(message, type) {
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 3000;
    animation: slideIn 0.3s ease;
    ${type === "success" ? "background: #4CAF50;" : "background: #f44336;"}
  `;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
} // 알림 메시지 보여주는 함수

function animateStats() {
  if (statsAnimated) return;

  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });

  statsAnimated = true;
} // 통계 숫자 카운팅 애니메이션 함수

function handleScroll() {
  const header = document.querySelector(".header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  } else {
    header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  }

  const statisticsSection = document.querySelector(".statistics-section");
  if (statisticsSection && !statsAnimated) {
    const sectionTop = statisticsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      animateStats();
    }
  }
} // 스크롤 할 때 헤더 그림자 변경하고 통계 애니메이션 실행하는 함수

const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style); // 슬라이드 애니메이션 CSS 동적으로 추가하는 부분
