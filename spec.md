## Objetivo

Construir un sitio web que sirva como material de repaso del "Taller de uso avanzado de IA", dictado en el marco de [Letra y Código](https://letras.filo.uba.ar/letra-y-c%C3%B3digo), proyecto del Departamento de Letras (Facultad de Filosofía y Letras, UBA). El público son estudiantes y docentes de letras y filosofía sin formación técnica: el sitio tiene que ser legible, sobrio y en **castellano rioplatense**.

## Modo de trabajo

- **No pidas aclaraciones ni esperes confirmaciones intermedias.** Esta página es un ejercicio: toda decisión que esta spec no fije es tuya. Decidí con criterio, anotá las decisiones no triviales en el README y seguí hasta terminar.
- **Generá un `README.md`** con instrucciones claras y completas para montar el sitio localmente, escritas para alguien sin experiencia técnica: qué hace falta tener instalado (si algo), los comandos exactos en orden, cómo ver la página en el navegador, cómo agregar un archivo a `materiales/` y redeployar, y las decisiones de diseño no triviales que tomaste.

## Requisitos técnicos

- El sitio puede ser estático o no: **el único dogma es que funcione bien**. Dicho eso, elegí la arquitectura más simple que cumpla esta spec — si no hay una razón concreta para un framework o un backend, no los uses.
- Tiene que poder deployarse en **Vercel** sin configuración heroica, y correr localmente con un comando simple (documentado en el `README.md` pedido en "Modo de trabajo").
- Responsive: legible en teléfono y en proyector. Sin scroll horizontal.
- Modo claro y modo oscuro según preferencia del sistema, con un botón para alternar manualmente.
- Tamaño de cuerpo generoso (mínimo 18px), buen contraste, interlineado cómodo. La elección tipográfica se rige por la sección Estética: se permiten hasta dos webfonts (self-hosted o de Google Fonts), siempre con pilas de reserva del sistema.
- HTML semántico y accesible: encabezados jerárquicos, atributos `lang`, `alt` en imágenes, navegación por teclado.
- El código debe quedar comentado en castellano, porque los estudiantes lo van a leer.

## Materiales del repositorio

El repositorio incluye una carpeta **`materiales/`** cuyo contenido no está fijado de antemano: puede traer PDFs, diapositivas, notebooks, imágenes, audio, texto plano o lo que el equipo del taller haya dejado ahí. El sitio tiene que **reconocerlos e integrarlos**:

- Inspeccioná la carpeta al construir el sitio y generá los enlaces a partir de lo que efectivamente hay — no inventes materiales ni dejes enlaces rotos a archivos inexistentes.
- Cada material se lista con un nombre legible (derivado del nombre de archivo, limpiado: sin guiones bajos ni extensiones a la vista), su tipo (PDF, diapositivas, notebook…) y, si el nombre lo permite, asociado al módulo del taller que corresponda (modelos locales, agentes, vibecoding); lo que no encaje en un módulo va a una sección "Materiales generales".
- Los archivos deben quedar servidos por el propio sitio (copiados o referenciados de modo que los enlaces funcionen tanto localmente como en el deploy de Vercel).
- Si la carpeta está vacía al momento de construir, la sección de materiales debe existir igual, con un aviso amable de que se irán publicando — y el sitio debe estar armado para que agregar un archivo a `materiales/` y redeployar baste para que aparezca listado (documentá en el README cómo).

## Recursos enlazados (`recursos.md`)

El repositorio incluye además un archivo **`recursos.md`** con enlaces curados por el equipo, organizados en secciones. Integralos en la página:

- La sección "Ejemplos de vibecoding" va dentro del módulo **Vibecoding**, como lista de muestra de lo que la práctica permite construir (con una línea de descripción cada uno, tomada del propio archivo).
- La sección "Herramientas y materiales del equipo" va donde mejor encaje según el contenido de cada enlace (un módulo específico o "Materiales generales").
- Las secciones "Manejo de entornos virtuales (Python)" y "Una misma terminal en los tres sistemas: bash y WSL" van juntas, en un módulo o apartado de entorno de trabajo (o en "Materiales generales"), conservando sus líneas de encuadre.
- El "Pedido para la página" incluido en la sección de entornos virtuales debe cumplirse: generá una **guía práctica propia** (subpágina o sección aparte) con el paso a paso que ahí se describe — instalar Python por primera vez, entender y arreglar la variable PATH, y gestionar un proyecto con uv de punta a punta con un ejemplo chico — usando los enlaces oficiales dados como referencias. Esta guía es la única parte donde tenés que redactar contenido propio más allá de los enlaces (la excepción a la regla siguiente).
- Respetá las URLs exactamente como figuran en el archivo (alguna es `http` a propósito) y no inventes descripciones más allá de lo que el archivo dice.
- Si `recursos.md` no está presente, la página se construye igual sin estas listas.

## Estética

Sobria, editorial e **híbrida**: clásica y tecnológica a la vez. La página trata del encuentro entre la tradición de la letra y las máquinas, y su forma tiene que decirlo — más biblioteca con una terminal abierta que startup.

- **La tipografía es el argumento.** Combiná dos voces: una **serif de tradición editorial** (p. ej. Literata, EB Garamond, Crimson Pro) para el cuerpo de lectura, y una **monoespaciada** con memoria de máquina de escribir y de terminal (p. ej. Courier Prime, IBM Plex Mono, JetBrains Mono) para títulos o etiquetas, metadatos, términos técnicos y bloques de código. El contraste serif/mono debe leerse como el tema de la página hecho forma: la hoja impresa y el código conviviendo.
- Hasta dos webfonts (self-hosted o Google Fonts) con pilas de reserva del sistema; si preferís no cargar ninguna, logralo con las pilas del sistema (Georgia/serif + ui-monospace) manteniendo el mismo contraste de voces.
- Detalles que refuercen la hibridez sin volverse disfraz: filetes finos como de página impresa, numeración de secciones, quizá un `>` o `$` como motivo discreto en los títulos de secciones técnicas. **Prohibido** el disfraz completo en cualquiera de las dos direcciones: ni terminal retro (fondo negro fosforescente) ni pergamino escaneado.
- Fondo neutro, una sola tinta de acento (un azul profundo u otra tinta seria), sin animaciones decorativas, sin emojis en los títulos. Que parezca hecha con criterio, no con plantilla.

## Estructura y contenido

### 1. Encabezado (hero)

- Título: **Taller de uso avanzado de IA**.
- Subtítulo: "Recursos y materiales de repaso — [Letra y Código](https://letras.filo.uba.ar/letra-y-c%C3%B3digo), Departamento de Letras, FFyL–UBA".
- Una línea que diga que esta página fue construida en vivo durante la clase de vibecoding, con un enlace ancla a la sección "Cómo se hizo esta página".
- Navegación fija y discreta con enlaces a todas las secciones (incluida la de materiales).

### 2. Los tres módulos del taller

Tres bloques, uno por clase, cada uno con un párrafo introductorio breve (redactalo vos: tono claro, sin jerga, dos o tres oraciones) y una lista de recursos con enlaces. Contenido inicial:

**Modelos locales**
- Qué significa correr un modelo "en tu computadora" y por qué importa (privacidad, costo, independencia).
- Recursos: [Ollama](https://ollama.com), [LM Studio](https://lmstudio.ai), [Hugging Face](https://huggingface.co).

**Agentes**
- Qué es un agente: un modelo de lenguaje que además de responder puede usar herramientas (leer archivos, buscar, ejecutar) en ciclos de acción y evaluación.
- Recursos: [Claude Code](https://claude.com/claude-code), documentación de agentes de los principales proveedores.

**Vibecoding**
- Programar delegando la escritura del código a un modelo de lenguaje. La destreza central no es tipear código: es especificar bien, criticar el resultado e iterar.
- Recursos: esta misma página como ejemplo; [Vercel](https://vercel.com), [GitHub](https://github.com).

### 3. Glosario

- Lista de términos con definición breve (una o dos oraciones, sin tecnicismos dentro de las definiciones).
- Un campo de búsqueda simple que filtre los términos en vivo (JavaScript mínimo).
- Términos iniciales: *modelo de lenguaje, prompt, token, contexto, modelo local, agente, vibecoding, código fuente, HTML, repositorio, commit, deploy, hosting, sitio estático, frontend, backend, API, alucinación, localhost, variable de entorno, clave de API*.
- Redactá las definiciones pensando en alguien de humanidades: preferí analogías con textos, ediciones y traducciones antes que metáforas de ingeniería.
- Dejá el HTML del glosario fácil de extender: durante la clase vamos a agregar términos nuevos.

**Fuente de los términos nuevos (para usar durante la clase, no al construir el sitio):** el público sugiere términos mediante un formulario cuyas respuestas caen en esta planilla: <https://docs.google.com/spreadsheets/d/1ejQA9SLjwaD88N4EcePR5095g1fc_xI_KYx3-B6-Gpo/edit?usp=sharing> (exportación CSV sin autenticación: `https://docs.google.com/spreadsheets/d/1ejQA9SLjwaD88N4EcePR5095g1fc_xI_KYx3-B6-Gpo/export?format=csv`). Columnas: marca temporal, "Términos o conceptos sugeridos" (puede haber varios por fila, separados por comas o saltos de línea) y "Comentarios adicionales o sugerencias sobre el enfoque del glosario". Cuando durante la clase se te pida incorporarla, el procedimiento es en dos fases:

1. **Proponer, sin tocar archivos**: descargá el CSV, separá y normalizá los términos (minúsculas salvo siglas, sin comillas, singular; los anglicismos técnicos quedan como se usan), unificá duplicados y variantes, convertí las preguntas en el término sobre el que preguntan, y clasificá cada candidato en **agregar** (término pertinente que falta), **ya está** (existe; si la duda sugiere que la definición no alcanza, proponé mejorarla) o **descartar** (spam, chistes, nombres de personas, sin relación con el taller — con una razón de una línea). Si los términos a agregar superan los veinticinco, priorizá los más pedidos y los más básicos. Los comentarios sobre el enfoque listalos aparte con tu recomendación. Mostrá la propuesta y **esperá confirmación** — es la única excepción al "no esperes confirmaciones" del Modo de trabajo, porque toca la página publicada con texto de terceros.
2. **Ejecutar la lista aprobada**: redactá las entradas nuevas con el mismo estilo y criterio del resto del glosario y registrá los prompts en la sección "Iteraciones".

### 4. Seguridad mínima

Sección breve, tono sereno, sin alarmismo — cuatro o cinco puntos para quien va a experimentar por su cuenta:

- La diferencia entre abrir una página en la propia máquina (doble click, `localhost`) y publicarla: lo público lo ve cualquiera, y puede quedar cacheado aunque después se borre.
- **El código se publica; las claves no.** Qué es una clave de API y qué es una variable de entorno: el archivo `.env` queda fuera del repositorio (`.gitignore`); en el hosting las claves se cargan aparte.
- Una clave commiteada queda en la historia del repositorio aunque se borre en la versión siguiente.
- No pegar claves ni datos personales (propios o ajenos) en prompts ni en repositorios públicos.
- Cierre: esta página es estática y no usa claves — por eso publicarla es seguro. Un proyecto con backend o APIs pagas convierte todo lo anterior en la primera preocupación.

### 5. Cómo se hizo esta página

Sección meta, breve, en primera persona del plural:
- Explicar que la página se construyó en vivo durante la clase, a partir de una especificación escrita en Markdown que un agente ejecutó.
- Un bloque `<details>` colapsable titulado "La especificación" con espacio para pegar el texto de esta spec (dejá un marcador claro donde pegarla).
- Una lista numerada "Iteraciones" con espacio para anotar los prompts de cambio que se pidan durante la clase (dejá dos o tres ítems de ejemplo vacíos con un marcador `<!-- completar en clase -->`).
- Cierre de una línea: la interfaz fue el castellano.

### Pie de página

- "Taller de uso avanzado de IA — Letra y Código, Departamento de Letras, FFyL–UBA, 2026", con el enlace a la página del proyecto. Sin datos personales, sin emails.

## Criterio de terminado

- El sitio corre localmente con el comando documentado en el README y se ve completo y correcto en claro y en oscuro.
- El `README.md` existe y alcanza por sí solo: una persona sin experiencia técnica puede montar el sitio localmente siguiendo únicamente sus instrucciones.
- Todo el texto visible está en castellano y sin placeholders tipo *lorem ipsum* (salvo los marcadores pedidos en la sección meta).
- El filtro del glosario funciona.
- Todos los archivos presentes en `materiales/` aparecen listados y sus enlaces abren el archivo correcto, tanto en local como tras el deploy; no hay ningún enlace roto en el sitio.
- Todos los enlaces de `recursos.md` aparecen en la página, en la sección que corresponde y con la URL intacta.
