"use strict";

const header = document.querySelector("header");
const shippingNotice = header.querySelector(".shipping-notice__wrapper");
const headerMenuButtons = header.querySelectorAll(".menu-item__button");
const burgerButton = header.querySelector(".burger__button");
const menuBlock = header.querySelector(".header__menu");
const closeButton = menuBlock.querySelector(".close__button");
const phoneMenuBg = header.querySelector(".header__menu-background");
function checkPageScroll() {
  if (window.scrollY > 0) {
    shippingNotice.style.maxHeight = "0";
    header.classList.add("scrolled");
  } else {
    shippingNotice.style.maxHeight = shippingNotice.scrollHeight + "px";
    header.classList.remove("scrolled");
  }
}

// Закриває всі відкриті меню
function closeAllMenus() {
  headerMenuButtons.forEach(button => {
    const menuClass = button.dataset.menu;
    const menu = document.querySelector("." + menuClass);
    button.classList.remove("active");
    menu.classList.remove("active");
    /*------для десктопного меню------*/
    if (window.matchMedia("(min-width: 769px)").matches) {
      menu.style.maxHeight = "0";
      phoneMenuBg.classList.remove("active");
    }
  });
  header.classList.remove("opened");
}

// Вмикає/вимикає потрібне меню
function toggleMenu(button, menu) {
  const isActive = menu.classList.contains("active");
  closeAllMenus(); // Закриваємо всі інші меню

  if (!isActive) {
    button.classList.add("active");
    menu.classList.add("active");
    /*------для десктопного меню------*/
    if (window.matchMedia("(min-width: 769px)").matches) {
      menu.style.maxHeight = menu.scrollHeight + "px";
      header.classList.add("opened");
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Ініціалізація scroll
  checkPageScroll();

  // Клік по меню
  headerMenuButtons.forEach(button => {
    const menuClass = button.dataset.menu;
    const menu = document.querySelector("." + menuClass);
    button.addEventListener("click", e => {
      e.stopPropagation(); // Щоб не спрацьовував обробник document
      toggleMenu(button, menu);
    });
  });

  // Клік поза меню — закриває все
  document.addEventListener("click", event => {
    let clickInside = false;
    headerMenuButtons.forEach(button => {
      const menuClass = button.dataset.menu;
      const menu = document.querySelector("." + menuClass);
      if (button.contains(event.target) || menu.contains(event.target)) {
        clickInside = true;
      }
    });
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (menuBlock.contains(event.target) || burgerButton.contains(event.target)) {
        clickInside = true;
      }
    }
    if (!clickInside) {
      setTimeout(() => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          menuBlock.classList.remove("opened");
        }
      }, 300);
      closeAllMenus();
    }
  });

  // Скрол — оновлення shipping + закриття меню
  window.addEventListener("scroll", () => {
    checkPageScroll();
    closeAllMenus();
  });

  /*------mobile menu------*/
  if (window.matchMedia("(max-width: 768px)").matches) {
    /*-----open menu----------*/
    burgerButton.addEventListener("click", () => {
      menuBlock.classList.add("opened");
      phoneMenuBg.classList.add("active");
    });

    /*-----close menu----------*/
    closeButton.addEventListener("click", () => {
      menuBlock.classList.remove("opened");
      phoneMenuBg.classList.remove("active");
    });

    /*-----back to main menu-----*/
    headerMenuButtons.forEach(button => {
      const menuClass = button.dataset.menu;
      const menu = document.querySelector("." + menuClass);
      const menuBackButton = menu.querySelector(".back__button");
      const menuList = menu.querySelector(".categories__list");
      menuList.style.minHeight = menuList.scrollHeight + 40 + "px";
      menuBackButton.addEventListener("click", () => {
        const reloadedMenu = document.querySelector("." + menuClass);
        toggleMenu(button, reloadedMenu);
      });
    });
  }
});
//# sourceMappingURL=header-scrolled.js.map
