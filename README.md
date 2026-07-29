# Taller de uso avanzado de IA — sitio de repaso

Sitio con los recursos y materiales de repaso del **Taller de uso avanzado de IA**, dictado en el marco de [Letra y Código](https://letras.filo.uba.ar/letra-y-c%C3%B3digo) (Departamento de Letras, FFyL–UBA). La página fue construida en vivo durante la clase de vibecoding, a partir de la especificación que está en `spec.md`.

## Qué hay en esta carpeta

| Archivo / carpeta | Qué es |
|---|---|
| `index.html` | La página principal. Todo el contenido está acá. |
| `guia-python.html` | La guía práctica de Python y uv (subpágina). |
| `estilos.css` | Los estilos: colores, tipografías, modo claro/oscuro. |
| `script.js` | El JavaScript: botón de tema y buscador del glosario. |
| `materiales/` | Los materiales del taller (PDFs, apuntes, imágenes…). |
| `generar-materiales.js` | Script que lista los materiales en la página (ver abajo). |
| `recursos.md` | Los enlaces curados por el equipo (fuente de varias listas). |
| `spec.md` | La especificación con la que se construyó el sitio. |
| `vercel.json` | Configuración para publicar en Vercel. |

## Ver la página en tu computadora

No hace falta instalar nada:

1. Descargá esta carpeta (o cloná el repositorio).
2. Hacé **doble click en `index.html`**. Se abre en tu navegador.

Eso es todo. Si preferís verla como se ve publicada (con una dirección `localhost`), y tenés Python instalado, abrí una terminal **en esta carpeta** y corré:

```bash
python3 -m http.server 8000
```

(en Windows el comando es `py -m http.server 8000`). Después entrá a [http://localhost:8000](http://localhost:8000) en el navegador. Para frenar el servidor: `Ctrl+C` en la terminal.

## Agregar un material y que aparezca en la página

1. **Copiá el archivo a la carpeta `materiales/`** (o a una subcarpeta, como `materiales/diapositivas/`). Conviene nombrarlo sin espacios: `mi-material.pdf`, no `mi material.pdf`.
2. **¿A qué sección va a ir?** Se decide por el nombre del archivo:
   - si el nombre contiene `modelos-locales`, va al módulo *Modelos locales*;
   - si contiene `agentes` (o `agente`), va a *Agentes*;
   - si contiene `vibecoding`, va a *Vibecoding*;
   - cualquier otro nombre va a *Materiales generales*.
3. **Subí el cambio al repositorio** (desde la terminal, en esta carpeta):
   ```bash
   git add .
   git commit -m "Agrego material X"
   git push
   ```
4. Listo: Vercel publica de nuevo el sitio solo, y al hacerlo ejecuta automáticamente el script que arma las listas. El material nuevo aparece con su nombre limpio y su tipo (pdf, apunte, imagen…).

**¿Y para verlo en tu computadora antes de subirlo?** Ahí sí hace falta tener [Node](https://nodejs.org) instalado (es gratis; alcanza con la versión "LTS"). Con Node instalado, corré en esta carpeta:

```bash
node generar-materiales.js
```

y recargá la página en el navegador. Este paso es opcional: si no lo corrés, el material igual va a aparecer en el sitio publicado, porque Vercel corre el script por vos en cada deploy.

**Detalle lindo:** si el material es un archivo Markdown (`.md`), el script lo convierte en una página HTML con el mismo diseño del sitio, así se lee cómodo en el navegador. Como título usa el encabezado (`# ...`) del propio archivo.

## Publicar el sitio en Vercel (una sola vez)

1. Subí el repositorio a [GitHub](https://github.com) (si no está ya).
2. Entrá a [vercel.com](https://vercel.com), creá una cuenta (podés entrar con GitHub) y elegí **Add New → Project**.
3. Importá este repositorio. No hay que configurar nada: el archivo `vercel.json` ya le dice a Vercel qué hacer.
4. Tocá **Deploy**. En un minuto el sitio queda publicado en una dirección `*.vercel.app`.

De ahí en más, cada `git push` publica la versión nueva automáticamente.

## Actualizar el glosario durante la clase

Los términos del glosario están directamente en `index.html`, buscando `id="lista-glosario"`. Para agregar uno: copiá un bloque `<div class="termino">...</div>` completo, pegalo donde corresponda y editá el término (`<dt>`) y la definición (`<dd>`). El buscador lo toma solo, sin tocar nada más.

## Decisiones de diseño (las no triviales)

- **Sitio estático, sin framework.** La spec pedía la arquitectura más simple que funcione: es HTML, CSS y un archivo corto de JavaScript. No hay nada que instalar para verlo ni para editarlo, y cualquier archivo se puede leer entero.
- **Un único paso de "construcción": `generar-materiales.js`.** Es el compromiso más chico que encontramos para que *agregar un archivo a `materiales/` y redeployar alcance*: un script de Node sin dependencias que escanea la carpeta, clasifica cada archivo por su nombre, inyecta las listas en `index.html` (entre marcadores `<!-- materiales:...:inicio/fin -->`) y convierte los apuntes `.md` en páginas con el estilo del sitio. Vercel lo corre en cada deploy (`vercel.json`); localmente es opcional.
- **La clasificación de materiales es por nombre de archivo** (ver arriba). Es deliberadamente tonta: no hay base de datos ni configuración, el nombre es la metadata. El costo es que hay que nombrar con intención; el beneficio es que cualquiera entiende la regla.
- **Tipografía como argumento.** Dos webfonts de Google Fonts con pilas de reserva del sistema: **Literata** (serif editorial) para el cuerpo de lectura y **IBM Plex Mono** (voz de máquina) para etiquetas, metadatos, términos técnicos y código. El contraste entre las dos voces es el tema de la página hecho forma. Una sola tinta de acento: azul profundo (`#17497a` en claro, `#8fb6e0` en oscuro).
- **Modo claro/oscuro con tres estados.** Por defecto la página sigue la preferencia del sistema (solo CSS); el botón "modo" guarda la elección manual en el navegador (`localStorage`) y la aplica antes de pintar, para que no haya destello al cargar.
- **Los enlaces de `recursos.md` se respetan textualmente**, incluida la URL `http` de Arborgram (el `https` no responde, está anotado en el propio archivo). "Herramientas y materiales del equipo" quedó en *Materiales generales*; las secciones de entornos virtuales y de bash/WSL quedaron juntas en la sección *Entorno de trabajo*, que además enlaza a la guía práctica pedida (`guia-python.html`).
- **El glosario es HTML plano a propósito**, para poder agregar términos en vivo durante la clase con un copy-paste (instrucciones en el propio `index.html`, como comentario).
