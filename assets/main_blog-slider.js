const swiper = new Swiper(".blog__list", {
  slidesPerView: 1.1,
  spaceBetween: 10,
  breakpoints: {
    468: {
      slidesPerView: 1.3
    },
    570: {
      slidesPerView: 1.7
    },
    768: {
      slidesPerView: 2.2
    },
    1024: {
      slidesPerView: 3,
      allowTouchMove: false,
      spaceBetween: 24
    },
    1440: {
      slidesPerView: 3,
      allowTouchMove: false,
      spaceBetween: 30
    }
  }
});
//# sourceMappingURL=main_blog-slider.js.map
