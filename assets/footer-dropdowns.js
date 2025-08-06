document.addEventListener("DOMContentLoaded", () => {
  const dropdownBlocks = document.querySelectorAll(".footer-bottom .info-block");
  dropdownBlocks.forEach(block => {
    const button = block.querySelector(".info-block__button");
    const dropdown = block.querySelector(".info-block__dropdown");
    button.addEventListener("click", () => {
      dropdownBlocks.forEach(otherBlock => {
        if (otherBlock !== block) {
          closeDropdown(otherBlock.querySelector(".info-block__button"), otherBlock.querySelector(".info-block__dropdown"));
        }
      });
      if (button.classList.contains("active")) {
        closeDropdown(button, dropdown);
      } else {
        button.classList.add("active");
        dropdown.classList.add("opened");
        dropdown.style.maxHeight = dropdown.scrollHeight + 14 + "px";
      }
    });
    const dropdownItems = dropdown.querySelectorAll(".dropdown__item");
    dropdownItems.forEach(item => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
          return;
        }
        button.querySelector("span").textContent = item.textContent;
        dropdownItems.forEach(otherItem => {
          otherItem.classList.remove("active");
        });
        item.classList.add("active");
        closeDropdown(button, dropdown);
      });
    });
  });
  document.addEventListener("click", e => {
    dropdownBlocks.forEach(block => {
      const button = block.querySelector(".info-block__button");
      const dropdown = block.querySelector(".info-block__dropdown");
      if (!block.contains(e.target)) {
        closeDropdown(button, dropdown);
      }
    });
  });
});
function closeDropdown(button, dropdown) {
  button.classList.remove("active");
  dropdown.classList.remove("opened");
  dropdown.style.maxHeight = "0";
}
//# sourceMappingURL=footer-dropdowns.js.map
