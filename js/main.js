document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", handleScroll);
});

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
    userData.email = email;
    userData.subscribed = true;

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

function handleScroll() {
  const header = document.querySelector(".header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  } else {
    header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  }
}
