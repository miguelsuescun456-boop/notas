const formulario = document.getElementById("formulario");
const botonLimpiar = document.getElementById("limpiar");
const errorTexto = document.getElementById("error");

const panelResultado = document.getElementById("resultado");
const vacio = document.getElementById("vacio");
const contenido = document.getElementById("contenido");
const veredicto = document.getElementById("veredicto");
const detalle = document.getElementById("detalle");
const promedioTexto = document.getElementById("promedio");

const NOTA_MINIMA = 3.5;

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  errorTexto.textContent = "";

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const curso = document.getElementById("curso").value.trim();

  const notas = Array.from(document.querySelectorAll(".nota")).map(function (campo) {
    return parseFloat(campo.value);
  });

  // Validaciones
  if (!nombre || !apellido || !curso) {
    errorTexto.textContent = "Completa nombre, apellido y curso.";
    return;
  }

  if (isNaN(edad) || edad < 1 || edad > 120) {
    errorTexto.textContent = "Ingresa una edad válida.";
    return;
  }

  const notasInvalidas = notas.some(function (nota) {
    return isNaN(nota) || nota < 0 || nota > 5;
  });

  if (notasInvalidas) {
    errorTexto.textContent = "Las cuatro notas deben estar entre 0 y 5.";
    return;
  }

  // Cálculo del promedio (suma de las notas / cantidad de notas)
  const suma = notas.reduce(function (total, nota) {
    return total + nota;
  }, 0);
  const promedio = suma / notas.length;

  const aprobo = promedio >= NOTA_MINIMA;

  mostrarResultado(nombre, apellido, edad, curso, promedio, aprobo);
});

function mostrarResultado(nombre, apellido, edad, curso, promedio, aprobo) {
  vacio.hidden = true;
  contenido.hidden = false;

  panelResultado.classList.toggle("reprobo", !aprobo);

  veredicto.textContent = aprobo ? "Aprobó" : "Reprobó";
  detalle.textContent =
    "El estudiante " + nombre + " " + apellido + " (" + edad + " años) del curso " +
    curso + (aprobo ? " aprobó." : " reprobó.");
  promedioTexto.textContent = promedio.toFixed(2);
}

botonLimpiar.addEventListener("click", function () {
  formulario.reset();
  errorTexto.textContent = "";
  contenido.hidden = true;
  vacio.hidden = false;
  panelResultado.classList.remove("reprobo");
});
