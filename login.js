    // Validación simple del formulario
const form = document.getElementById('formLogin');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
  e.preventDefault(); // Evita el envío del formulario
  let valido = true;

  // Limpiar errores previos
  limpiarErrores();

  // Validar usuario
  if (usuario.value.trim() === '') {
    mostrarError(usuario, 'El campo usuario es obligatorio');
    valido = false;
  }

  // Validar contraseña
  if (password.value.trim() === '') {
    mostrarError(password, 'La contraseña es obligatoria');
    valido = false;
  } else if (password.value.length < 6) {
    mostrarError(password, 'Debe tener al menos 6 caracteres');
    valido = false;
  }

  // Si todo está correcto
  if (valido) {
    alert('✅ Inicio de sesión exitoso');
    form.reset();
  }
});

function mostrarError(input, mensaje) {
  const grupo = input.parentElement;
  const error = grupo.querySelector('.error');
  error.textContent = mensaje;
  input.style.borderColor = '#d93025';
}

function limpiarErrores() {
  document.querySelectorAll('.error').forEach(e => e.textContent = '');
  document.querySelectorAll('input').forEach(i => i.style.borderColor = '#ccc');
}
