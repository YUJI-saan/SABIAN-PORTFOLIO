'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// lightbox (certificates & artworks)
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const lbImg = document.querySelector("[data-lb-img]");
const lbTitle = document.querySelector("[data-lb-title]");
const lbCaption = document.querySelector("[data-lb-caption]");
let lbList = [], lbIndex = 0;

const lbShow = function (i) {
  lbIndex = (i + lbList.length) % lbList.length;
  const el = lbList[lbIndex];
  lbImg.src = el.dataset.src; lbImg.alt = el.dataset.title;
  lbTitle.textContent = el.dataset.title; lbCaption.textContent = el.dataset.caption;
}
const lbToggle = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll", modalContainer.classList.contains("active"));
}
document.querySelectorAll("[data-lightbox]").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    lbList = Array.from(this.closest("article").querySelectorAll("[data-lightbox]"))
      .filter(function (x) { return x.closest(".project-item").classList.contains("active"); });
    lbShow(lbList.indexOf(this));
    lbToggle();
  });
});
modalCloseBtn.addEventListener("click", lbToggle);
overlay.addEventListener("click", lbToggle);
document.querySelector("[data-lb-prev]").addEventListener("click", function () { lbShow(lbIndex - 1); });
document.querySelector("[data-lb-next]").addEventListener("click", function () { lbShow(lbIndex + 1); });
document.addEventListener("keydown", function (e) {
  if (!modalContainer.classList.contains("active")) return;
  if (e.key === "Escape") lbToggle();
  if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
  if (e.key === "ArrowRight") lbShow(lbIndex + 1);
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = this.dataset.target;
    for (let j = 0; j < pages.length; j++) {
      const on = pages[j].dataset.page === target;
      pages[j].classList.toggle("active", on);
      navigationLinks[j].classList.toggle("active", navigationLinks[j] === this);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#" + target);
  });
}
// open page from URL hash (e.g. index.html#works)
const hashLink = document.querySelector('[data-target="' + location.hash.slice(1) + '"]');
if (hashLink) hashLink.click();



// cursor spotlight on cards
document.addEventListener("pointermove", function (e) {
  const card = e.target.closest && e.target.closest(".content-card, .service-item, .project-item");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", (e.clientX - r.left) + "px");
  card.style.setProperty("--my", (e.clientY - r.top) + "px");
});



// typing role text in sidebar
const typed = document.querySelector("[data-typed]");
const roles = ["2nd Year College Student", "UI / UX Designer", "Aspiring Web Developer", "Digital Artist"];
if (typed && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let r = 0, c = roles[0].length, del = true;
  setInterval(function () {
    if (del) { c--; if (c <= 0) { del = false; r = (r + 1) % roles.length; } }
    else { c++; if (c >= roles[r].length) { del = true; c = roles[r].length; typed.textContent = roles[r]; return; } }
    typed.textContent = roles[r].slice(0, c) + "\u258C";
  }, 90);
}
