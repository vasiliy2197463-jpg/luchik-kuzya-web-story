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

const filters = [...document.querySelectorAll(".filter")];
const photos = [...document.querySelectorAll(".photo")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox__close");

function filterPhotos(category) {
  photos.forEach((photo) => {
    photo.hidden = category !== "all" && photo.dataset.category !== category;
  });

  filters.forEach((filter) => {
    const isActive = filter.dataset.filter === category;
    filter.classList.toggle("filter--active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => filterPhotos(filter.dataset.filter));
});

photos.forEach((photo) => {
  photo.addEventListener("click", () => {
    const image = photo.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = photo.querySelector("figcaption").textContent;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
