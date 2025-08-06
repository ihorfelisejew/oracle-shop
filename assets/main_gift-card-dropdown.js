document.addEventListener("DOMContentLoaded", () => {
  const giftCardBlock = document.querySelector(".promo-block .gift-card__price");
  const input = giftCardBlock.querySelector("input");
  const button = giftCardBlock.querySelector(".price__button");
  const dropdown = giftCardBlock.querySelector(".price__dropdown");
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      closeDropdown(button, dropdown);
    } else {
      button.classList.add("active");
      dropdown.classList.add("opened");
      dropdown.style.maxHeight = dropdown.scrollHeight + 14 + "px";
    }
  });
  const dropdownItems = dropdown.querySelectorAll(".price__item");
  dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        return;
      }
      button.querySelector("span").textContent = item.textContent;
      dropdownItems.forEach(otherItem => {
        otherItem.classList.remove("active");
      });
      const itemButton = item.querySelector("button");
      input.value = itemButton.textContent;
      console.log(input.value);
      item.classList.add("active");
      closeDropdown(button, dropdown);
    });
  });
  document.addEventListener("click", e => {
    if (!giftCardBlock.contains(e.target)) {
      closeDropdown(button, dropdown);
    }
  });
});
function closeDropdown(button, dropdown) {
  button.classList.remove("active");
  dropdown.classList.remove("opened");
  dropdown.style.maxHeight = "0";
}
//# sourceMappingURL=main_gift-card-dropdown.js.map
