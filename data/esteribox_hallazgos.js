// EsteriBox — Repositorio de hallazgos del instrumental (manchas, corrosión, residuos y deterioros)
// Fuente principal: "El Libro Rojo del Instrumental / Tratamiento del Instrumental" (AKI,
// Arbeitskreis Instrumentenaufbereitung) + Norma General Técnica N°199 MINSAL (2018).
//
// Modelo de datos por hallazgo:
//   id           identificador único (slug)
//   name         nombre técnico del hallazgo
//   aka          otros nombres / sinónimos usados en pabellón
//   category     corrosion | mancha | residuo | deterioro
//   pattern      clave del "swatch" visual generado por SVG (ver 3.EsteriBox.html)
//   zone         dónde aparece con más frecuencia
//   appearance   qué se ve (color, forma, textura)
//   causes       [causas]
//   risk         critico | moderado | estetico
//   risk_reason  por qué representa (o no) riesgo para el procedimiento
//   action       qué hacer al detectarlo (decisión operativa)
//   prevention   [medidas de prevención]
//   image_url    foto real (opcional; dejar '' hasta cargar foto en esteribox_imgs/)
//
// NIVELES DE RIESGO
//   critico  → RETIRAR de circulación. No usar en cirugía. Reprocesar/derivar a reparación.
//   moderado → Marcar y observar; corregir causa; puede quedar fuera de servicio si progresa.
//   estetico → Defecto de aspecto; no contraindica el uso si la función y la esterilidad están OK.

window.ESTERIBOX_HALLAZGOS = [
  // ───────────────────────── CORROSIÓN ─────────────────────────
  {
    id: "pitting",
    name: "Corrosión por picaduras (pitting)",
    aka: "picado, corrosión puntiforme",
    category: "corrosion",
    pattern: "pitting",
    zone: "Superficies, lúmenes, articulaciones y zonas con restos de fluidos",
    appearance: "Puntos oscuros o pequeños cráteres/hoyos bien definidos sobre la superficie, a veces con halo de óxido pardo.",
    causes: [
      "Cloruros (suero fisiológico, sangre, secreciones) dejados sobre el instrumento",
      "Secado deficiente / instrumento guardado húmedo",
      "Contacto prolongado con soluciones salinas o desinfectantes clorados"
    ],
    risk: "critico",
    risk_reason: "Las picaduras son nichos donde se aloja biofilm y materia orgánica que el proceso de esterilización no penetra; además concentran tensiones y debilitan el acero, con riesgo de fractura intraoperatoria.",
    action: "Retirar de circulación. No usar. Derivar a evaluación/reparación; si el picado es extenso, dar de baja.",
    prevention: [
      "Prelavado/humectación inmediata tras la cirugía; nunca dejar secar la sangre",
      "Enjuague final con agua tratada (desmineralizada) y secado completo",
      "No usar suero fisiológico para remojar instrumental"
    ],
    image_url: ""
  },
  {
    id: "corrosion-friccion",
    name: "Corrosión por fricción",
    aka: "desgaste metal-metal, fretting",
    category: "corrosion",
    pattern: "friction",
    zone: "Articulaciones, cajas de cremallera, puntos de rozamiento",
    appearance: "Zonas oscuras/negruzcas o brillo de desgaste en las articulaciones, con partículas finas de óxido alrededor del eje.",
    causes: [
      "Falta de lubricación de las articulaciones (leche de instrumental)",
      "Roce metal contra metal durante uso y reproceso",
      "Lavado con cepillos/polvos abrasivos"
    ],
    risk: "moderado",
    risk_reason: "Degrada la articulación y genera partículas; si progresa endurece el movimiento y puede llevar a fisuras. No contamina por sí sola, pero anuncia deterioro funcional.",
    action: "Lubricar la articulación y verificar suavidad de movimiento. Si el desgaste es marcado o hay juego, derivar a mantención.",
    prevention: [
      "Lubricar articulaciones tras cada lavado, antes de esterilizar",
      "Accionar el instrumento durante el lavado para limpiar la articulación",
      "Evitar abrasivos y cepillos metálicos"
    ],
    image_url: ""
  },
  {
    id: "corrosion-tension",
    name: "Corrosión por tensión / fisuras",
    aka: "stress corrosion, grietas por tensión",
    category: "corrosion",
    pattern: "crack",
    zone: "Articulaciones y cremalleras esterilizadas en tensión",
    appearance: "Grietas o microfisuras finas, generalmente en la zona de la articulación o el arranque de la cremallera.",
    causes: [
      "Esterilizar el instrumento con la cremallera cerrada al máximo (bajo tensión)",
      "Fatiga del material combinada con medio corrosivo",
      "Sobrecarga mecánica repetida"
    ],
    risk: "critico",
    risk_reason: "Una fisura puede propagarse y provocar la ruptura del instrumento durante la cirugía, con riesgo de dejar un fragmento en el paciente.",
    action: "Retirar de inmediato. No usar. Dar de baja o derivar a reparación certificada.",
    prevention: [
      "Esterilizar SIEMPRE con la cremallera abierta (primer diente o totalmente abierta)",
      "No forzar ni sobrecargar el instrumental",
      "Inspección con lupa de las zonas de articulación"
    ],
    image_url: ""
  },
  {
    id: "corrosion-superficial",
    name: "Corrosión superficial / óxido pardo",
    aka: "oxidación de superficie",
    category: "corrosion",
    pattern: "surface_rust",
    zone: "Superficies planas y bordes",
    appearance: "Velo o manchas de color pardo-anaranjado más o menos uniforme sobre la superficie del acero.",
    causes: [
      "Agua no tratada (dura o con hierro) en lavado/enjuague",
      "Detergentes de pH inadecuado o mal dosificados",
      "Daño de la capa pasiva por abrasivos"
    ],
    risk: "moderado",
    risk_reason: "En etapa inicial es removible y la capa pasiva puede regenerarse; si se ignora avanza a picaduras. Indica un problema del agua o del proceso que afecta a todo el lote.",
    action: "Limpiar con paño y producto no abrasivo; revisar calidad del agua y del detergente. Si no sale o hay picado, retirar.",
    prevention: [
      "Enjuague final con agua desmineralizada",
      "Control periódico de la calidad del agua",
      "Detergentes neutros/enzimáticos bien dosificados"
    ],
    image_url: ""
  },
  {
    id: "flash-rust",
    name: "Óxido externo / óxido ajeno (flash rust)",
    aka: "óxido de vuelo, herrumbre transferida",
    category: "corrosion",
    pattern: "flash_rust",
    zone: "Cualquier superficie; llega desde otro origen",
    appearance: "Depósito naranja-rojizo superficial que se desprende al frotar y puede mancharse en el paño; el acero por debajo suele estar sano.",
    causes: [
      "Óxido transferido desde otro instrumento corroído, canastillos o bandejas oxidadas",
      "Óxido arrastrado por el vapor del autoclave (cámara/tubería con óxido)",
      "Agua de mala calidad con hierro"
    ],
    risk: "estetico",
    risk_reason: "No es corrosión del propio instrumento, pero es un contaminante que ensucia el material estéril y puede iniciar corrosión real si no se elimina.",
    action: "Retirar el depósito por limpieza; investigar y corregir la fuente (canastillo/autoclave/agua). Reprocesar el lote afectado.",
    prevention: [
      "Retirar del uso instrumentos y canastillos oxidados (no mezclar)",
      "Mantención del autoclave y calidad del vapor",
      "Separar acero inoxidable de otras aleaciones"
    ],
    image_url: ""
  },

  // ───────────────────────── MANCHAS ─────────────────────────
  {
    id: "mancha-cal",
    name: "Manchas de agua / cal (depósito calcáreo)",
    aka: "manchas de agua, sarro, calcio",
    category: "mancha",
    pattern: "lime",
    zone: "Superficies donde se acumula agua al secar",
    appearance: "Velo blanquecino o manchas blancas/grisáceas, a veces con forma de gota o borde de evaporación.",
    causes: [
      "Agua dura (alta en calcio/magnesio) en el enjuague",
      "Secado deficiente: el agua se evapora sobre el instrumento",
      "Enjuague final con agua corriente en vez de desmineralizada"
    ],
    risk: "estetico",
    risk_reason: "Por sí misma no contraindica el uso, pero puede alojar residuos bajo la costra calcárea y dificultar la inspección; señala un problema de agua/secado del proceso.",
    action: "Eliminar con producto descalcificante suave; corregir enjuague y secado. No requiere retiro si la superficie queda íntegra.",
    prevention: [
      "Enjuague final con agua desmineralizada/osmotizada",
      "Secado inmediato y completo",
      "Mantención del sistema de tratamiento de agua"
    ],
    image_url: ""
  },
  {
    id: "mancha-silicato",
    name: "Manchas de silicatos",
    aka: "manchas amarillo-violáceas",
    category: "mancha",
    pattern: "silicate",
    zone: "Superficies expuestas al agua/vapor",
    appearance: "Decoloraciones o manchas de bordes definidos en tonos amarillo a violáceo/azulado.",
    causes: [
      "Exceso de silicatos en el agua de lavado o de la caldera de vapor",
      "Fuga de ácido silícico desde tanques de tratamiento de agua",
      "Silicatos transferidos por ciertos detergentes"
    ],
    risk: "estetico",
    risk_reason: "No afecta la esterilidad ni la función, pero es un marcador de que la calidad del agua/detergente está fuera de norma y debe corregirse.",
    action: "Limpiar; revisar calidad de agua y detergente. Sin retiro salvo que se acompañe de corrosión.",
    prevention: [
      "Agua tratada dentro de parámetros para lavado y vapor",
      "Detergentes sin sílice y bien dosificados",
      "Control del sistema de agua y de la caldera"
    ],
    image_url: ""
  },
  {
    id: "mancha-arcoiris",
    name: "Decoloración térmica / arcoíris (tornasol)",
    aka: "decoloración policromática, azulado, dorado",
    category: "mancha",
    pattern: "rainbow",
    zone: "Puntas, filos y zonas de mayor calor; frecuente en titanio",
    appearance: "Tonos iridiscentes azul, dorado, violeta o marrón, tipo tornasol, sobre la superficie.",
    causes: [
      "Sobrecalentamiento / engrosamiento de la capa de óxido de cromo del acero",
      "Ciclos de esterilización repetidos, calor húmedo",
      "En titanio: peróxido de hidrógeno (plasma) — decoloración normal y esperable"
    ],
    risk: "estetico",
    risk_reason: "En acero es una capa de óxido crecida por calor; en titanio (incluye plasma de peróxido) es un cambio normal. No compromete esterilidad ni función.",
    action: "No requiere retiro. En titanio, documentar como normal. En acero, vigilar que no evolucione a corrosión.",
    prevention: [
      "Evitar sobrecalentamiento y ciclos innecesarios",
      "Cargas correctas en el esterilizador",
      "Separar titanio si se quiere conservar el aspecto"
    ],
    image_url: ""
  },
  {
    id: "mancha-organica",
    name: "Manchas marrones/doradas por residuo orgánico horneado",
    aka: "proteína horneada, manchas de sangre fijada",
    category: "mancha",
    pattern: "organic_stain",
    zone: "Cremalleras, articulaciones, serraciones y lúmenes",
    appearance: "Manchas marrón claro a dorado o pardo oscuro, a veces con brillo, adheridas en zonas de difícil acceso.",
    causes: [
      "Sangre/proteínas no removidas que se fijan por el calor del ciclo",
      "Prelavado tardío o insuficiente",
      "Desinfección/esterilización sobre material sucio"
    ],
    risk: "critico",
    risk_reason: "Es materia orgánica residual: bajo ella el agente esterilizante no llega, por lo que el instrumento NO puede considerarse estéril. Además favorece corrosión.",
    action: "Retirar del set. Reprocesar (lavado completo, incluso manual/ultrasónico) y reinspeccionar antes de re-esterilizar.",
    prevention: [
      "Prelavado/humectación inmediata en pabellón",
      "Lavado ultrasónico y cepillado de articulaciones/lúmenes",
      "Control de limpieza (test de proteína / inspección con lupa)"
    ],
    image_url: ""
  },
  {
    id: "mancha-detergente",
    name: "Residuos de detergente / película seca",
    aka: "manchas de jabón, film blanco",
    category: "mancha",
    pattern: "detergent",
    zone: "Superficies amplias y recovecos",
    appearance: "Película blanquecina, mate o jabonosa, a veces con manchas azul-grisáceas si el pH fue inadecuado.",
    causes: [
      "Enjuague insuficiente tras el lavado",
      "Sobredosis de detergente",
      "Detergente inadecuado para el material"
    ],
    risk: "moderado",
    risk_reason: "El residuo químico puede causar irritación de tejidos en el paciente y manchar el material; indica falla en el enjuague.",
    action: "Reprocesar con enjuague adecuado; ajustar dosificación. No usar hasta eliminar el residuo.",
    prevention: [
      "Enjuague suficiente, preferente con agua desmineralizada",
      "Dosificación correcta del detergente",
      "Validar el ciclo de lavado"
    ],
    image_url: ""
  },

  // ───────────────────────── RESIDUOS ─────────────────────────
  {
    id: "residuo-organico",
    name: "Residuo orgánico visible (sangre, tejido, hueso)",
    aka: "suciedad visible, bioburden",
    category: "residuo",
    pattern: "bioburden",
    zone: "Serraciones, cremalleras, articulaciones, cánulas y lúmenes",
    appearance: "Restos visibles de sangre seca, tejido, hueso o secreción, o costra parda en ranuras.",
    causes: [
      "Lavado incompleto o ausente",
      "Lúmenes/cánulas no cepillados ni irrigados",
      "Instrumento cargado en el set sin verificación de limpieza"
    ],
    risk: "critico",
    risk_reason: "Sin limpieza previa NO hay esterilización posible: el agente no penetra la materia orgánica. Es la causa más frecuente de material 'estéril' que en realidad no lo está.",
    action: "Retirar del set inmediatamente. Devolver a lavado completo. Nunca esterilizar ni usar con suciedad visible.",
    prevention: [
      "Inspección de limpieza de cada pieza con lupa/buena luz antes de empacar",
      "Cepillado e irrigación obligatoria de lúmenes",
      "Regla: 'no se esteriliza lo que no está limpio'"
    ],
    image_url: ""
  },
  {
    id: "residuo-lumen",
    name: "Residuo en lúmenes y cánulas",
    aka: "obstrucción de canulados, biofilm interno",
    category: "residuo",
    pattern: "lumen",
    zone: "Instrumental canulado, aspiradores, trócares, endoscópico",
    appearance: "Oscurecimiento interior, obstrucción parcial o salida de material al irrigar; no siempre visible desde afuera.",
    causes: [
      "Falta de cepillo del calibre correcto e irrigación del lumen",
      "Secado insuficiente del interior",
      "Diseño complejo que retiene fluidos"
    ],
    risk: "critico",
    risk_reason: "El lumen sucio impide contacto del esterilizante con la superficie interna; alto riesgo de infección. Difícil de detectar sin protocolo específico.",
    action: "Retirar; cepillar e irrigar el lumen, secar con aire, verificar permeabilidad y reprocesar.",
    prevention: [
      "Cepillos del calibre correcto para cada canulado",
      "Irrigación y secado con aire comprimido médico",
      "Uso de conectores de irrigación en lavadora"
    ],
    image_url: ""
  },
  {
    id: "residuo-lubricante",
    name: "Exceso / residuo de lubricante seco",
    aka: "aceite acumulado, leche de instrumental reseca",
    category: "residuo",
    pattern: "detergent",
    zone: "Articulaciones y cremalleras",
    appearance: "Acumulación pegajosa o costra opaca de lubricante en la articulación.",
    causes: [
      "Sobreaplicación de lubricante sin accionar el instrumento",
      "Lubricante no compatible con esterilización a vapor",
      "Falta de escurrido antes de esterilizar"
    ],
    risk: "moderado",
    risk_reason: "El exceso puede formar barrera al vapor y acumular suciedad; usar solo lubricante hidrosoluble compatible con esterilización.",
    action: "Retirar exceso; reaplicar correctamente lubricante hidrosoluble para esterilización y accionar la articulación.",
    prevention: [
      "Lubricante hidrosoluble validado para vapor, en capa fina",
      "Accionar el instrumento para distribuir y escurrir",
      "No usar aceites minerales/siliconados"
    ],
    image_url: ""
  },

  // ───────────────────────── DETERIOROS MECÁNICOS ─────────────────────────
  {
    id: "filo-danado",
    name: "Filo mellado o desafilado (tijeras/cortantes)",
    aka: "filo dañado, corte deficiente",
    category: "deterioro",
    pattern: "edge",
    zone: "Hojas de tijera, cizallas, gubias, cortantes",
    appearance: "Mellas, muescas o filo romo; la tijera 'masca' o no corta limpio la gasa de prueba.",
    causes: [
      "Uso sobre material inadecuado (suturas metálicas, gasas con clips)",
      "Golpes y mezcla con instrumental pesado",
      "Desgaste natural sin reafilado"
    ],
    risk: "moderado",
    risk_reason: "No afecta la esterilidad pero sí el desempeño quirúrgico: corte deficiente, daño tisular y prolongación del acto. Función comprometida.",
    action: "Retirar del set de corte; enviar a reafilado/reparación. Reintegrar solo tras prueba de corte.",
    prevention: [
      "Prueba de corte periódica (gasa/lámina de prueba)",
      "Usar cada instrumento para su fin",
      "Protección de puntas y separación por peso"
    ],
    image_url: ""
  },
  {
    id: "cremallera-falla",
    name: "Cremallera que no engancha / instrumento con juego",
    aka: "pinza floja, no traba",
    category: "deterioro",
    pattern: "ratchet",
    zone: "Pinzas hemostáticas, porta-agujas, clamps",
    appearance: "La cremallera salta o no traba; la articulación tiene juego lateral; las ramas no cierran alineadas.",
    causes: [
      "Desgaste de la articulación/tornillo",
      "Fatiga del material y sobreuso",
      "Corrosión de fricción avanzada"
    ],
    risk: "moderado",
    risk_reason: "Riesgo funcional: un porta-agujas o clamp que suelta puede fallar en un momento crítico. No es tema de esterilidad, sí de seguridad quirúrgica.",
    action: "Retirar; enviar a mantención. No devolver al set hasta verificar trabado y alineación.",
    prevention: [
      "Verificación de trabado y alineación al inspeccionar",
      "Lubricación regular de articulaciones",
      "Retiro oportuno de instrumentos fatigados"
    ],
    image_url: ""
  },
  {
    id: "puntas-desalineadas",
    name: "Puntas desalineadas o dañadas (pinzas/mosquitos)",
    aka: "dientes que no coinciden, punta doblada",
    category: "deterioro",
    pattern: "tips",
    zone: "Puntas de pinzas de disección, mosquitos, adson",
    appearance: "Los dientes/serraciones no coinciden al cerrar; punta doblada, abierta o con luz entre las ramas.",
    causes: [
      "Caídas y golpes",
      "Usar la pinza como palanca",
      "Almacenamiento y transporte sin protección de puntas"
    ],
    risk: "moderado",
    risk_reason: "Compromete la prensión y la seguridad (puede soltar tejido/aguja). Función quirúrgica afectada, no la esterilidad.",
    action: "Retirar; reparar/alinear por servicio técnico. Verificar cierre a contraluz antes de reintegrar.",
    prevention: [
      "Protectores de punta y bandejas con separadores",
      "Prueba de cierre a contraluz en la inspección",
      "Manejo sin usar el instrumento fuera de su función"
    ],
    image_url: ""
  }
];

// Metadatos para filtros/UI
window.ESTERIBOX_META = {
  categories: [
    { key: "corrosion", label: "Corrosión" },
    { key: "mancha",    label: "Manchas" },
    { key: "residuo",   label: "Residuos" },
    { key: "deterioro", label: "Deterioros" }
  ],
  risks: [
    { key: "critico",  label: "Crítico — retirar",  hint: "No usar. Retirar de circulación / reprocesar / reparar." },
    { key: "moderado", label: "Moderado — corregir", hint: "Marcar y corregir la causa; puede quedar fuera de servicio si progresa." },
    { key: "estetico", label: "Estético — sin riesgo", hint: "Defecto de aspecto; no contraindica el uso si función y esterilidad están OK." }
  ]
};
