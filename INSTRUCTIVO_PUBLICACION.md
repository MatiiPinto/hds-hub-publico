# HUB Público HDS · Instructivo de publicación

HUB simple y accesible desde la web, con la identidad visual del HUB principal,
publicando **QuirurBox, EquiBox y EsteriBox** (más el directorio EETT de EquiBox).
Es 100% estático: no requiere backend ni login.

## Contenido de esta carpeta (todo se sube tal cual)

| Archivo / carpeta | Qué es |
|---|---|
| `index.html` | HUB público (header HDS + tarjetas) |
| `1.QuirurBox.html` | Instrumental quirúrgico |
| `2.EquiBox.html` | Equipamiento médico (con enlaces a Drive) |
| `3.EsteriBox.html` | Esterilización, pabellón y arsenalería (hallazgos del instrumental) |
| `7.PAPS.html` | PAPS · Programa Anual de Prestación de Servicio |
| `equibox_directorio.html` | Directorio EETT de EquiBox |
| `data/` | Datos de las plataformas (incluye `esteribox_hallazgos.js`) |
| `SHARED_DATA/pins_emmc.js` | Pines EMMC usados por EquiBox |
| `Logos HUB-HDS/` | Logo del directorio |
| `quirurbox_imgs/` · `equibox_imgs/` · `esteribox_imgs/` | Imágenes de instrumental, equipos y hallazgos (~216 MB; `esteribox_imgs/` vacía por ahora) |

Total ≈ 227 MB — dentro del límite de GitHub Pages (recomendado < 1 GB).

## Decisiones aplicadas
- **Editor de fichas de EquiBox: NO incluido** (es herramienta interna de edición).
- **Enlaces de Drive: se mantienen.** Quien no tenga permiso verá la pantalla de
  acceso de Google; no se expone contenido, solo el enlace.
- Los botones "← HUB" de las plataformas apuntan a `index.html` de esta versión.

## Pasos de publicación (GitHub Pages, igual que las otras)
1. Crear repo público nuevo, p. ej. **hub-hds** o **hub-publico-hds**.
2. Subir TODO el contenido de esta carpeta a la raíz del repo (no la carpeta
   contenedora, sino su contenido: `index.html`, las plataformas, `data/`, etc.).
3. Settings → Pages → Branch `main` / root → Save.
4. URL final: `https://matiipinto.github.io/<nombre-repo>/`.
5. Verificar: abrir la URL, entrar a QuirurBox, EquiBox y EsteriBox, y desde
   EquiBox al directorio EETT; confirmar que cargan imágenes.

### Publicar directo en este repo (`minihub-hds`)
Si se publica este mismo repositorio (no uno nuevo):
1. Mergear la rama de EsteriBox a `main` (PR correspondiente).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `/ (root)` → Save**. (Toggle único, lo hace el dueño
   del repo; no se puede activar por API/CLI sin permisos de administración.)
3. URL final: `https://matiipinto.github.io/minihub-hds/` y EsteriBox en
   `https://matiipinto.github.io/minihub-hds/3.EsteriBox.html`.
4. Desde el celular: abrir esa URL y "Agregar a pantalla de inicio" para dejarlo
   como acceso directo.

## Notas
- Al ser estático, cualquier actualización es re-subir el archivo cambiado.
- Si más adelante quieres sumar otra plataforma, se agrega su `.html` + datos +
  imágenes y una tarjeta más en `index.html` (bloque `.platforms`).
- Para reducir peso a futuro: las imágenes podrían comprimirse o moverse a un
  CDN, pero no es necesario para publicar ahora.
