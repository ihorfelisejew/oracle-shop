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

        // Оновлюємо секцію кошика через Shopify Sections API
        const sectionId = "cart-drawer"; // ID секції з {% section 'cart-drawer' %}
        const response = await fetch(`/?sections=${sectionId}&sections_url=true`);
        const sections = await response.json();

        // Замінюємо контент корзини
        const cartWrapper = document.getElementById("cart-wrapper"); // шукаємо за id
        if (sections[sectionId]) {
          cartWrapper.innerHTML = sections[sectionId];
          cartWrapper.classList.add("open");
          const newCartDrawer = cartWrapper.querySelector("#cart-drawer");
          const newItemCount = newCartDrawer.querySelector(".cart__title")?.textContent.match(/\((\d+)\)/)?.[1] || 0;
          const cartButton = document.querySelector(".cart__button");
          cartButton.querySelector(".count").textContent = `(${newItemCount})`;
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding product to cart");
      }
    });
  }
});
//# sourceMappingURL=product_add-to-cart.js.map
