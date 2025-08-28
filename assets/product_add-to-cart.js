document.addEventListener("DOMContentLoaded", () => {
  const decreaseBtn = document.querySelector(".decrease__button");
  const increaseBtn = document.querySelector(".increase__button");
  const quantityInput = document.getElementById("quantity");
  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    increaseBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value) || 1;
      quantityInput.value = currentValue + 1;
    });
  }
  const addToCartBtn = document.getElementById("add-to-cart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const variantId = document.getElementById("product-variant")?.value || "{{ product.selected_or_first_available_variant.id }}";
      const quantity = document.getElementById("quantity").value;
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: variantId,
          quantity: parseInt(quantity)
        })
      }).then(response => response.json()).then(data => {
        // Оновлення кошика
        fetch("/cart.js").then(response => response.json()).then(cart => {
          // Тут можна оновити віджет кошика
          alert("Product added to cart!");
        });
      }).catch(error => {
        console.error("Error:", error);
        alert("Error adding product to cart");
      });
    });
  }
});
//# sourceMappingURL=product_add-to-cart.js.map
