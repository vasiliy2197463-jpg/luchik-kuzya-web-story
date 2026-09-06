const cards = [...document.querySelectorAll(".card")];
const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector("#main-menu");

function closeMenu() {
  mainMenu.classList.remove("nav__links--open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
}

menuToggle.addEventListener("click", () => {
  const shouldOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  mainMenu.classList.toggle("nav__links--open", shouldOpen);
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  menuToggle.setAttribute("aria-label", shouldOpen ? "Закрыть меню" : "Открыть меню");
});

mainMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const status = document.querySelector("#status");
const compactStory = window.matchMedia("(max-width: 900px)");

let activeIndex = 0;

function showChapter(index) {
  activeIndex = (index + cards.length) % cards.length;

  cards.forEach((card, cardIndex) => {
    card.classList.toggle("card--active", cardIndex === activeIndex);
  });

  if (compactStory.matches) {
    cards[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  status.textContent = `Глава ${activeIndex + 1} из ${cards.length}`;
}

previousButton.addEventListener("click", () => showChapter(activeIndex - 1));
nextButton.addEventListener("click", () => showChapter(activeIndex + 1));

cards.forEach((card, index) => {
  card.addEventListener("click", () => showChapter(index));
});

const filters = [...document.querySelectorAll(".filter")];
const photos = [...document.querySelectorAll(".photo")];
const photoGrid = document.querySelector(".photo-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox__close");
const compactGallery = window.matchMedia("(max-width: 800px)");

function filterPhotos(category) {
  photoGrid.classList.toggle("photo-grid--awaiting", !category);

  photos.forEach((photo) => {
    photo.hidden = !category || (category !== "all" && photo.dataset.category !== category);
  });

  filters.forEach((filter) => {
    const isActive = filter.dataset.filter === category;
    filter.classList.toggle("filter--active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
}

function adaptGalleryToViewport() {
  const activeFilter = filters.find((filter) => filter.classList.contains("filter--active"));

  if (compactGallery.matches && (!activeFilter || activeFilter.dataset.filter === "all")) {
    filterPhotos(null);
    return;
  }

  if (!compactGallery.matches && !activeFilter) filterPhotos("all");
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => filterPhotos(filter.dataset.filter));
});

adaptGalleryToViewport();
compactGallery.addEventListener("change", adaptGalleryToViewport);

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

// Отдельное управление слайдером персонажей. Эти переменные и классы
// не связаны со слайдером видео ниже.
const banditsTrack = document.querySelector(".bandits-carousel__track");
const banditCards = [...document.querySelectorAll(".bandit-card")];
const banditsDots = [...document.querySelectorAll(".bandits-carousel__dot")];
const previousBandit = document.querySelector(".bandits-carousel__arrow--prev");
const nextBandit = document.querySelector(".bandits-carousel__arrow--next");
const compactBandits = window.matchMedia("(max-width: 900px)");
let activeBandit = 0;

function showBandit(index) {
  activeBandit = (index + banditCards.length) % banditCards.length;
  banditsTrack.style.transform = compactBandits.matches
    ? `translateX(-${activeBandit * 100}%)`
    : "none";

  banditsDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeBandit;
    dot.classList.toggle("bandits-carousel__dot--active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

previousBandit.addEventListener("click", () => showBandit(activeBandit - 1));
nextBandit.addEventListener("click", () => showBandit(activeBandit + 1));
banditsDots.forEach((dot, index) => dot.addEventListener("click", () => showBandit(index)));
compactBandits.addEventListener("change", () => showBandit(activeBandit));
showBandit(0);

const animationButtons = [...document.querySelectorAll(".animation-play")];
const videoDialog = document.querySelector("#video-dialog");
const storyVideo = document.querySelector("#story-video");
const videoDialogTitle = document.querySelector("#video-dialog-title");
const closeAnimation = document.querySelector(".video-dialog__close");
const animationTrack = document.querySelector(".animation-carousel__track");
const animationDots = [...document.querySelectorAll(".animation-carousel__dot")];
const previousAnimation = document.querySelector(".animation-carousel__arrow--prev");
const nextAnimation = document.querySelector(".animation-carousel__arrow--next");
let activeAnimation = 0;

function showAnimationSlide(index) {
  activeAnimation = (index + animationButtons.length) % animationButtons.length;
  animationTrack.style.transform = `translateX(-${activeAnimation * 100}%)`;

  animationDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeAnimation;
    dot.classList.toggle("animation-carousel__dot--active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

previousAnimation.addEventListener("click", () => showAnimationSlide(activeAnimation - 1));
nextAnimation.addEventListener("click", () => showAnimationSlide(activeAnimation + 1));
animationDots.forEach((dot, index) => dot.addEventListener("click", () => showAnimationSlide(index)));

animationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    storyVideo.src = button.dataset.video;
    videoDialogTitle.textContent = button.dataset.title;
    videoDialog.showModal();
    storyVideo.play().catch(() => {});
  });
});

function closeVideo() {
  storyVideo.pause();
  videoDialog.close();
}

closeAnimation.addEventListener("click", closeVideo);
videoDialog.addEventListener("click", (event) => {
  if (event.target === videoDialog) closeVideo();
});

videoDialog.addEventListener("close", () => storyVideo.pause());
