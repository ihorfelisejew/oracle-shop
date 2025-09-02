document.addEventListener("click", function (e) {
  const cartWrapper = document.querySelector(".cart-wrapper");
  if (e.target.classList.contains("qty-btn")) {
    const line = e.target.dataset.line;
    const input = document.querySelector(`input[data-line="${line}"]`);
    let quantity = parseInt(input.value);
    if (e.target.classList.contains("plus")) {
      quantity++;
    } else if (e.target.classList.contains("minus")) {
      quantity--;
      if (quantity < 1) quantity = 0;
    }
    updateCart(line, quantity);
  }
  if (e.target.closest(".cart-item__remove")) {
    const line = e.target.closest(".cart-item__remove").dataset.line;
    updateCart(line, 0);
  }
  if (e.target.closest(".cart-drawer__close")) {
    cartWrapper.classList.remove("open");
  }
});
async function updateCart(line, quantity) {
  try {
    await fetch("/cart/change.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        line,
        quantity
      })
    }).then(res => res.json());
    const sectionId = "cart-drawer";
    const response = await fetch(`/?sections=${sectionId}&sections_url=true`);
    const sections = await response.json();
    const cartWrapper = document.querySelector(".cart-wrapper");
    if (sections[sectionId]) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = sections[sectionId];
      const newCartDrawer = tempDiv.querySelector("#cart-drawer");
      cartWrapper.innerHTML = "";
      cartWrapper.appendChild(newCartDrawer);
      cartWrapper.classList.add("open");
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}
//# sourceMappingURL=cart.js.map
