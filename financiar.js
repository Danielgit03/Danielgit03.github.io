// Modelos por marca (6 marcas x 6 modelos = 36 motos)
const modelosPorMarca = {
  "Honda": ["CBR 600RR", "CB 500F", "XR 150L", "Africa Twin", "CB 190R", "Wave 110S"],
  "Yamaha": ["MT-07", "MT-09", "FZ25", "YZF R15", "XSR700", "Tracer 900"],
  "Suzuki": ["GSX-R750", "V-Strom 650", "Gixxer 250", "Burgman 125", "DR-Z400", "Hayabusa"],
  "Kawasaki": ["Ninja 400", "Z900", "Versys 650", "KLX 250", "Vulcan S", "ZX-10R"],
  "KTM": ["Duke 200", "Duke 390", "RC 390", "Adventure 790", "Super Duke 1290", "EXC 250"],
  "BMW": ["G 310R", "F 900R", "R 1250GS", "S 1000RR", "F 850GS", "C 400GT"]
};

// Referencias al DOM
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const form = document.getElementById("formFinanciar");
const resultado = document.getElementById("resultado");

// Cambiar modelos al seleccionar marca
marca.addEventListener("change", () => {
  const marcaSeleccionada = marca.value;
  modelo.innerHTML = "<option value=''>Seleccione un modelo</option>";

  if (modelosPorMarca[marcaSeleccionada]) {
    modelosPorMarca[marcaSeleccionada].forEach(m => {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = m;
      modelo.appendChild(option);
    });
  }
});

// Calcular financiamiento
form.addEventListener("submit", e => {
  e.preventDefault();

  const precio = parseFloat(document.getElementById("precio").value);
  const cuota = parseFloat(document.getElementById("cuota").value);
  const meses = parseInt(document.getElementById("meses").value);
  const modeloSel = modelo.value;
  const marcaSel = marca.value;

  if (!marcaSel || !modeloSel || isNaN(precio) || isNaN(cuota) || isNaN(meses)) {
    alert("⚠️ Por favor completa todos los campos correctamente.");
    return;
  }

  if (cuota >= precio) {
    alert("⚠️ La cuota inicial no puede ser igual o mayor al precio total.");
    return;
  }

  // Cálculo simple con interés del 1.5% mensual
  const montoFinanciar = precio - cuota;
  const interesMensual = 0.015;
  const cuotaMensual = (montoFinanciar * interesMensual * Math.pow(1 + interesMensual, meses)) / (Math.pow(1 + interesMensual, meses) - 1);
  const totalPagar = cuotaMensual * meses + cuota;

  resultado.style.display = "block";
  resultado.innerHTML = `
    <h3>Resultado del Financiamiento</h3>
    <p>🏍️ <strong>${marcaSel} ${modeloSel}</strong></p>
    <p>💰 Precio total: <strong>${precio.toLocaleString()} COP</strong></p>
    <p>💵 Cuota inicial: <strong>${cuota.toLocaleString()} COP</strong></p>
    <p>📆 Plazo: <strong>${meses}</strong> meses</p>
    <p>💸 Cuota mensual aproximada: <strong>${Math.round(cuotaMensual).toLocaleString()} COP</strong></p>
    <p>🔹 Total a pagar con intereses: <strong>${Math.round(totalPagar).toLocaleString()} COP</strong></p>
  `;
});
