// contact.js - 문의 페이지 JavaScript 기능

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 폼 유효성 검사 이벤트 리스너 추가
  setupFormValidation()

  // FAQ 아이템들에 애니메이션 효과 추가
  addFAQAnimations()
})

// 문의 폼 제출 처리 함수
function submitContactForm(event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)

  // 폼 데이터를 객체로 변환
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    category: formData.get("category"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    privacy: formData.get("privacy"),
    timestamp: new Date().toISOString(),
  }

  // 유효성 검사
  if (validateContactForm(contactData)) {
    // 폼 제출 처리 (실제 구현에서는 서버로 전송)
    processContactForm(contactData)

    // 성공 메시지 표시
    showMessage("문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.", "success")

    // 폼 초기화
    form.reset()
  }
}

// 폼 유효성 검사 함수
function validateContactForm(data) {
  const errors = []

  // 필수 필드 검사
  if (!data.name.trim()) {
    errors.push("이름을 입력해주세요.")
  }

  if (!data.email.trim()) {
    errors.push("이메일을 입력해주세요.")
  } else if (!validateEmail(data.email)) {
    errors.push("올바른 이메일 형식을 입력해주세요.")
  }

  if (!data.category) {
    errors.push("문의 유형을 선택해주세요.")
  }

  if (!data.subject.trim()) {
    errors.push("제목을 입력해주세요.")
  }

  if (!data.message.trim()) {
    errors.push("문의 내용을 입력해주세요.")
  }

  if (!data.privacy) {
    errors.push("개인정보 수집 및 이용에 동의해주세요.")
  }

  // 에러가 있으면 표시
  if (errors.length > 0) {
    showMessage(errors.join("\n"), "error")
    return false
  }

  return true
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 문의 폼 처리 함수
function processContactForm(data) {
  // 로컬 스토리지에 문의 내역 저장 (실제 구현에서는 서버 처리)
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
  contacts.push(data)
  localStorage.setItem("contacts", JSON.stringify(contacts))

  console.log("문의 접수:", data)
}

// FAQ 토글 함수
function toggleFAQ(questionElement) {
  const faqItem = questionElement.parentElement
  const isActive = faqItem.classList.contains("active")

  // 모든 FAQ 아이템 닫기
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // 클릭된 아이템만 열기 (이미 열려있지 않은 경우)
  if (!isActive) {
    faqItem.classList.add("active")

    // 스크롤 애니메이션
    setTimeout(() => {
      faqItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }, 300)
  }
}

// 폼 유효성 검사 설정 함수
function setupFormValidation() {
  const form = document.querySelector(".contact-form")
  const inputs = form.querySelectorAll("input, select, textarea")

  inputs.forEach((input) => {
    // 실시간 유효성 검사
    input.addEventListener("blur", function () {
      validateField(this)
    })

    // 입력 시 에러 스타일 제거
    input.addEventListener("input", function () {
      this.classList.remove("error")
      removeFieldError(this)
    })
  })
}

// 개별 필드 유효성 검사 함수
function validateField(field) {
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  // 필수 필드 검사
  if (field.hasAttribute("required") && !value) {
    isValid = false
    errorMessage = "이 필드는 필수입니다."
  }

  // 이메일 형식 검사
  if (field.type === "email" && value && !validateEmail(value)) {
    isValid = false
    errorMessage = "올바른 이메일 형식을 입력해주세요."
  }

  // 전화번호 형식 검사 (선택사항)
  if (field.type === "tel" && value && !validatePhone(value)) {
    isValid = false
    errorMessage = "올바른 전화번호 형식을 입력해주세요."
  }

  // 에러 표시/제거
  if (!isValid) {
    showFieldError(field, errorMessage)
  } else {
    removeFieldError(field)
  }

  return isValid
}

// 전화번호 유효성 검사 함수
function validatePhone(phone) {
  const phoneRegex = /^[0-9-+\s()]+$/
  return phoneRegex.test(phone) && phone.length >= 10
}

// 필드 에러 표시 함수
function showFieldError(field, message) {
  field.classList.add("error")

  // 기존 에러 메시지 제거
  removeFieldError(field)

  // 새 에러 메시지 추가
  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    `

  field.parentNode.appendChild(errorDiv)
}

// 필드 에러 제거 함수
function removeFieldError(field) {
  const errorDiv = field.parentNode.querySelector(".field-error")
  if (errorDiv) {
    errorDiv.remove()
  }
}

// FAQ 애니메이션 추가 함수
function addFAQAnimations() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// 메시지 표시 함수
function showMessage(message, type) {
  const existingMessage = document.querySelector(".message")
  if (existingMessage) {
    existingMessage.remove()
  }

  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
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
    `
  messageDiv.textContent = message

  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease"
    setTimeout(() => messageDiv.remove(), 300)
  }, 5000)
}

// 로그인 팝업 관련 함수들
function showLoginPopup() {
  const popup = document.getElementById("loginPopup")
  popup.style.display = "block"

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup()
    }
  })
}

function closePopup() {
  const popup = document.getElementById("loginPopup")
  popup.style.display = "none"
}

// 키보드 이벤트 처리
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup()
  }
})

// CSS 스타일 추가
const style = document.createElement("style")
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
`
document.head.appendChild(style)
