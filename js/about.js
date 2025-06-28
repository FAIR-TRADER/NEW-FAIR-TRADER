function toggleCard(card) {
  const allCards = document.querySelectorAll(".principle-card");
  allCards.forEach((c) => {
    if (c !== card) {
      c.classList.remove("active");
    }
  }); // 다른 카드들은 모두 닫기

  card.classList.toggle("active"); // 클릭한 카드만 열기/닫기 토글
}
