document.addEventListener("DOMContentLoaded", () => {
  setupFormValidation();
  addFAQAnimations();
});

function submitContactForm(event) {
  event.preventDefault();

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
  };

  if (validateContactForm(contactData)) {
    processContactForm(contactData);

    showMessage(
      "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
      "success"
    );

    form.reset();
  }
}

function validateContactForm(data) {
  const errors = [];

  if (!data.name.trim()) {
    errors.push("이름을 입력해주세요.");
  }

  if (!data.email.trim()) {
    errors.push("이메일을 입력해주세요.");
  } else if (!validateEmail(data.email)) {
    errors.push("올바른 이메일 형식을 입력해주세요.");
  }

  if (!data.category) {
    errors.push("문의 유형을 선택해주세요.");
  }

  if (!data.subject.trim()) {
    errors.push("제목을 입력해주세요.");
  }

  if (!data.message.trim()) {
    errors.push("문의 내용을 입력해주세요.");
  }

  if (!data.privacy) {
    errors.push("개인정보 수집 및 이용에 동의해주세요.");
  }

  if (errors.length > 0) {
    showMessage(errors.join("\n"), "error");
    return false;
  }

  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function processContactForm(data) {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.push(data);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  console.log("문의 접수:", data);
}

function toggleFAQ(questionElement) {
  const faqItem = questionElement.parentElement;
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  if (!isActive) {
    faqItem.classList.add("active");

    setTimeout(() => {
      faqItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  }
}

function setupFormValidation() {
  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      this.classList.remove("error");
      removeFieldError(this);
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "이 필드는 필수입니다.";
  }

  if (field.type === "email" && value && !validateEmail(value)) {
    isValid = false;
    errorMessage = "올바른 이메일 형식을 입력해주세요.";
  }

  if (field.type === "tel" && value && !validatePhone(value)) {
    isValid = false;
    errorMessage = "올바른 전화번호 형식을 입력해주세요.";
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    removeFieldError(field);
  }

  return isValid;
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9-+\s()]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
}

function showFieldError(field, message) {
  field.classList.add("error");

  removeFieldError(field);

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    `;

  field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  }
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
  });
}

function showMessage(message, type) {
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

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
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
  }
});

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
document.head.appendChild(style);
