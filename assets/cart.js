document.addEventListener("click", function (e) {
  if (e.target.classList.contains("qty-btn")) {
    const line = e.target.dataset.line;
    const input = document.querySelector(`input[data-line="${line}"]`);
    let quantity = parseInt(input.value);
    if (e.target.classList.contains("plus")) {
      quantity++;
    } else if (e.target.classList.contains("minus") && quantity > 1) {
      quantity--;
    }
    updateCart(line, quantity);
  }
  if (e.target.classList.contains("cart-item__remove")) {
    updateCart(e.target.dataset.line, 0);
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
      cartWrapper.innerHTML = sections[sectionId];
      cartWrapper.classList.add("open");
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}
//# sourceMappingURL=cart.js.map
