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
    addToCartBtn.addEventListener("click", async function () {
      const variantId = document.getElementById("product-variant")?.value || "{{ product.selected_or_first_available_variant.id }}";
      const quantity = parseInt(document.getElementById("quantity").value) || 1;
      try {
        // Додаємо товар до корзини
        await fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: variantId,
            quantity
          })
        }).then(res => res.json());
        const sectionId = "cart-drawer";
        try {
          const response = await fetch(`/?sections=${sectionId}&sections_url=true`);
          const sections = await response.json();
          if (sections[sectionId]) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = sections[sectionId];
            const newCartDrawer = tempDiv.querySelector("#cart-drawer");
            if (newCartDrawer) {
              const cartWrapper = document.getElementById("cart-wrapper");
              cartWrapper.innerHTML = "";
              cartWrapper.appendChild(newCartDrawer);
              cartWrapper.classList.add("open");
              const newItemCount = newCartDrawer.querySelector(".cart__title")?.textContent.match(/\((\d+)\)/)?.[1] || 0;
              const cartButton = document.querySelector(".cart__button");
              if (cartButton) {
                const countEl = cartButton.querySelector(".count");
                if (countEl) countEl.textContent = `(${newItemCount})`;
              }
            }
          }
        } catch (error) {
          console.error("Error updating cart drawer:", error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding product to cart");
      }
    });
  }
});
//# sourceMappingURL=product_add-to-cart.js.map
