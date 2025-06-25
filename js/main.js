document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", handleScroll);

  if (!localStorage.getItem("hideWelcomePopup")) {
    showWelcomeModal();
  }
});

let statsAnimated = false;

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
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
}

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
}

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
}

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
document.head.appendChild(style);
