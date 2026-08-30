const cards = [...document.querySelectorAll(".card")];
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const status = document.querySelector("#status");

let activeIndex = 0;

function showChapter(index) {
  activeIndex = (index + cards.length) % cards.length;

  cards.forEach((card, cardIndex) => {
    card.classList.toggle("card--active", cardIndex === activeIndex);
  });

  status.textContent = `Глава ${activeIndex + 1} из ${cards.length}`;
}

previousButton.addEventListener("click", () => showChapter(activeIndex - 1));
nextButton.addEventListener("click", () => showChapter(activeIndex + 1));

cards.forEach((card, index) => {
  card.addEventListener("click", () => showChapter(index));
});
