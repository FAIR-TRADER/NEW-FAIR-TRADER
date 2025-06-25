document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", handleScrollAnimations);
});

function toggleCard(card) {
  const allCards = document.querySelectorAll(".principle-card");
  allCards.forEach((c) => {
    if (c !== card) {
      c.classList.remove("active");
    }
  });

  card.classList.toggle("active");

  if (card.classList.contains("active")) {
    card.style.transform = "scale(1.02)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 200);
  }
}

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    if (stat.getAttribute("data-animated") === "true") {
      return;
    }

    const target = Number.parseInt(stat.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        stat.setAttribute("data-animated", "true");
      }

      stat.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

function handleScrollAnimations() {
  const elements = document.querySelectorAll(".principle-card, .stat-item");
  const statisticsSection = document.querySelector(".statistics-section");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });

  if (statisticsSection) {
    const sectionTop = statisticsSection.getBoundingClientRect().top;
    const sectionVisible = window.innerHeight * 0.7;

    if (
      sectionTop < sectionVisible &&
      !statisticsSection.getAttribute("data-animated")
    ) {
      statisticsSection.setAttribute("data-animated", "true");
      animateStats();
    }
  }
}

window.addEventListener("load", () => {
  const animatedElements = document.querySelectorAll(
    ".principle-card, .stat-item"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  handleScrollAnimations();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
  }

  if (
    event.key === "Enter" &&
    event.target.classList.contains("principle-card")
  ) {
    toggleCard(event.target);
  }
});

document.querySelectorAll(".principle-card").forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-expanded", "false");

  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(this);

      const isActive = this.classList.contains("active");
      this.setAttribute("aria-expanded", isActive);
    }
  });
});
