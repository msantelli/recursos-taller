# Recursos para la página del taller

## Ejemplos de vibecoding

Sitios hechos delegando la escritura del código a modelos de lenguaje. Muestran lo que la práctica permite construir:

- Sitio personal del docente — https://maurosantelli.com.ar
- epistrophē, planificador de la carrera de Filosofía (UBA) — https://epistrophe-uba.vercel.app
- Axiomática, derivaciones lógicas estilo Hilbert — https://axiomatica.netlify.app
- Interpretación radical, app pedagógica sobre Davidson — https://radical-interpretation.netlify.app
- Pragma-graph, grafos pragmáticos — https://pragma-graph.netlify.app
- GOGAR, juego de dar y pedir razones — https://gogar-web.vercel.app
- Dos notas sobre IA en 421: https://www.421.news/es/chat-modelos-lenguaje-academia-llm/ · https://www.421.news/es/como-hostear-la-ia-computadora/

## Herramientas y materiales del equipo

- Arborgram — http://arborgram.pablo.ar (mantener el enlace en `http`: el `https` no responde)
- Sintaxgram — https://sintaxgram.pablozd.ar
- Git basics, del seminario de gramáticas formales (Fernando Carranza) — https://fernandocar86.github.io/seminario-gramaticas-formales/Clase-02/git-basics.html

## Manejo de entornos virtuales (Python)

Para que cada proyecto tenga sus propias dependencias sin romper la instalación del sistema. Basta con conocer una de estas opciones:

- uv — gestor moderno y rápido de proyectos y entornos; `uv sync` instala todo lo declarado en el proyecto — https://docs.astral.sh/uv/
- venv + pip — la vía estándar incluida con Python (`python -m venv`), guía oficial de instalación de paquetes en entornos virtuales — https://docs.python.org/3/library/venv.html · https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
- conda / Miniconda — entornos que además manejan la versión de Python y librerías no-Python; común en ciencia de datos — https://docs.conda.io/en/latest/ · https://www.anaconda.com/docs/getting-started/miniconda/main

**Pedido para la página:** además de los enlaces, incluir una **guía práctica propia** (subpágina o sección aparte) con un ejemplo completo paso a paso, pensada para quien nunca instaló nada:

1. **Instalar Python por primera vez** — descarga desde el sitio oficial (https://www.python.org/downloads/) y guía oficial para Windows (https://docs.python.org/es/3/using/windows.html); en el instalador clásico de Windows, marcar la casilla "Add python.exe to PATH". Alternativa: uv puede instalar Python por sí solo (https://docs.astral.sh/uv/guides/install-python/).
2. **La variable PATH** — qué es (la lista de carpetas donde la terminal busca los programas), cómo diagnosticar el error típico ("`python` no se reconoce como comando") y cómo editarla — doc oficial de Python: https://docs.python.org/es/3.12/using/windows.html#excursus-setting-environment-variables (el instalador de uv la configura solo: https://docs.astral.sh/uv/getting-started/installation/).
3. **Gestionar un proyecto con uv de punta a punta** — `uv init`, `uv add`, `uv run`, `uv sync`, siguiendo la guía oficial de proyectos: https://docs.astral.sh/uv/guides/projects/ — con un ejemplo concreto y chico (p. ej. un script que cuenta palabras de un `.txt`).

## Una misma terminal en los tres sistemas: bash y WSL

Linux y macOS ya traen una terminal tipo Unix (en macOS la shell por defecto es zsh, que a este nivel funciona igual que bash); en Windows se consigue instalando WSL, una Ubuntu que corre dentro de Windows. La ventaja de unificar: los mismos comandos —y los mismos tutoriales, scripts y herramientas del ecosistema— sirven en los tres sistemas. La desventaja: en Windows es una instalación extra (necesita reinicio y permisos de administrador) y al principio conviven dos mundos de archivos; para probar sin instalar nada, los agentes también corren en la web.

- Instalar WSL — documentación oficial de Microsoft: https://learn.microsoft.com/es-es/windows/wsl/install
- Configurar un entorno de desarrollo en WSL (Microsoft) — https://learn.microsoft.com/es-es/windows/wsl/setup/environment
- La línea de comandos para principiantes — tutorial oficial de Ubuntu (en inglés): https://ubuntu.com/tutorials/command-line-for-beginners
- Manual de referencia de Bash (GNU) — https://www.gnu.org/software/bash/manual/
- VS Code dentro de WSL — documentación oficial: https://code.visualstudio.com/docs/remote/wsl
- Name That UI - página con glosario de elementos de interfaces gráficas para hacer pedidos más concretos a modelos de lenguaje: https://namethatui.com/