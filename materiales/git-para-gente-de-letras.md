# Git para gente de letras

*Material del Taller de uso avanzado de IA — Letra y Código, Departamento de Letras, FFyL–UBA.*

## Por qué versionar

Si alguna vez tuviste una carpeta con `monografia_final.doc`, `monografia_final_AHORA_SI.doc` y `monografia_final_post_comentarios2.doc`, ya entendiste el problema que Git resuelve. Git guarda **todas las versiones** de tus archivos, con fecha, autor y una nota que explica qué cambió. Es un "deshacer" con historia infinita: podés recuperar el párrafo que borraste hace tres semanas, comparar lo que mandaste con lo que tenés ahora, y trabajar con otras personas sin pisarse.

No es una herramienta "de programadores": es una herramienta de **gestión de manuscritos**. Los programadores la usan porque su material de trabajo es texto — igual que el nuestro.

## Cuatro palabras que hay que saber

- **Repositorio (repo):** una carpeta cuya historia Git está siguiendo.
- **Commit:** una instantánea guardada de la carpeta en un momento dado, con su mensaje descriptivo.
- **Remoto:** la copia del repositorio que vive en un servidor (por ejemplo, GitHub). Sirve de respaldo y de punto de encuentro para colaborar.
- **Push / pull:** subir tus commits al remoto / bajar los de otros.

## El ciclo diario (esto es el 90% del uso real)

```bash
git status                     # ¿qué cambió desde la última vez?
git add .                      # marcar todo para guardar
git commit -m "Qué hice y por qué"   # guardar la instantánea
git push                       # subirla a GitHub
```

Cuatro comandos. Todo lo demás es para situaciones especiales.

## Mirar la historia

```bash
git log --oneline              # la historia, un commit por línea
git diff                       # qué cambió y todavía no guardé
git diff archivo.md            # qué cambió en un archivo puntual
```

## Deshacer (los tres casos que importan)

```bash
git restore archivo.md         # descartar cambios no guardados de un archivo
git restore --staged archivo.md  # "des-marcar" un archivo ya agregado con add
git reset HEAD~1               # deshacer el último commit, conservando los cambios
```

⚠️ Existe `git reset --hard`, que deshace **borrando** los cambios para siempre. No lo uses hasta entender bien qué hace.

## Empezar un proyecto

```bash
# Opción A: convertir una carpeta existente en repositorio
cd mi-proyecto
git init
git add .
git commit -m "Commit inicial"

# Opción B: bajar un repositorio que ya existe
git clone https://github.com/usuario/nombre-del-repo.git
```

Para conectar tu repo local con GitHub: creá el repositorio en github.com (botón "+" → "New repository"; elegí **Private** si es trabajo inédito y no marques ninguna casilla de inicialización) y seguí los dos o tres comandos que GitHub te muestra al crearlo.

## Qué no versionar

Un archivo llamado `.gitignore` en la raíz del repo lista lo que Git debe ignorar: archivos generados automáticamente, descargas pesadas, y —importante— **cualquier dato sensible o clave de acceso**. Regla simple: se versiona lo que escribiste vos; no lo que se puede regenerar ni lo que no querrías ver publicado.

## Mensajes de commit que sirven

El mensaje es para tu yo del futuro. Compará:

- ✅ "Agrego sección sobre actos de habla en Austin"
- ✅ "Corrijo erratas del resumen tras comentarios de la directora"
- ❌ "cambios"
- ❌ "asdf"

Frecuencia sana: un commit por cada cambio coherente (una sección nueva, una corrección terminada) — ni uno por oración, ni uno por semana.

## Tarjeta de referencia

```bash
git status      # ¿qué cambió?
git add .       # marcar para guardar
git commit -m "mensaje"   # guardar instantánea
git push        # subir al remoto
git pull        # bajar novedades del remoto
git log --oneline         # ver la historia
git restore archivo       # descartar cambios de un archivo
```

## Para seguir

- Libro oficial (gratuito): https://git-scm.com/book
- Tutorial interactivo: https://learngitbranching.js.org/
- Cheatsheet en PDF de GitHub: https://education.github.com/git-cheat-sheet-education.pdf
