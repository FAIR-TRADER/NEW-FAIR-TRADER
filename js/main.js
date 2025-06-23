// main.js - 메인 페이지 JavaScript 기능

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 페이지 로드 시 공지사항 팝업 표시
  setTimeout(showNoticePopup, 1000)

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll)
})

// 객체를 사용한 사용자 데이터 관리
const userData = {
  email: "",
  subscribed: false,
  loginStatus: false,
}

// 로그인 팝업 표시 함수
function showLoginPopup() {
  const popup = document.getElementById("loginPopup")
  popup.style.display = "block"

  // 팝업 외부 클릭 시 닫기
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup()
    }
  })
}

// 공지사항 팝업 표시 함수
function showNoticePopup() {
  const popup = document.getElementById("noticePopup")
  popup.style.display = "block"

  // 팝업 외부 클릭 시 닫기
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closeNoticePopup()
    }
  })
}

// 로그인 팝업 닫기 함수
function closePopup() {
  const popup = document.getElementById("loginPopup")
  popup.style.display = "none"
}

// 공지사항 팝업 닫기 함수
function closeNoticePopup() {
  const popup = document.getElementById("noticePopup")
  popup.style.display = "none"
}

// 제품 섹션으로 스크롤하는 함수
function scrollToProducts() {
  const productsSection = document.getElementById("products-section")
  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// 뉴스레터 구독 처리 함수
function subscribeNewsletter(event) {
  event.preventDefault()

  const form = event.target
  const emailInput = form.querySelector('input[type="email"]')
  const email = emailInput.value

  // 이메일 유효성 검사
  if (validateEmail(email)) {
    // 사용자 데이터 업데이트
    userData.email = email
    userData.subscribed = true

    // 성공 메시지 표시
    showMessage("뉴스레터 구독이 완료되었습니다!", "success")

    // 폼 초기화
    form.reset()
  } else {
    showMessage("올바른 이메일 주소를 입력해주세요.", "error")
  }
}

// 로그인 처리 함수
function handleLogin(event) {
  event.preventDefault()

  const form = event.target
  const email = form.querySelector('input[type="email"]').value
  const password = form.querySelector('input[type="password"]').value

  // 간단한 로그인 검증 (실제 구현에서는 서버 검증 필요)
  if (email && password) {
    userData.email = email
    userData.loginStatus = true

    showMessage("로그인이 완료되었습니다!", "success")
    closePopup()

    // 로그인 후 메뉴 업데이트
    updateLoginMenu()
  } else {
    showMessage("이메일과 비밀번호를 입력해주세요.", "error")
  }
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 메시지 표시 함수
function showMessage(message, type) {
  // 기존 메시지 제거
  const existingMessage = document.querySelector(".message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // 새 메시지 생성
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = message
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
    `

  document.body.appendChild(messageDiv)

  // 3초 후 메시지 제거
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease"
    setTimeout(() => messageDiv.remove(), 300)
  }, 3000)
}

// 로그인 메뉴 업데이트 함수
function updateLoginMenu() {
  const loginLink = document.querySelector('nav a[onclick="showLoginPopup()"]')
  if (loginLink && userData.loginStatus) {
    loginLink.textContent = "로그아웃"
    loginLink.onclick = logout
  }
}

// 로그아웃 함수
function logout() {
  userData.email = ""
  userData.loginStatus = false
  userData.subscribed = false

  showMessage("로그아웃되었습니다.", "success")

  // 메뉴 복원
  const logoutLink = document.querySelector("nav a")
  if (logoutLink) {
    logoutLink.textContent = "로그인"
    logoutLink.onclick = showLoginPopup
  }
}

// 스크롤 이벤트 처리 함수
function handleScroll() {
  const header = document.querySelector(".header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // 스크롤 시 헤더에 그림자 효과 추가
  if (scrollTop > 100) {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)"
  } else {
    header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"
  }
}

// 키보드 이벤트 처리 (ESC 키로 팝업 닫기)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup()
    closeNoticePopup()
  }
})

// CSS 애니메이션 추가
const style = document.createElement("style")
style.textContent = `
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
