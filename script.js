let cart = [];

// 🧠 Cargar carrito desde localStorage al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const savedCart = localStorage.getItem("cartBMW");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
});

// Referencias DOM
const cartIcon = document.getElementById("cart-icon");
const cartWindow = document.getElementById("cart-window");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const buyBtn = document.getElementById("buy-cart");

// 🎉 Notificación visual
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 🛒 Actualizar carrito
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div>
        <p>${item.name}</p>
        <span>$${item.price.toLocaleString()}</span>
      </div>
      <button class="remove-btn" title="Eliminar">✖</button>
    `;
    li.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(index));
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.length;
  localStorage.setItem("cartBMW", JSON.stringify(cart));
}

// ➕ Añadir al carrito
function addToCart(product) {
  const productObj = {
    id: product.dataset.id,
    name: product.dataset.name,
    price: parseFloat(product.dataset.price),
    img: product.querySelector("img").src
  };
  cart.push(productObj);
  updateCart();
  showToast(`✅ ${productObj.name} añadida al carrito`);
  animateAddToCart(product.querySelector("button"));
}

// ❌ Eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  showToast("🗑️ Moto eliminada del carrito");
}

// 🧹 Vaciar carrito
document.getElementById("clear-cart").addEventListener("click", () => {
  if (cart.length > 0) {
    cart = [];
    updateCart();
    localStorage.removeItem("cartBMW");
    showToast("🧹 Carrito vaciado");
  }
});

// 🪟 Abrir/cerrar carrito
cartIcon.addEventListener("click", () => {
  cartWindow.classList.toggle("open");
});

// 🛍️ Botones de agregar
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", function() {
    addToCart(this.parentElement);
  });
});

// ----- MODAL DE COMPRA -----
const modal = document.getElementById("buy-modal");
const closeModal = document.querySelector(".close");
const buyForm = document.getElementById("buy-form");
const resumenDiv = document.getElementById("resumen-compra");

// Abrir modal al presionar "Comprar"
buyBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("❌ El carrito está vacío");
    return;
  }
  modal.style.display = "block";
});

// Cerrar modal
closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// 🧾 Enviar formulario y generar resumen + PDF
buyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();

  if (!nombre || !direccion || !tarjeta) {
    alert("⚠️ Por favor completa todos los campos.");
    return;
  }

  // Crear resumen visual
  let resumenHTML = `<h3>🧾 Resumen de compra</h3>`;
  resumenHTML += `<p><strong>Cliente:</strong> ${nombre}</p>`;
  resumenHTML += `<p><strong>Dirección:</strong> ${direccion}</p>`;
  resumenHTML += `<ul>`;
  cart.forEach(item => {
    resumenHTML += `<li>${item.name} - $${item.price.toLocaleString()}</li>`;
  });
  resumenHTML += `</ul>`;
  resumenHTML += `<p><strong>Total:</strong> $${cart.reduce((a, b) => a + b.price, 0).toLocaleString()}</p>`;
  resumenHTML += `<p>💳 Pago con tarjeta terminada en <strong>${tarjeta.slice(-4)}</strong></p>`;
  resumenHTML += `<button id="descargar-pdf" style="margin-top:10px;">📄 Descargar PDF</button>`;

  resumenDiv.innerHTML = resumenHTML;
  resumenDiv.style.display = "block";
  buyForm.style.display = "none";

  // Vaciar carrito
  cart = [];
  updateCart();
  localStorage.removeItem("cartBMW");

  // Botón para generar PDF
  document.getElementById("descargar-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("🧾 RESUMEN DE COMPRA BMW", 20, 20);
    doc.setFontSize(12);
    doc.text(`Cliente: ${nombre}`, 20, 35);
    doc.text(`Dirección: ${direccion}`, 20, 45);

    let y = 60;
    doc.text("Motocicletas:", 20, y);
    y += 10;

    cart.forEach(item => {
      doc.text(`- ${item.name}: $${item.price.toLocaleString()}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text(`Total: $${cart.reduce((a, b) => a + b.price, 0).toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Tarjeta: **** **** **** ${tarjeta.slice(-4)}`, 20, y);

    doc.save("resumen_compra_BMW.pdf");
  });
});

// 💫 Animación al añadir al carrito
function animateAddToCart(button) {
  const rect = button.getBoundingClientRect();
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = rect.left + rect.width / 2 + "px";
  bubble.style.top = rect.top + "px";
  document.body.appendChild(bubble);

  const cartRect = document.getElementById("cart-icon").getBoundingClientRect();
  bubble.animate([
    { transform: `translate(0, 0) scale(1)`, opacity: 1 },
    { transform: `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.1)`, opacity: 0.3 }
  ], { duration: 800, easing: "ease-in-out" });

  setTimeout(() => bubble.remove(), 800);
}
