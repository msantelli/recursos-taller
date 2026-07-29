# La terminal en 10 comandos

*Material del Taller de uso avanzado de IA — Letra y Código, Departamento de Letras, FFyL–UBA.*

## Qué es esto

La terminal es una interfaz donde la computadora se maneja **escribiendo** en vez de haciendo click. Para gente que trabaja con texto no debería ser terreno hostil: es un diálogo por turnos — uno escribe una orden, la máquina responde. Los agentes de IA como Claude Code viven acá, así que perderle el miedo a la terminal es el primer paso del vibecoding.

**Cómo abrirla:** en Windows, buscar "Terminal" o "PowerShell" en el menú de inicio; en Mac, la aplicación "Terminal" (está en Utilidades); en Linux, Ctrl+Alt+T o buscar "Terminal".

## Los 10 comandos

```bash
pwd                # 1. ¿Dónde estoy? (imprime la carpeta actual)
ls                 # 2. ¿Qué hay acá? (lista los archivos)
cd nombre-carpeta  # 3. Entrar a una carpeta
cd ..              # 4. Subir a la carpeta de arriba
mkdir mi-carpeta   # 5. Crear una carpeta
cp original.md copia.md   # 6. Copiar un archivo
mv viejo.md nuevo.md      # 7. Mover o renombrar
cat archivo.md     # 8. Mostrar el contenido de un archivo
clear              # 9. Limpiar la pantalla
rm archivo.md      # 10. Borrar un archivo (⚠️ ver abajo)
```

## Tres trucos que cambian todo

1. **Tab autocompleta.** Escribí las primeras letras de un archivo o carpeta y apretá Tab: la terminal completa el nombre. Nadie tipea rutas completas a mano.
2. **Las flechas ↑↓ recorren el historial.** El comando que escribiste hace cinco minutos se recupera con ↑, no se vuelve a tipear.
3. **Ctrl+C cancela.** Si algo quedó colgado o te arrepentiste, Ctrl+C corta el comando en ejecución. (Ojo: acá Ctrl+C no es "copiar".)

## Dos advertencias

- **`rm` no manda a la papelera.** Lo que se borra con `rm` se borra en serio. Antes de borrar, `ls` para mirar bien dónde estás parado.
- **Los espacios importan.** Para la terminal, `mi monografia.md` son dos cosas. O se escribe entre comillas (`"mi monografia.md"`) o —mejor costumbre— se nombran los archivos sin espacios: `mi-monografia.md`.

## El comando 11

Con esto alcanza para la clase: navegar hasta una carpeta y ahí adentro invocar al agente (`claude`), que entiende castellano. La terminal es el zaguán; el trabajo, de ahí en más, se conversa.
