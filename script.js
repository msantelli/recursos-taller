/* ============================================================
   script.js — el único JavaScript de la página.
   Hace dos cosas, nada más:
   1. El botón que alterna entre modo claro y oscuro.
   2. El buscador del glosario, que filtra términos en vivo.
   ============================================================ */

/* ------------------------------------------------------------
   1. Modo claro / oscuro
   ------------------------------------------------------------
   Por defecto la página sigue la preferencia del sistema (eso lo
   resuelve el CSS solo). Si la persona toca el botón, guardamos
   su elección en localStorage y la aplicamos con el atributo
   data-tema en <html>, que pisa a la preferencia del sistema.
   ------------------------------------------------------------ */

var botonTema = document.getElementById("boton-tema");

// ¿Qué tema se está viendo ahora mismo?
function temaActual() {
  var elegido = document.documentElement.getAttribute("data-tema");
  if (elegido) return elegido;
  // Sin elección manual: manda la preferencia del sistema
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oscuro"
    : "claro";
}

// El botón muestra el tema al que se va a CAMBIAR, no el actual
function actualizarBoton() {
  if (!botonTema) return;
  var proximo = temaActual() === "oscuro" ? "claro" : "oscuro";
  botonTema.textContent = "modo " + proximo;
}

if (botonTema) {
  botonTema.addEventListener("click", function () {
    var nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
    document.documentElement.setAttribute("data-tema", nuevo);
    // Guardamos la elección para las próximas visitas.
    // El try protege contra navegadores con almacenamiento bloqueado.
    try {
      localStorage.setItem("tema", nuevo);
    } catch (e) {}
    actualizarBoton();
  });
  actualizarBoton();
}

/* ------------------------------------------------------------
   2. Buscador del glosario
   ------------------------------------------------------------
   Filtra los bloques .termino comparando lo tipeado contra el
   término (el <dt>), no contra su definición. Ignora mayúsculas
   y tildes, para que "alucinacion" encuentre "alucinación".
   ------------------------------------------------------------ */

var buscador = document.getElementById("buscador-glosario");
var listaGlosario = document.getElementById("lista-glosario");
var sinResultados = document.getElementById("sin-resultados");

// Normaliza un texto: minúsculas y sin tildes
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")                    // separa letra y tilde…
    .replace(/[\u0300-\u036f]/g, ""); // …y descarta la tilde
}

if (buscador && listaGlosario) {
  buscador.addEventListener("input", function () {
    var consulta = normalizar(buscador.value.trim());
    var terminos = listaGlosario.querySelectorAll(".termino");
    var visibles = 0;

    terminos.forEach(function (termino) {
      // Coincide solo si la consulta aparece en el nombre del término
      var nombre = termino.querySelector("dt").textContent;
      var coincide = normalizar(nombre).indexOf(consulta) !== -1;
      termino.hidden = !coincide;
      if (coincide) visibles++;
    });

    // Si no quedó nada visible, mostramos el aviso
    if (sinResultados) {
      sinResultados.hidden = visibles > 0;
    }

    // Los grupos con subtítulo (p. ej. "Términos fronterizos") se
    // ocultan enteros cuando ninguno de sus términos coincide
    listaGlosario.querySelectorAll(".grupo-glosario").forEach(function (grupo) {
      var quedanVisibles = grupo.querySelectorAll(".termino:not([hidden])").length;
      grupo.hidden = quedanVisibles === 0;
    });
  });
}
