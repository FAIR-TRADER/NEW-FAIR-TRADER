// products.js - 제품 페이지 JavaScript 기능

// 장바구니 객체
const cart = {
  items: [],
  total: 0,

  // 제품 추가 메서드
  addItem: function (productId, name, price) {
    const existingItem = this.items.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        id: productId,
        name: name,
        price: price,
        quantity: 1,
      })
    }

    this.updateTotal()
    this.updateDisplay()
  },

  // 제품 제거 메서드
  removeItem: function (productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.updateTotal()
    this.updateDisplay()
  },

  // 총액 계산 메서드
  updateTotal: function () {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  },

  // 화면 업데이트 메서드
  updateDisplay: function () {
    const cartItems = document.getElementById("cartItems")
    const totalPrice = document.getElementById("totalPrice")

    if (this.items.length === 0) {
      cartItems.innerHTML = "<p>장바구니가 비어있습니다.</p>"
    } else {
      cartItems.innerHTML = this.items
        .map(
          (item) => `
                <div class="cart-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}원</span>
                    <button onclick="cart.removeItem('${item.id}')" style="background: #ff4444; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 3px; cursor: pointer;">삭제</button>
                </div>
            `,
        )
        .join("")
    }

    totalPrice.textContent = this.total.toLocaleString()
  },
}

// 제품 데이터 객체
const products = {
  coffee1: { name: "에티오피아 유기농 커피", price: 15000 },
  coffee2: { name: "콜롬비아 커피", price: 18000 },
  chocolate1: { name: "가나 다크 초콜릿", price: 8000 },
  chocolate2: { name: "에콰도르 밀크 초콜릿", price: 7000 },
  tea1: { name: "스리랑카 홍차", price: 12000 },
  sugar1: { name: "필리핀 유기농 설탕", price: 5000 },
}

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 초기 장바구니 표시 업데이트
  cart.updateDisplay()

  // 제품 카드에 애니메이션 효과 추가
  addProductAnimations()
})

// 제품 필터링 함수
function filterProducts(category) {
  const productCards = document.querySelectorAll(".product-card")
  const filterButtons = document.querySelectorAll(".filter-btn")

  // 모든 버튼의 active 클래스 제거
  filterButtons.forEach((btn) => btn.classList.remove("active"))

  // 클릭된 버튼에 active 클래스 추가
  event.target.classList.add("active")

  // 제품 카드 필터링
  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category")

    if (category === "all" || cardCategory === category) {
      card.style.display = "block"
      card.style.animation = "fadeIn 0.5s ease"
    } else {
      card.style.display = "none"
    }
  })
}

// 장바구니에 제품 추가 함수
function addToCart(productId) {
  const product = products[productId]

  if (product) {
    cart.addItem(productId, product.name, product.price)

    // 성공 메시지 표시
    showMessage(`${product.name}이(가) 장바구니에 추가되었습니다!`, "success")

    // 버튼 애니메이션 효과
    const button = event.target
    const originalText = button.textContent
    button.textContent = "추가됨!"
    button.style.background = "#4CAF50"

    setTimeout(() => {
      button.textContent = originalText
      button.style.background = "#2c5530"
    }, 1000)
  }
}

// 제품 카드 애니메이션 추가 함수
function addProductAnimations() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    // 순차적으로 애니메이션 실행
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
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

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease"
    setTimeout(() => messageDiv.remove(), 300)
  }, 3000)
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

// CSS 애니메이션 추가
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
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
