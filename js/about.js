function toggleCard(card) {
  // 모든 원칙 카드를 선택 (NodeList로 가져옴)
  const allCards = document.querySelectorAll(".principle-card");

  // 반복문을 돌며 클릭한 카드가 아닌 모든 카드의 active 클래스를 제거 (닫힘 상태로 만듦)
  // 원래 active 클래스가 있는 카드는 열려있는 상태여서 클릭한 카드 외의 모든 카드를 닫기 위해 사용함
  allCards.forEach((c) => {
    if (c !== card) {
      c.classList.remove("active");
    }
  });

  // 클릭한 카드의 active 클래스를 토글 (열려 있으면 닫고, 닫혀 있으면 열기)
  card.classList.toggle("active");
  // 한 번에 한 카드만 열릴 수 있으며 이미 열려있는 카드를 다시 클릭하면 닫을 수 있음
}
