// ═══════════════════════════════════════════════════════════════
//  export.js
//  Exportación a Excel (.xlsx) con SheetJS
//  Exporta pacientes con todos sus datos clínicos y resultado ML
// ═══════════════════════════════════════════════════════════════

function exportarExcel() {
  if (!pacientesCache || pacientesCache.length === 0) {
    mostrarToast("No hay datos para exportar", "error");
    return;
  }

  const btn = document.getElementById('btnExportar');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Generando Excel…'; }

  try {
    // Preparar filas para Excel
    const filas = pacientesCache.map((p, i) => ({
      "N°":                   i + 1,
      "Edad (años)":          p.edad ?? '',
      "Sexo":                 p.sexo === 'M' ? 'Masculino' : 'Femenino',
      "TSH (μU/mL)":          p.tsh ?? '',
      "T4 Libre (ng/dL)":     p.t4  ?? '',
      "Colesterol (mg/dL)":   p.col ?? '',
      "TAS (mmHg)":           p.tas ?? '',
      "TAD (mmHg)":           p.tad ?? '',
      "IMC":                  p.imc ?? '',
      "Años con Diagnóstico": p.anos ?? '',
      "Riesgo CV (ML)":       capitalizar(p.riesgo || ''),
      "Confianza ML (%)":     p.confianza ?? '',
      "Score ML":             p.scoreML   ?? '',
      "Neutrosofía T":        p.neutrosofia?.T ?? '',
      "Neutrosofía I":        p.neutrosofia?.I ?? '',
      "Neutrosofía F":        p.neutrosofia?.F ?? '',
      "Factores de Riesgo":   Array.isArray(p.factoresRiesgo) ? p.factoresRiesgo.join(' | ') : '',
      "Fuente de Datos":      p.fuenteDatos ?? 'manual',
      "Fecha Registro":       p.fechaRegistro?.toDate
                               ? p.fechaRegistro.toDate().toLocaleDateString('es-EC')
                               : new Date().toLocaleDateString('es-EC')
    }));

    // Hoja 1 — Datos de pacientes
    const ws1 = XLSX.utils.json_to_sheet(filas);

    // Estilo de ancho de columnas
    ws1['!cols'] = [
      {wch:5},{wch:12},{wch:12},{wch:14},{wch:16},{wch:18},
      {wch:12},{wch:12},{wch:8},{wch:20},{wch:16},{wch:16},
      {wch:12},{wch:14},{wch:14},{wch:14},{wch:40},{wch:15},{wch:18}
    ];

    // Hoja 2 — Resumen estadístico
    const total    = pacientesCache.length;
    const altos    = pacientesCache.filter(p => p.riesgo === 'alto').length;
    const moderados= pacientesCache.filter(p => p.riesgo === 'moderado').length;
    const bajos    = pacientesCache.filter(p => p.riesgo === 'bajo').length;

    const resumen = [
      { "Indicador": "Total de Pacientes",                "Valor": total },
      { "Indicador": "Riesgo Alto",                       "Valor": altos,     "Porcentaje": ((altos/total)*100).toFixed(1)+'%' },
      { "Indicador": "Riesgo Moderado",                   "Valor": moderados, "Porcentaje": ((moderados/total)*100).toFixed(1)+'%' },
      { "Indicador": "Riesgo Bajo",                       "Valor": bajos,     "Porcentaje": ((bajos/total)*100).toFixed(1)+'%' },
      { "Indicador": "Pacientes desde Encuesta",          "Valor": pacientesCache.filter(p=>p.fuenteDatos==='encuesta').length },
      { "Indicador": "Pacientes Ingresados Manualmente",  "Valor": pacientesCache.filter(p=>p.fuenteDatos==='manual').length },
      { "Indicador": "Fecha de Exportación",              "Valor": new Date().toLocaleString('es-EC') },
      { "Indicador": "Sistema",                           "Valor": "Sistema Web Inteligente — Riesgo CV + Hipotiroidismo" },
      { "Indicador": "Algoritmo ML",                      "Valor": "Árbol de Decisión (Random Forest simulado) + Neutrosofía" },
      { "Indicador": "Universidad",                       "Valor": "Universidad de Guayaquil — Ing. de Software 2025" },
    ];
    const ws2 = XLSX.utils.json_to_sheet(resumen);
    ws2['!cols'] = [{wch:40},{wch:20},{wch:15}];

    // Libro Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Pacientes");
    XLSX.utils.book_append_sheet(wb, ws2, "Resumen");

    // Nombre de archivo con fecha
    const fecha = new Date().toISOString().slice(0,10);
    XLSX.writeFile(wb, `pacientes_hipotiroidismo_${fecha}.xlsx`);

    mostrarToast(`✅ Excel exportado — ${total} pacientes`, "success");
  } catch (err) {
    console.error("❌ Error al exportar Excel:", err);
    mostrarToast("Error al generar el Excel", "error");
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '📥 Exportar Excel'; }
  }
}

// Exportar encuestas a Excel
function exportarEncuestasExcel() {
  db.collection(COLECCION_ENCUESTAS)
    .orderBy("fecha", "desc")
    .get()
    .then(snapshot => {
      const filas = [];
      snapshot.forEach((doc, i) => {
        const d = doc.data();
        const r = d.respuestas || {};
        filas.push({
          "N°":               i + 1,
          "Diagnóstico":      r.diagnosticado     ?? '',
          "Frec. Síntomas":   r.frecSintomas      ?? '',
          "Tiempo Diag.":     r.tiempoDiag        ?? '',
          "Toma Medicación":  r.tomaMed           ?? '',
          "Olvida Med.":      r.olvidaMed         ?? '',
          "Frec. Control":    r.frecControl       ?? '',
          "Control Trat.":    r.controlTrat       ?? '',
          "Dejó Controles":   r.dejControles      ?? '',
          "Calidad de Vida":  r.calidadVida       ?? '',
          "Orientación":      r.orientacion       ?? '',
          "Adherencia":       d.adherencia        ?? '',
          "Riesgo ML":        d.riesgoML          ?? '',
          "Confianza ML (%)": d.confianzaML       ?? '',
          "Score ML":         d.scoreML           ?? '',
        });
      });

      if (filas.length === 0) {
        mostrarToast("No hay encuestas para exportar", "error");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(filas);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Encuestas");
      const fecha = new Date().toISOString().slice(0,10);
      XLSX.writeFile(wb, `encuestas_hipotiroidismo_${fecha}.xlsx`);
      mostrarToast(`✅ Encuestas exportadas`, "success");
    })
    .catch(err => {
      console.warn("Firebase no disponible, exportando desde localStorage");
      const local = JSON.parse(localStorage.getItem('surveyResultsV2') || '[]');
      if (local.length === 0) { mostrarToast("No hay encuestas locales", "error"); return; }
      const ws = XLSX.utils.json_to_sheet(local);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Encuestas");
      XLSX.writeFile(wb, `encuestas_local_${new Date().toISOString().slice(0,10)}.xlsx`);
    });
}

window.exportarExcel          = exportarExcel;
window.exportarEncuestasExcel = exportarEncuestasExcel;

console.log("✅ Módulo Exportación Excel cargado");
