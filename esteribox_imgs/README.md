# esteribox_imgs

Fotos reales de hallazgos del instrumental (manchas, corrosión, residuos, deterioros).

Mientras esta carpeta esté vacía, EsteriBox muestra un **swatch SVG** estilizado por tipo de
hallazgo (generado en `3.EsteriBox.html`). Para reemplazarlo por una foto real:

1. Guardar la imagen aquí, p. ej. `pitting_01.jpg` (usar fotos propias del HDS o con licencia;
   NO copiar imágenes con derechos del Libro Rojo / fabricantes sin autorización).
2. En `data/esteribox_hallazgos.js`, poner la ruta en el campo `image_url` del hallazgo:
   `image_url: "esteribox_imgs/pitting_01.jpg"`.
3. La tarjeta y el modal usarán automáticamente la foto en lugar del swatch.

Recomendado: fotos macro, fondo neutro, buena luz, ~1200 px de ancho, comprimidas (<300 KB).
