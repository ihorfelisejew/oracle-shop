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
    const menu = button.closest(".menu__item").querySelector(".categories__wrapper");
    button.classList.remove("active");
    menu.classList.remove("active");
    /*------для десктопного меню------*/
    if (window.matchMedia("(min-width: 769px)").matches) {
      menu.style.maxHeight = "0";
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
    const menu = button.closest(".menu__item").querySelector(".categories__wrapper");
    button.addEventListener("click", e => {
      e.stopPropagation(); // Щоб не спрацьовував обробник document
      toggleMenu(button, menu);
    });
  });

  // Клік поза меню — закриває все
  document.addEventListener("click", event => {
    let clickInside = false;
    headerMenuButtons.forEach(button => {
      const menu = button.closest(".menu__item").querySelector(".categories__wrapper");
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
          phoneMenuBg.classList.remove("active");
        }
      }, 300);
      closeAllMenus();
    }
  });

  // Скрол — оновлення shipping + закриття меню
  window.addEventListener("scroll", () => {
    checkPageScroll();
    if (window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(() => {
        menuBlock.classList.remove("opened");
        phoneMenuBg.classList.remove("active");
      }, 300);
    }
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
      const menu = button.closest(".menu__item").querySelector(".categories__wrapper");
      const menuBackButton = menu.querySelector(".back__button");
      const menuList = menu.querySelector(".categories__list");
      menuList.style.minHeight = menuList.scrollHeight + 40 + "px";
      menuBackButton.addEventListener("click", () => {
        const reloadedMenu = document.querySelector("." + menuClass);
        toggleMenu(button, reloadedMenu);
      });
    });
  }
  const cartButton = header.querySelector(".cart__button");
  const cartWrapper = document.getElementById("cart-wrapper");
  if (cartButton && cartWrapper) {
    cartButton.addEventListener("click", async e => {
      e.preventDefault();
      try {
        const response = await fetch(`/?sections=cart-drawer`);
        const sections = await response.json();
        if (sections["cart-drawer"]) {
          cartWrapper.innerHTML = sections["cart-drawer"];
          cartWrapper.classList.add("open");

          // Повторно додаємо eventListener-и для кнопок +/- та remove
          initCartButtons(cartWrapper);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
  function initCartButtons(wrapper) {
    wrapper.querySelectorAll(".qty-btn.minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        let value = parseInt(input.value) || 1;
        if (value > 1) input.value = value - 1;
      });
    });
    wrapper.querySelectorAll(".qty-btn.plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        let value = parseInt(input.value) || 1;
        input.value = value + 1;
      });
    });
    wrapper.querySelectorAll(".cart-item__remove").forEach(btn => {
      btn.addEventListener("click", async () => {
        const line = btn.dataset.line;
        await fetch(`/cart/change.js`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            line,
            quantity: 0
          })
        });
        // Оновити Drawer після видалення
        cartButton.click();
      });
    });
  }

  /*------Закриття кошика при кліку поза ним (за потреби)------*/
  document.addEventListener("click", e => {
    if (cartWrapper.classList.contains("open") && !cartWrapper.contains(e.target) && !cartButton.contains(e.target)) {
      cartWrapper.classList.remove("open");
    }
  });
});
//# sourceMappingURL=header-scrolled.js.map
