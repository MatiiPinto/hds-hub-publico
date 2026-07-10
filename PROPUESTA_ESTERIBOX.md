# Propuesta · EsteriBox

**Plataforma de apoyo para Esterilización, Pabellón y Arsenalería — Hospital del Salvador**

> Consulta práctica y móvil sobre el estado del instrumental quirúrgico: manchas,
> corrosión, residuos y deterioros, con un repositorio visual y criterio claro de
> **riesgo vs. no riesgo** para el procedimiento.

---

## 1. Problema que resuelve

Hoy el conocimiento sobre "qué es esta mancha, este óxido o esta picadura, y si puedo
usar o no el instrumento" está repartido entre el *Libro Rojo del Instrumental*, la
Norma Técnica del MINSAL y la experiencia de las personas con más años. Ese saber:

- No está disponible **en el momento y lugar** donde se decide (mesa de lavado,
  empaque, o al abrir la caja en pabellón).
- Depende de quién esté de turno.
- No es homogéneo entre el personal de **esterilización**, las **arsenaleras** y el
  **personal de pabellón**, que ven el mismo hallazgo desde ángulos distintos.

**EsteriBox** concentra ese criterio en una sola plataforma consultable desde el
celular en segundos, con imágenes y una decisión operativa por hallazgo.

## 2. A quién sirve (un mismo lenguaje para tres roles)

| Rol | Qué necesita resolver | Qué le entrega EsteriBox |
|---|---|---|
| **Esterilización / TENS de central** | Inspección tras el lavado: ¿esta mancha/óxido descarta la pieza o se corrige? ¿Cuál es la causa del proceso? | Repositorio de hallazgos con causa, riesgo y medida correctiva; prevención transversal. |
| **Arsenalera** | Al armar la mesa: ¿el set está limpio, íntegro y estéril? ¿Devuelvo esta pieza? | Checklist "Al abrir la caja" + repositorio para identificar el hallazgo en segundos. |
| **Personal de pabellón** | Verificación en el punto de uso del material estéril. | Los 5 controles antes de abrir y los motivos de rechazo, con circuito seguro del hallazgo. |

## 3. Fuentes técnicas

- **El Libro Rojo del Instrumental — *Tratamiento del Instrumental***, Grupo de Trabajo
  AKI (*Arbeitskreis Instrumentenaufbereitung*). Referencia internacional sobre
  cambios de superficie, corrosión y manchas del instrumental quirúrgico.
- **Norma General Técnica N°199** sobre esterilización y desinfección de alto nivel y
  uso de artículos médicos estériles en establecimientos de atención en salud,
  **MINSAL Chile** (Res. Ex. N°340, 2018), que actualiza la N°61 (Res. Ex. N°1665, 2001).

> El contenido es de **consulta clínica de referencia**; no reemplaza los protocolos
> locales del establecimiento, que siempre priman.

## 4. Funcionalidades

### 4.1 Motor de búsqueda práctico
Búsqueda instantánea por **nombre, sinónimo de pabellón, aspecto, zona, causa o tipo**.
Ejemplos reales: "pitting", "óxido naranja", "mancha blanca", "arcoíris", "no traba",
"sangre seca". Se combina con **filtros por tipo** (corrosión / manchas / residuos /
deterioros) y **por nivel de riesgo** (crítico / moderado / estético).

### 4.2 Repositorio visual de hallazgos
Cada hallazgo es una ficha con:
- **Imagen** del defecto (hoy un *swatch* SVG estilizado por tipo; reemplazable por
  fotos reales del HDS, ver §6).
- **Badge de riesgo** con color: 🔴 crítico · 🟠 moderado · 🟢 estético.
- **Aspecto**, **dónde aparece**, **causas**, **qué hacer al detectarlo** y **prevención**.

**Clave del proyecto: la clasificación de riesgo** responde directamente a la pregunta
del usuario — *¿esto es un riesgo o no para la cirugía?*

| Nivel | Significado | Ejemplos incluidos |
|---|---|---|
| 🔴 **Crítico — retirar** | No usar. Retirar de circulación / reprocesar / reparar. | Pitting, corrosión por tensión/fisuras, residuo orgánico, residuo en lúmenes, mancha orgánica horneada |
| 🟠 **Moderado — corregir** | Marcar y corregir la causa; fuera de servicio si progresa. | Corrosión de fricción, corrosión superficial, residuo de detergente, filo mellado, cremallera floja, puntas desalineadas, exceso de lubricante |
| 🟢 **Estético — sin riesgo** | No contraindica el uso si función y esterilidad están OK. | Óxido externo (flash rust), manchas de cal/agua, silicatos, decoloración térmica/arcoíris |

**16 hallazgos** en la versión inicial (5 corrosión · 5 manchas · 3 residuos · 3 deterioros).

### 4.3 "Al abrir la caja" — verificación en el punto de uso
Para arsenaleras y pabellón: los **5 controles antes de abrir** (integridad, sequedad,
indicador químico externo, trazabilidad/vigencia, limpieza externa), los controles **al
abrir** la mesa estéril, los **motivos de rechazo** y el **circuito seguro del hallazgo**.

### 4.4 Referencia rápida
Clasificación de **Spaulding**, tipos de **indicadores** (químico externo/interno,
biológico, físicos), la **regla de oro** ("no se esteriliza lo que no está limpio") y la
**prevención transversal** que aplica a casi todos los hallazgos.

### 4.5 Acceso por celular
Diseño **mobile-first**: la búsqueda pasa a ancho completo, la grilla se reordena a 2
columnas, las fichas y el modal son legibles a una mano, y soporta *safe-area* de
pantallas con notch. Al ser 100% estático (GitHub Pages), se abre desde cualquier
navegador sin instalar nada; se puede "agregar a pantalla de inicio" como acceso directo.

## 5. Encaje con el HUB actual

EsteriBox es **una plataforma más del HUB HDS**, con la misma identidad visual
(navy `#1D2D5B` / cyan `#29aae2`) y arquitectura estática que QuirurBox y EquiBox:

```
index.html                     ← tarjeta nueva "EsteriBox" (roja) agregada al HUB
3.EsteriBox.html               ← la plataforma (búsqueda + repositorio + checklist)
data/esteribox_hallazgos.js    ← datos de los hallazgos (window.ESTERIBOX_HALLAZGOS)
esteribox_imgs/                ← carpeta para las fotos reales (con README de uso)
```

Sin backend, sin login, sin dependencias externas: se publica igual que el resto del HUB.

## 6. De prototipo a producción

Este entregable es un **prototipo funcional y navegable**, no un mockup. Para llevarlo a
uso clínico se propone:

1. **Fotos reales del HDS.** Reemplazar los *swatches* SVG por fotografías macro de
   hallazgos reales del hospital (fondo neutro, buena luz). Basta con dejar la foto en
   `esteribox_imgs/` y poner su ruta en el campo `image_url` del hallazgo; la ficha usa
   la foto automáticamente. *No* usar imágenes con derechos del Libro Rojo o de
   fabricantes sin autorización.
2. **Validación por Esterilización.** Revisión de las 16 fichas (riesgo, causa y medida)
   con la unidad de esterilización y el comité de IAAS para alinearlas con los
   protocolos locales del HDS.
3. **Ampliación del catálogo.** Sumar hallazgos frecuentes del propio hospital y casos
   límite; el modelo de datos ya lo soporta.
4. **Trazabilidad opcional (futuro).** Enlazar un hallazgo con el registro de lote/ciclo
   o con QuirurBox (caja/pieza) para análisis de causa recurrente.

## 7. Estado de este entregable

- ✅ Prototipo funcional (`3.EsteriBox.html`) con búsqueda, filtros por tipo y riesgo,
  fichas con modal de detalle, checklist de pabellón y referencia.
- ✅ 16 hallazgos con datos técnicos completos (`data/esteribox_hallazgos.js`).
- ✅ Visuales SVG por tipo de defecto + carpeta lista para fotos reales.
- ✅ Integrado al HUB (`index.html`) con la identidad visual existente.
- ✅ Verificado en navegador (escritorio y móvil), sin errores de consola.
- ⏳ Pendiente: fotos reales del HDS y validación clínica por Esterilización/IAAS.
