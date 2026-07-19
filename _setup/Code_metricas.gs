// ════════════════════════════════════════════════════════════════════════════
// Code_metricas.gs — Métricas anónimas del HUB público HDS
//
// Recibe POST de metrics.js y agrega una fila a la hoja "METRICAS":
// Fecha · Hora · Visitante · Sesión · Evento · Plataforma · Detalle · Dispositivo.
// Sin IP ni datos personales (el visitante es un id aleatorio de navegador).
//
// INSTALACIÓN (una vez):
//   1. Crear una Google Sheet nueva (ej. "METRICAS HUB Publico HDS").
//   2. Extensiones → Apps Script → pegar este archivo completo.
//   3. Implementar → Nueva implementación → tipo "Aplicación web":
//        · Ejecutar como: Yo
//        · Acceso: Cualquier persona
//   4. Copiar la URL /exec y pegarla en metrics.js → METRICS_URL (repo hds-hub-publico).
//
// Eventos que llegan:
//   visita       → apertura de una plataforma (detalle: especialidad/sistema si
//                  venía en el link compartido)
//   latido       → cada 30 s con la pestaña visible (detalle: seg acumulados)
//   salida       → al cerrar/salir (detalle: segundos totales de permanencia)
//   tab/subtema  → pestaña o subtema consultado (detalle: cuál)
//   ficha        → ficha de equipo abierta en EquiBox (detalle: cuál)
//   clic_tarjeta → tarjeta clickeada en el index del HUB
// ════════════════════════════════════════════════════════════════════════════
var TZ = 'America/Santiago';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('METRICAS') || ss.insertSheet('METRICAS');
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Fecha', 'Hora', 'Visitante', 'Sesión', 'Evento',
                    'Plataforma', 'Detalle', 'Dispositivo']);
      sh.setFrozenRows(1);
    }
    var p = (e && e.parameter) || {};
    var now = new Date();
    sh.appendRow([
      Utilities.formatDate(now, TZ, 'yyyy-MM-dd'),
      Utilities.formatDate(now, TZ, 'HH:mm:ss'),
      String(p.v || '').slice(0, 30),
      String(p.s || '').slice(0, 20),
      String(p.evento || '').slice(0, 30),
      String(p.plataforma || '').slice(0, 60),
      String(p.detalle || '').slice(0, 90),
      String(p.disp || '').slice(0, 15)
    ]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}

// GET:
//   /exec              → "Métricas HUB público activas" (prueba)
//   /exec?list=1&dias=90 → JSON con las filas de los últimos N días (def. 90,
//                          máx. 365) para la reportería local 32.MetricasWeb.
function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.list) {
      var dias  = Math.max(1, Math.min(365, parseInt(p.dias, 10) || 90));
      var desde = new Date(Date.now() - dias * 864e5);
      var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('METRICAS');
      var out = [];
      if (sh && sh.getLastRow() > 1) {
        var data = sh.getRange(2, 1, sh.getLastRow() - 1, 8).getValues();
        for (var i = 0; i < data.length; i++) {
          var f = data[i][0];
          var esFecha = Object.prototype.toString.call(f) === '[object Date]';
          var fd = esFecha ? f : new Date(String(f) + 'T12:00:00');
          if (!isNaN(fd) && fd < desde) continue;
          out.push({
            f: esFecha ? Utilities.formatDate(f, TZ, 'yyyy-MM-dd') : String(f),
            h: (Object.prototype.toString.call(data[i][1]) === '[object Date]') ? Utilities.formatDate(data[i][1], TZ, 'HH:mm:ss') : String(data[i][1]),
            v: String(data[i][2]), s: String(data[i][3]), e: String(data[i][4]),
            p: String(data[i][5]), d: String(data[i][6]), disp: String(data[i][7])
          });
        }
      }
      return ContentService.createTextOutput(JSON.stringify(out))
                           .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput('Métricas HUB público activas');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}
