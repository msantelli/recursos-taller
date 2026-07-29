#!/usr/bin/env node
/* ============================================================
   generar-materiales.js
   ------------------------------------------------------------
   Recorre la carpeta materiales/ y hace dos cosas:

   1. Inserta en index.html las listas de materiales, entre los
      marcadores <!-- materiales:...:inicio --> y :fin -->.
      Cada material se clasifica por su nombre de archivo:
      si contiene "modelos-locales", "agente" o "vibecoding" va
      al módulo correspondiente; el resto, a Materiales generales.

   2. Convierte los apuntes escritos en Markdown (.md) en páginas
      HTML con el estilo del sitio, para que se lean cómodas en
      el navegador.

   Se ejecuta con:  node generar-materiales.js
   En Vercel corre automáticamente en cada deploy (ver vercel.json),
   así que alcanza con agregar un archivo a materiales/ y pushear.
   No usa ninguna dependencia externa: solo Node.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const RAIZ = __dirname;
const CARPETA_MATERIALES = path.join(RAIZ, "materiales");
const INDEX = path.join(RAIZ, "index.html");

/* ------------------------------------------------------------
   Utilidades
   ------------------------------------------------------------ */

// Escapa caracteres especiales de HTML (para nombres y contenido)
function escaparHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Palabras que quedan en minúscula al armar un título
const PALABRAS_CHICAS = new Set([
  "de", "del", "la", "las", "el", "los", "y", "o", "u", "en",
  "con", "para", "por", "a", "un", "una", "al",
]);

// "1.clase-agentes-autonomos" → "Clase Agentes Autónomos" (aprox.):
// saca numeración inicial, cambia guiones por espacios y capitaliza.
function nombreLegible(nombreArchivo) {
  const sinExtension = nombreArchivo.replace(/\.[^.]+$/, "");
  const limpio = sinExtension
    .replace(/^\d+[.\-_ ]+/, "")   // numeración inicial tipo "1."
    .replace(/[-_.]+/g, " ")       // separadores → espacios
    .replace(/\s+/g, " ")
    .trim();
  return limpio
    .split(" ")
    .map((palabra, i) => {
      if (i > 0 && PALABRAS_CHICAS.has(palabra.toLowerCase())) {
        return palabra.toLowerCase();
      }
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    })
    .join(" ");
}

// ¿A qué módulo pertenece un archivo? Se decide por el nombre
// (incluida la subcarpeta). Lo que no encaja va a "generales".
function clasificarModulo(rutaRelativa) {
  const ruta = rutaRelativa.toLowerCase();
  if (/modelos?[-_ ]locales?/.test(ruta)) return "modelos-locales";
  if (/agente/.test(ruta)) return "agentes";
  if (/vibecoding/.test(ruta)) return "vibecoding";
  return "generales";
}

// Etiqueta de tipo según la extensión (lo que ve la persona)
function tipoDeArchivo(rutaRelativa) {
  const extension = path.extname(rutaRelativa).toLowerCase();
  const enDiapositivas = /diapositiva/.test(rutaRelativa.toLowerCase());
  switch (extension) {
    case ".pdf": return enDiapositivas ? "diapositivas · pdf" : "pdf";
    case ".md": return "apunte";
    case ".ipynb": return "notebook";
    case ".jpg": case ".jpeg": case ".png": case ".gif":
    case ".webp": case ".svg": return "imagen";
    case ".mp3": case ".wav": case ".ogg": case ".m4a": return "audio";
    case ".mp4": case ".webm": return "video";
    case ".txt": return "texto";
    case ".ppt": case ".pptx": case ".odp": case ".key": return "diapositivas";
    case ".doc": case ".docx": case ".odt": return "documento";
    case ".html": return "página";
    default: return extension.replace(".", "") || "archivo";
  }
}

/* ------------------------------------------------------------
   Conversor mínimo de Markdown a HTML
   ------------------------------------------------------------
   Cubre lo que usan los apuntes del taller: títulos, párrafos,
   listas, negrita, itálica, código en línea, bloques de código,
   enlaces y URLs sueltas. No pretende cubrir todo Markdown.
   ------------------------------------------------------------ */

// Formato dentro de una línea (negrita, código, enlaces…)
function formatoEnLinea(texto) {
  let resultado = escaparHtml(texto);

  // Código en línea primero, protegido para que no le apliquemos
  // negrita ni enlaces adentro
  const protegidos = [];
  resultado = resultado.replace(/`([^`]+)`/g, (_, codigo) => {
    protegidos.push("<code>" + codigo + "</code>");
    return "\u0000" + (protegidos.length - 1) + "\u0000";
  });

  // Negrita e itálica
  resultado = resultado.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  resultado = resultado.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Enlaces con texto: [texto](url)
  resultado = resultado.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // URLs sueltas (que no quedaron ya dentro de un href)
  resultado = resultado.replace(
    /(^|[\s(])((?:https?):\/\/[^\s<)]+)/g,
    '$1<a href="$2">$2</a>'
  );

  // Restaurar los códigos protegidos
  resultado = resultado.replace(/\u0000(\d+)\u0000/g, (_, i) => protegidos[i]);
  return resultado;
}

function markdownAHtml(markdown) {
  const lineas = markdown.split(/\r?\n/);
  const salida = [];
  let enCodigo = false;      // ¿estamos dentro de un bloque ``` ?
  let lineasCodigo = [];     // líneas acumuladas del bloque de código
  let parrafo = [];          // líneas acumuladas del párrafo actual
  let lista = null;          // "ul" | "ol" | null

  function cerrarParrafo() {
    if (parrafo.length) {
      salida.push("<p>" + parrafo.map(formatoEnLinea).join(" ") + "</p>");
      parrafo = [];
    }
  }

  function cerrarLista() {
    if (lista) {
      salida.push("</" + lista + ">");
      lista = null;
    }
  }

  for (const linea of lineas) {
    // Bloques de código delimitados por ```
    if (/^```/.test(linea)) {
      cerrarParrafo();
      cerrarLista();
      if (enCodigo) {
        salida.push("<pre><code>" + lineasCodigo.join("\n") + "</code></pre>");
        lineasCodigo = [];
      }
      enCodigo = !enCodigo;
      continue;
    }
    if (enCodigo) {
      lineasCodigo.push(escaparHtml(linea));
      continue;
    }

    // Títulos: #, ##, ###…
    const titulo = linea.match(/^(#{1,4})\s+(.*)$/);
    if (titulo) {
      cerrarParrafo();
      cerrarLista();
      const nivel = titulo[1].length;
      salida.push(`<h${nivel}>` + formatoEnLinea(titulo[2]) + `</h${nivel}>`);
      continue;
    }

    // Ítems de lista: "- " o "1. "
    const itemNoOrdenado = linea.match(/^\s*[-*]\s+(.*)$/);
    const itemOrdenado = linea.match(/^\s*\d+\.\s+(.*)$/);
    if (itemNoOrdenado || itemOrdenado) {
      cerrarParrafo();
      const tipo = itemNoOrdenado ? "ul" : "ol";
      if (lista !== tipo) {
        cerrarLista();
        salida.push("<" + tipo + ">");
        lista = tipo;
      }
      salida.push("<li>" + formatoEnLinea((itemNoOrdenado || itemOrdenado)[1]) + "</li>");
      continue;
    }

    // Línea en blanco: cierra el párrafo o la lista abiertos
    if (linea.trim() === "") {
      cerrarParrafo();
      cerrarLista();
      continue;
    }

    // Cualquier otra cosa se acumula como párrafo
    cerrarLista();
    parrafo.push(linea.trim());
  }

  cerrarParrafo();
  cerrarLista();
  if (enCodigo) {
    // Por si el apunte terminó con un bloque de código sin cerrar
    salida.push("<pre><code>" + lineasCodigo.join("\n") + "</code></pre>");
  }
  return salida.join("\n");
}

// Envuelve el HTML de un apunte con la plantilla del sitio.
// profundidad = cuántas carpetas hay que subir para llegar a la raíz.
function plantillaPagina(titulo, cuerpo, profundidad) {
  const prefijo = "../".repeat(profundidad);
  return `<!DOCTYPE html>
<!-- Página generada automáticamente por generar-materiales.js
     a partir de un apunte en Markdown. No editar a mano: editá
     el archivo .md correspondiente y volvé a correr el script. -->
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escaparHtml(titulo)} — Taller de uso avanzado de IA</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&display=swap" rel="stylesheet">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2317497a'/%3E%3Ctext x='16' y='23' font-family='monospace' font-size='20' fill='%23faf8f5' text-anchor='middle'%3E%24%3C/text%3E%3C/svg%3E">
  <link rel="stylesheet" href="${prefijo}estilos.css">
  <script>
    (function () {
      var tema = null;
      try { tema = localStorage.getItem("tema"); } catch (e) {}
      if (tema === "claro" || tema === "oscuro") {
        document.documentElement.setAttribute("data-tema", tema);
      }
    })();
  </script>
</head>
<body>
  <nav class="navegacion" aria-label="Navegación">
    <div class="navegacion-interior">
      <a href="${prefijo}index.html">← Volver a la página principal</a>
      <button class="boton-tema" id="boton-tema" type="button" aria-label="Cambiar entre modo claro y oscuro">modo</button>
    </div>
  </nav>
  <div class="contenido">
    <main class="pagina-interior">
${cuerpo}
    </main>
    <footer>
      <p>Taller de uso avanzado de IA — <a href="https://letras.filo.uba.ar/letra-y-c%C3%B3digo">Letra y Código</a>, Departamento de Letras, FFyL–UBA, 2026.</p>
    </footer>
  </div>
  <script src="${prefijo}script.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------
   1. Recorrer materiales/ y armar la lista
   ------------------------------------------------------------ */

function recorrerCarpeta(carpeta) {
  const encontrados = [];
  if (!fs.existsSync(carpeta)) return encontrados;
  for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
    if (entrada.name.startsWith(".")) continue; // archivos ocultos, afuera
    const rutaCompleta = path.join(carpeta, entrada.name);
    if (entrada.isDirectory()) {
      encontrados.push(...recorrerCarpeta(rutaCompleta));
    } else {
      encontrados.push(rutaCompleta);
    }
  }
  return encontrados;
}

const todosLosArchivos = recorrerCarpeta(CARPETA_MATERIALES).sort();

// Separar los .md (que convertimos a página) del resto, y descartar
// los .html que este mismo script generó en corridas anteriores
// (los reconocemos porque existe un .md con el mismo nombre).
const materiales = [];

for (const rutaCompleta of todosLosArchivos) {
  const rutaRelativa = path
    .relative(RAIZ, rutaCompleta)
    .split(path.sep)
    .join("/"); // separadores web, aunque corra en Windows

  const extension = path.extname(rutaCompleta).toLowerCase();

  // ¿Es un HTML generado a partir de un .md? Entonces no se lista.
  if (extension === ".html") {
    const mdHermano = rutaCompleta.replace(/\.html$/i, ".md");
    if (fs.existsSync(mdHermano)) continue;
  }

  let nombre = nombreLegible(path.basename(rutaCompleta));
  let enlace = rutaRelativa;

  // Los apuntes .md se convierten a páginas HTML con el estilo del
  // sitio; el enlace apunta a la página generada. Como nombre usamos
  // el título (# ...) del propio apunte, si lo tiene.
  if (extension === ".md") {
    const contenido = fs.readFileSync(rutaCompleta, "utf8");
    const tituloMd = contenido.match(/^#\s+(.+)$/m);
    if (tituloMd) nombre = tituloMd[1].trim();
    const cuerpo = markdownAHtml(contenido);
    const profundidad = rutaRelativa.split("/").length - 1;
    const rutaHtml = rutaCompleta.replace(/\.md$/i, ".html");
    fs.writeFileSync(rutaHtml, plantillaPagina(nombre, cuerpo, profundidad));
    enlace = rutaRelativa.replace(/\.md$/i, ".html");
    console.log("Apunte convertido: " + rutaRelativa + " → " + enlace);
  }

  materiales.push({
    nombre,
    enlace,
    tipo: tipoDeArchivo(rutaRelativa),
    modulo: clasificarModulo(rutaRelativa),
  });
}

/* ------------------------------------------------------------
   2. Inyectar las listas en index.html
   ------------------------------------------------------------ */

function itemHtml(material) {
  return (
    `          <li class="material">` +
    `<a href="${escaparHtml(material.enlace)}">${escaparHtml(material.nombre)}</a>` +
    `<span class="material-tipo">${escaparHtml(material.tipo)}</span></li>`
  );
}

function bloqueDeModulo(modulo) {
  const delModulo = materiales.filter((m) => m.modulo === modulo);
  if (modulo !== "generales") {
    // En los módulos, si no hay materiales no se muestra nada
    if (!delModulo.length) return "";
    return (
      `        <h3 class="subtitulo-lista">Materiales de la clase</h3>\n` +
      `        <ul class="lista-materiales">\n` +
      delModulo.map(itemHtml).join("\n") + "\n" +
      `        </ul>`
    );
  }
  // En Materiales generales siempre hay algo: la lista o un aviso
  if (!delModulo.length) {
    const aviso = materiales.length
      ? "Por ahora no hay materiales generales: los publicados están en el módulo de su clase."
      : "Todavía no hay materiales publicados. Se irán subiendo a medida que avance el taller.";
    return `        <p class="aviso">${aviso}</p>`;
  }
  return (
    `        <ul class="lista-materiales">\n` +
    delModulo.map(itemHtml).join("\n") + "\n" +
    `        </ul>`
  );
}

let index = fs.readFileSync(INDEX, "utf8");

for (const modulo of ["modelos-locales", "agentes", "vibecoding", "generales"]) {
  const inicio = `<!-- materiales:${modulo}:inicio -->`;
  const fin = `<!-- materiales:${modulo}:fin -->`;
  const patron = new RegExp(inicio + "[\\s\\S]*?" + fin);
  if (!patron.test(index)) {
    console.error("No encontré los marcadores de " + modulo + " en index.html");
    process.exit(1);
  }
  const bloque = bloqueDeModulo(modulo);
  index = index.replace(
    patron,
    inicio + (bloque ? "\n" + bloque + "\n        " : "\n        ") + fin
  );
}

fs.writeFileSync(INDEX, index);

console.log(
  "Listo: " + materiales.length + " materiales listados en index.html."
);
