document.addEventListener("DOMContentLoaded", () => {
  setupFormValidation();
  addFAQAnimations();
}); // 페이지 로드되면 폼 검증 설정하고 FAQ 애니메이션 실행

function submitContactForm(event) {
  event.preventDefault(); // 폼 기본 제출 동작 막기

  const form = event.target;
  const formData = new FormData(form);

  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    category: formData.get("category"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    privacy: formData.get("privacy"),
    timestamp: new Date().toISOString(),
  }; // 폼 데이터를 객체로 변환

  if (validateContactForm(contactData)) {
    processContactForm(contactData);

    showMessage(
      "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
      "success"
    );

    form.reset();
  } // 검증 통과하면 데이터 처리하고 성공 메시지 표시
}

function validateContactForm(data) {
  const errors = [];

  if (!data.name.trim()) {
    errors.push("이름을 입력해주세요.");
  } // 이름 필수 체크

  if (!data.email.trim()) {
    errors.push("이메일을 입력해주세요.");
  } else if (!validateEmail(data.email)) {
    errors.push("올바른 이메일 형식을 입력해주세요.");
  } // 이메일 필수 체크 및 형식 검증

  if (!data.category) {
    errors.push("문의 유형을 선택해주세요.");
  } // 문의 유형 필수 선택

  if (!data.subject.trim()) {
    errors.push("제목을 입력해주세요.");
  } // 제목 필수 체크

  if (!data.message.trim()) {
    errors.push("문의 내용을 입력해주세요.");
  } // 문의 내용 필수 체크

  if (!data.privacy) {
    errors.push("개인정보 수집 및 이용에 동의해주세요.");
  } // 개인정보 동의 필수 체크

  if (errors.length > 0) {
    showMessage(errors.join("\n"), "error");
    return false;
  } // 에러가 있으면 에러 메시지 표시하고 false 반환

  return true; // 모든 검증 통과하면 true 반환
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} // 이메일 형식 검증하는 정규식 함수

function processContactForm(data) {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.push(data);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  console.log("문의 접수:", data);
} // 문의 데이터를 로컬스토리지에 저장하는 함수

function toggleFAQ(questionElement) {
  const faqItem = questionElement.parentElement;
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  }); // 다른 FAQ 항목들 모두 닫기

  if (!isActive) {
    faqItem.classList.add("active");

    setTimeout(() => {
      faqItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  } // 클릭한 FAQ 항목이 닫혀있었으면 열고 스크롤 이동
}

function setupFormValidation() {
  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    }); // 포커스 잃을 때 필드 검증

    input.addEventListener("input", function () {
      this.classList.remove("error");
      removeFieldError(this);
    }); // 입력할 때 에러 상태 제거
  });
} // 실시간 폼 검증 기능 설정

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "이 필드는 필수입니다.";
  } // 필수 필드 체크

  if (field.type === "email" && value && !validateEmail(value)) {
    isValid = false;
    errorMessage = "올바른 이메일 형식을 입력해주세요.";
  } // 이메일 형식 체크

  if (field.type === "tel" && value && !validatePhone(value)) {
    isValid = false;
    errorMessage = "올바른 전화번호 형식을 입력해주세요.";
  } // 전화번호 형식 체크

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    removeFieldError(field);
  } // 검증 결과에 따라 에러 표시/제거

  return isValid;
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9-+\s()]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
} // 전화번호 형식 검증 함수

function showFieldError(field, message) {
  field.classList.add("error"); // 필드에 에러 클래스 추가

  removeFieldError(field); // 기존 에러 메시지 제거

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    `; // 에러 메시지 요소 생성

  field.parentNode.appendChild(errorDiv); // 필드 아래에 에러 메시지 추가
}

function removeFieldError(field) {
  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  } // 기존 에러 메시지 제거
}

function addFAQAnimations() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  }); // FAQ 항목들이 순차적으로 나타나는 애니메이션
}

function showMessage(message, type) {
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  } // 기존 메시지 제거

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
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
        max-width: 400px;
        white-space: pre-line;
        ${type === "success" ? "background: #4CAF50;" : "background: #f44336;"}
    `;
  messageDiv.textContent = message; // 메시지 요소 생성

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000); // 5초 후 메시지 제거
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // ESC 키 눌렀을 때 처리할 로직 (현재는 비어있음)
  }
}); // ESC 키 이벤트 리스너

const style = document.createElement("style");
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #f44336;
        box-shadow: 0 0 5px rgba(244, 67, 54, 0.3);
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); // 에러 필드와 애니메이션 스타일 동적 추가
