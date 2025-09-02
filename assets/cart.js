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
function updateCart(line, quantity) {
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      line,
      quantity
    })
  }).then(res => res.json()).then(cart => {
    location.reload();
  });
}
//# sourceMappingURL=cart.js.map
