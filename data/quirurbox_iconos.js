/* =========================================================================
   QuirurBox · Íconos representativos de cajas quirúrgicas
   -------------------------------------------------------------------------
   Drop-in para el sitio HTML/JS (GitHub Pages). No requiere dependencias.

   USO BÁSICO
   ----------
   <script src="quirurbox-iconos.js"></script>
   ...
   const svg = QuirurBox.icono("Caja de Traqueostomia");      // string <svg>
   miHeader.innerHTML = svg;
   miHeader.style.background = QuirurBox.gradiente("Cirugía General");

   API
   ---
   QuirurBox.icono(nombreCaja, { size:96, color:"#fff" })  -> string SVG
   QuirurBox.clave(nombreCaja)                             -> "eye" | "bone" | ...
   QuirurBox.color(especialidad)                           -> "#2563eb"
   QuirurBox.gradiente(especialidad)                       -> "linear-gradient(...)"

   NOTA: los rellenos tonales son blancos translúcidos (duotono), pensados
   para ir en BLANCO sobre el header de color de la especialidad.
   ========================================================================= */
(function (global) {
  "use strict";

  /* --- Color por especialidad --------------------------------------- */
  var ESP = {
    "Cirugía General":       { c: "#2563eb", c2: "#1e3a8a" },
    "Traumatología":         { c: "#f97316", c2: "#c2410c" },
    "Urología":              { c: "#14b8a6", c2: "#0f766e" },
    "Otorrinolaringología":  { c: "#8b5cf6", c2: "#6d28d9" },
    "Laparoscopía":          { c: "#ec4899", c2: "#be185d" },
    "Dental":                { c: "#6366f1", c2: "#4338ca" }
  };
  var ESP_DEFAULT = { c: "#2563eb", c2: "#1e3a8a" };

  /* --- Tonos duotono (blanco en varias opacidades) ------------------ */
  var t1  = { fill: "rgba(255,255,255,.13)" };
  var t2  = { fill: "rgba(255,255,255,.26)" };
  var dot = { fill: "currentColor", stroke: "none" };
  var hi  = { fill: "rgba(255,255,255,.9)", stroke: "none" };
  function P(d, extra) { var o = { d: d }; if (extra) for (var k in extra) o[k] = extra[k]; return ["path", o]; }

  /* --- Biblioteca de pictogramas ------------------------------------ */
  var ICONS = {
    eye: [
      P("M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z", t1),
      ["circle", { cx:12, cy:12, r:3.5, fill:t2.fill }],
      ["circle", { cx:12, cy:12, r:1.4, fill:dot.fill, stroke:"none" }],
      ["circle", { cx:13.3, cy:10.7, r:.55, fill:hi.fill, stroke:"none" }],
      P("M3.8 8.3C7 5.7 17 5.7 20.2 8.3")
    ],
    scope: [
      ["rect", { x:2.5, y:3.8, width:10, height:7.2, rx:1.2, fill:t1.fill }],
      ["rect", { x:4.3, y:5.6, width:6.4, height:3.6, rx:.6, fill:t2.fill }],
      P("M7.5 11v2.1M5.4 13.4h4.2"),
      P("M12.5 6.4h3l4 3.4V15"),
      ["circle", { cx:19.5, cy:18, r:2.8, fill:t2.fill }],
      ["circle", { cx:19.5, cy:18, r:.9, fill:dot.fill, stroke:"none" }]
    ],
    abdomen: [
      P("M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5c0 6-1.6 15.5-7.5 15.5S4.5 11 4.5 5A1.5 1.5 0 0 1 6 3.5Z", t1),
      P("M9 5.5h6c.6 0 1 .5 1 1 0 3.5-1 8-4 8s-4-4.5-4-8c0-.5.4-1 1-1Z", t2),
      P("M12 6v9.4"),
      P("M10.3 7.6h3.4M10.3 9.8h3.4M10.3 12h3.4M10.3 14.2h3.4"),
      ["circle", { cx:12, cy:17.4, r:.7, fill:dot.fill, stroke:"none" }]
    ],
    airway: [
      ["rect", { x:9.6, y:3, width:4.8, height:9, rx:1, fill:t1.fill }],
      P("M9.2 3h5.6"),
      P("M10 3v9M14 3v9"),
      P("M10 5.4h4M10 7.2h4M10 9h4"),
      P("M10 12l-3.3 4.2c-1 1.3-1.3 3-.8 4.3"),
      P("M14 12l3.3 4.2c1 1.3 1.3 3 .8 4.3")
    ],
    throat: [
      P("M4 11.5a8 8 0 0 1 16 0"),
      P("M5.6 12.6a6.4 4.8 0 0 0 12.8 0Z", t1),
      ["circle", { cx:8.2, cy:13.4, r:1.2, fill:t2.fill }],
      ["circle", { cx:15.8, cy:13.4, r:1.2, fill:t2.fill }],
      P("M12 9.6v3.4")
    ],
    ear: [
      P("M6 12.2A6 6 0 1 1 17 15c-.9 1.5-2.7 1.5-3.5.2", t1),
      P("M8.5 21c-1.8-1-2.9-2.8-2.9-5.6"),
      P("M9.4 12.4a2.9 2.9 0 1 1 4.4 2.5", t2),
      P("M11.6 12.7a1 1 0 1 1 1.5 1.3")
    ],
    nose: [
      P("M14.5 3.5c-.4 3.2-2.2 5.4-3.8 7.8-1 1.6 0 3 1.8 3 .9 0 1.6-.3 2.3-.9", t1),
      P("M14.5 3.5c-.4 3.2-2.2 5.4-3.8 7.8-1 1.6 0 3 1.8 3"),
      P("M8.2 16.4c2.4 1.3 5.6.7 6.8-1.4"),
      ["circle", { cx:13.3, cy:14.4, r:.7, fill:dot.fill, stroke:"none" }]
    ],
    tooth: [
      P("M6.6 5C8.6 3.2 15.4 3.2 17.4 5c1.6 1.4.9 3.8.5 6.2-.3 1.8-.5 8.6-2 8.6-1.2 0-1-4-1.6-6-.3-1-1.3-1-1.6 0-.6 2-.4 6-1.6 6-1.5 0-1.7-6.8-2-8.6-.4-2.4-1.1-4.8.5-6.2Z", t1),
      P("M7.4 6c1-.9 2.4-1.4 4.6-1.4V11c-.9 0-1.3.6-1.6 1.4C9.4 9 8.2 7.2 7 6.6c.1-.2.2-.4.4-.6Z", t2),
      P("M8 7.6c1.6-1.1 6.4-1.1 8 0")
    ],
    kidney: [
      P("M14.6 4C10 4 7 7.3 7 12s3 8 7.6 8c2.2 0 3.3-1.2 3.3-2.5 0-1.3-1.3-1.8-2.5-2.4-1.2-.7-2.4-1.4-2.4-3.1 0-1.9 1.2-2.6 2.4-3.3 1.2-.7 2.5-1.2 2.5-2.6C17.9 5.1 16.8 4 14.6 4Z", t1),
      P("M13.6 6.2C11 6.8 9.4 9.1 9.4 12s1.6 5.2 4.2 5.8c-1.5-.8-2.4-2.2-2.4-3.6 0-1.1 .6-1.8 1.4-2.2-.8-.4-1.4-1.1-1.4-2.2 0-1.4 .9-2.8 2.4-3.4Z", t2),
      P("M13.4 11.6c-.9.3-1.7-.2-2-1.1")
    ],
    vessel: [
      ["rect", { x:2, y:8.4, width:20, height:7.2, rx:3.4, fill:t1.fill }],
      P("M2 12h4.3l1.9-4.6 3.5 9.6 2.6-7 1.5 2H22"),
      ["circle", { cx:2, cy:12, r:.8, fill:dot.fill, stroke:"none" }],
      ["circle", { cx:22, cy:12, r:.8, fill:dot.fill, stroke:"none" }]
    ],
    bone: [
      P("M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z", t1),
      P("M8.5 15.5l7-7", { stroke:"rgba(255,255,255,.55)", strokeWidth:1 })
    ],
    lungs: [
      P("M12 3.4v7.2"),
      P("M12 10.6c-.9-2-3.2-2.2-4.6-.6C5.8 11.6 5.2 15.2 5.7 18c.4 2.2 2.9 2.5 4 .7 1-1.6 1.3-4.8 1.3-8Z", t1),
      P("M12 10.6c.9-2 3.2-2.2 4.6-.6C18.2 11.6 18.8 15.2 18.3 18c-.4 2.2-2.9 2.5-4 .7-1-1.6-1.3-4.8-1.3-8Z", t1),
      P("M9 14.4c-1 .5-1.6 1.4-1.7 2.6", t2),
      P("M15 14.4c1 .5 1.6 1.4 1.7 2.6", t2),
      P("M10 6.5c-1.2.5-1.9 1.4-2 2.6M14 6.5c1.2.5 1.9 1.4 2 2.6")
    ],
    breast: [
      P("M4 12.5a8 8 0 0 0 16 0Z", t1),
      P("M4 12.5a8 8 0 0 1 16 0"),
      ["circle", { cx:12, cy:13, r:1.9, fill:t2.fill }],
      ["circle", { cx:12, cy:13, r:.6, fill:dot.fill, stroke:"none" }]
    ],
    baby: [
      ["circle", { cx:12, cy:12, r:8.4, fill:t1.fill }],
      ["circle", { cx:9, cy:12.6, r:1.4, fill:t2.fill }],
      ["circle", { cx:15, cy:12.6, r:1.4, fill:t2.fill }],
      ["circle", { cx:9.3, cy:11, r:.85, fill:dot.fill, stroke:"none" }],
      ["circle", { cx:14.7, cy:11, r:.85, fill:dot.fill, stroke:"none" }],
      P("M9.4 14.6c1.6 1.3 3.6 1.3 5.2 0"),
      P("M12 3.6c2 0 2.2 2.2.2 2.4")
    ],
    head: [
      P("M9 20.8v-2.6c-2.6-1-4-3.5-4-6.6a7 7 0 0 1 14 0c0 1-.6 1.4-1.2 1.8-.5.3-.8.5-.8 1.2 0 .6.5.9.5 1.5s-.7.8-1.5.8h-1v3", t1),
      P("M7.8 11a2 2 0 0 1 3.1-1.7M11 12.6a2 2 0 0 0 3.1-.5", t2),
      P("M7.8 11a2 2 0 0 1 3.1-1.7"),
      ["circle", { cx:14.4, cy:12.4, r:.6, fill:dot.fill, stroke:"none" }]
    ],
    suture: [
      P("M3.5 18.5a11 11 0 0 1 11-11", { stroke:"rgba(255,255,255,.55)" }),
      P("M3.5 18.5a11 11 0 0 1 11-11"),
      ["circle", { cx:15.2, cy:6.8, r:1.6, fill:t2.fill }],
      ["circle", { cx:15.2, cy:6.8, r:.5, fill:dot.fill, stroke:"none" }],
      P("M3.8 18.8c1.6-1 2.8.9 4.4 0s1.6-2 3.2-3")
    ],
    saw: [
      P("M15.6 6.8c2.6 0 4.4 1.2 4.4 3.4s-2.2 2.2-3.4 3.4l-2-3.4Z", t1),
      P("M3 8.5h12.5"),
      P("M3 8.5l1.5 2.3L6 8.5l1.5 2.3L9 8.5l1.5 2.3L12 8.5l1.5 2.3L15 8.5"),
      P("M15.5 8.5c2.5 0 4.5 1 4.5 3.2s-2.2 2.2-3.4 3.4")
    ],
    scalpel: [
      P("M20.4 3.6 12 12l-1.6-1.6L18.8 2.4Z", t2),
      P("M20.4 3.6 12 12l-1.6-1.6", hi),
      P("M12 12 4.5 19.5"),
      P("M4.5 19.5 2.6 21.4")
    ],
    tray: [
      P("M2.5 14h19l-1.4 4.4a1.5 1.5 0 0 1-1.4 1.1H5.3a1.5 1.5 0 0 1-1.4-1.1Z", t1),
      P("M2.5 14h19"),
      P("M8 14V6M8 6 6.3 7.6M8 6 9.7 7.6"),
      P("M12 14V4.6"), ["circle", { cx:12, cy:4.2, r:1.1, fill:t2.fill }],
      P("M16 14V7.6"), ["circle", { cx:16, cy:7.2, r:1, fill:t2.fill }]
    ]
  };

  /* --- Reglas: nombre de caja -> pictograma -------------------------
     Ajustes HDS sobre la matriz real de 196 cajas: keywords extra para
     Caja Plastia / Cirugia Valle / Extraccion Puntos (Oftalmología),
     Cortador de Cartilago / Consultas ORL, Trauma Policlinico (Dental),
     Hernioplastia / Trasplante Hepatico y sets de Traumatología.  */
  var RULES = [
    ["eye",    ["catarat","retina","glaucom","pterig","estrabism","vitrect","cornea","corneal","blefaro","chalazi","enuclea","intravitre","conjuntiv","trauma ocular","injerto corn","lasceracion","lagrimal","caja plastia","valle"]],
    ["scope",  ["laparosc","bariatric","optica","coledoscofibro","fibroscop","ureterorenoscop","nefroscop","esofagoscop","endoscopi","trocar","clamp intestinal","artroscop"]],
    ["airway", ["traqueo","laringe","laringea","laringosc","fonocirugia","fono","cuerdas"]],
    ["throat", ["amigdal","adenoid","esofago"]],
    ["ear",    ["timpan","oido","otic","estapedect","meatotom","audi","consultas orl"]],
    ["nose",   ["nasal","nariz","septoplast","tabique","frontal","trefinac","perinasal","sengstaken","taponamiento","cartilago"]],
    ["tooth",  ["dental","periodonc","periodont","endodonc","protesis","operatoria","bucal","maxilo","ortognat","trauma policlinico"]],
    ["kidney", ["renal","nefro","prostat","vasectom","rtu","resectom","uretr","ureter","genital","procuramiento","incontinenc","piso pelvic","trasplante ren"]],
    ["vessel", ["vascular","arteri","aorta","venosa","venas","fistula","carotid","femoral","safenect","denudac","angiograf","dilatador","clavia","clamps aorta","gemini"]],
    ["lungs",  ["torax","toracotom","pleurot","pleural"]],
    ["bone",   ["fragmento","artrod","columna","cadera","tobillo","pie","mano","tornillo","osteotom","cincel","gubias","charnley","humero","codo","muneca","napoleon","menisco","ligamento","microfractura","hombro","shinova","tendon","yeso","revision","corriente","traumatolog"]],
    ["abdomen",["apendicect","gastrect","hernia","hernio","eventrac","coledoco","biliar","colecist","reflujo","estomago","peritoneal","ascitica","proctolog","bocio","abdomen","abdominal","hepatic"]],
    ["breast", ["mama","abdominoplast","lifting","colgajo","reconstruct","plastica basic"]],
    ["baby",   ["parto"]],
    ["head",   ["cabeza","cuello","anexa hueso"]],
    ["suture", ["sutura","curacion","puntos"]],
    ["saw",    ["amputacion","onisectom"]],
    ["scalpel",["cirugia menor","menor","procedimiento","aseo","comando","mosquito","resano","valvas","separador","pinzas","magill","microcirugia","general"]]
  ];

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function clave(nombre) {
    var n = norm(nombre);
    for (var i = 0; i < RULES.length; i++) {
      var kws = RULES[i][1];
      for (var j = 0; j < kws.length; j++) if (n.indexOf(kws[j]) !== -1) return RULES[i][0];
    }
    return "tray";
  }

  /* --- Serialización a SVG string ----------------------------------- */
  function attrStr(o) {
    var out = [];
    for (var k in o) {
      var name = k.replace(/[A-Z]/g, function (m) { return "-" + m.toLowerCase(); });
      out.push(name + '="' + o[k] + '"');
    }
    return out.join(" ");
  }
  function icono(nombre, opts) {
    opts = opts || {};
    var size = opts.size || 96;
    var color = opts.color || "#fff";
    var parts = ICONS[clave(nombre)] || ICONS.tray;
    var inner = parts.map(function (p) { return "<" + p[0] + " " + attrStr(p[1]) + "/>"; }).join("");
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"' +
      ' style="display:block;color:' + color + '">' + inner + "</svg>";
  }

  function color(esp)     { return (ESP[esp] || ESP_DEFAULT).c; }
  function gradiente(esp) { var e = ESP[esp] || ESP_DEFAULT; return "linear-gradient(150deg," + e.c + "," + e.c2 + ")"; }

  global.QuirurBox = {
    icono: icono,
    clave: clave,
    color: color,
    gradiente: gradiente,
    especialidades: ESP
  };
})(typeof window !== "undefined" ? window : this);
