// ═══════════════════════════════════════════════════════════════
//  charts.js
//  Módulo de Gráficas — Chart.js con datos reales de Firebase
// ═══════════════════════════════════════════════════════════════

let chartsInicializados = false;
let instanciasChart = [];

function destruirCharts() {
  instanciasChart.forEach(c => { try { c.destroy(); } catch(e){} });
  instanciasChart = [];
}

function crearChart(...args) {
  const inst = new Chart(...args);
  instanciasChart.push(inst);
  return inst;
}

function contarOpcion(data, key, val) {
  return data.filter(r => {
    const respuesta = r[key];

    if (Array.isArray(respuesta)) {
      return respuesta.includes(val);
    }

    return respuesta === val;
  }).length;
}

// ───────────────────────────────────────────────────────────────
// INICIALIZAR TODAS LAS GRÁFICAS
// ───────────────────────────────────────────────────────────────
function inicializarGraficas() {
  if (chartsInicializados) return;
  chartsInicializados = true;
  destruirCharts();

  // Intentar cargar desde Firebase primero
  db.collection(COLECCION_ENCUESTAS)
    .orderBy("fecha", "desc")
    .get()
    .then(snapshot => {
      let datos = [];
      snapshot.forEach(doc => datos.push(doc.data()?.respuestas || {}));
      if (datos.length === 0) datos = generarDatosDemo();
      renderizarGraficas(datos);
    })
    .catch(() => {
      // Firebase no disponible — usar localStorage o demo
      let datos = JSON.parse(localStorage.getItem('surveyResultsV2') || '[]');
      if (datos.length === 0) datos = generarDatosDemo();
      renderizarGraficas(datos);
    });

  // También graficar distribución de riesgo desde pacientes
  renderizarGraficaRiesgo();
}

// ───────────────────────────────────────────────────────────────
// GRÁFICA DE RIESGO ML desde pacientesCache
// ───────────────────────────────────────────────────────────────
function renderizarGraficaRiesgo() {
  const el = document.getElementById('chartRiesgoML');
  if (!el) return;

  const datos = pacientesCache.length > 0 ? pacientesCache : [];
  const bajos     = datos.filter(p => p.riesgo === 'bajo').length;
  const moderados = datos.filter(p => p.riesgo === 'moderado').length;
  const altos     = datos.filter(p => p.riesgo === 'alto').length;

  crearChart(el, {
    type: 'doughnut',
    data: {
      labels: ['Riesgo Bajo', 'Riesgo Moderado', 'Riesgo Alto'],
      datasets: [{
        data: [bajos, moderados, altos],
        backgroundColor: ['#27ae60', '#e8b84b', '#c0392b'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        title:  { display: true, text: 'Distribución de Riesgo Cardiovascular (ML)' }
      },
      cutout: '60%'
    }
  });

  // Actualizar contadores del resumen
  const tot = datos.length;
  const elTot = document.getElementById('sTotal');
  const elBaj = document.getElementById('sBajo');
  const elMod = document.getElementById('sMod');
  const elAlt = document.getElementById('sAlto');
  if (elTot) elTot.textContent = tot;
  if (elBaj) elBaj.textContent = bajos;
  if (elMod) elMod.textContent = moderados;
  if (elAlt) elAlt.textContent = altos;
}

// ───────────────────────────────────────────────────────────────
// GRÁFICAS DE ENCUESTA
// ───────────────────────────────────────────────────────────────
function renderizarGraficas(datos) {
  const total = datos.length;

  // 1. DONUT — Diagnóstico confirmado
  const elDonut = document.getElementById('chartDonut');
  if (elDonut) {
    const diagSi = contarOpcion(datos, 'diagnosticado', 'Sí');
    crearChart(elDonut, {
      type: 'doughnut',
      data: {
        labels: ['Diagnosticado (Sí)', 'No diagnosticado'],
        datasets: [{ data: [diagSi, total - diagSi], backgroundColor: ['#22a39f','#c0392b'], borderWidth: 0 }]
      },
      options: {
        plugins: {
          legend: { position: 'bottom' },
          title:  { display: true, text: 'P1 · ¿Diagnóstico confirmado?' }
        },
        cutout: '60%'
      }
    });
  }

  // 2. BARRAS — Frecuencia de síntomas
  const elBar = document.getElementById('chartBar');
if (elBar) {
    const sintomas = ["Cansancio frecuente", "Aumento de peso sin cambios en alimentación", "Caída del cabello", "Piel seca", "Sensibilidad al frío", "Estreñimiento frecuente", "Ninguno de los anteriores"];    
    crearChart(elBar,{
        type:'bar',
        data:{
            labels:sintomas,
            datasets:[{
                label:'Pacientes',
                data:sintomas.map(s=>contarOpcion(datos,'frecSintomas',s)),
                backgroundColor:'#22a39f',
                borderRadius:6
            }]
        },
        options:{
            indexAxis:'y',
            plugins:{
                legend:{display:false},
                title:{
                    display:true,
                    text:'P2 · Síntomas actuales'
                }
            },
            scales:{
                x:{beginAtZero:true}
            }
        }
    });

}

  // 3. PIE — Cambios de peso
  const elPie = document.getElementById('chartAge');
  if (elPie) {
    const pesoLabels = ["Sí, aumento de peso", "Sí, pérdida de peso", "No"];
    crearChart(elPie, {
      type: 'pie',
      data: {
        labels: pesoLabels,
        datasets: [{
          data: pesoLabels.map(l => contarOpcion(datos, 'tiempoDiag', l)),
          backgroundColor: ['#0d1b2a','#1a6b6b','#22a39f','#e8b84b'],
          borderWidth: 0
        }]
      },
      options: { plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'P3 · Tiempo desde diagnóstico' }}}
    });
  }

  // 4. BARRAS HORIZONTALES — Frecuencia de fatiga
  const elLine = document.getElementById('chartLine');
  if (elLine) {
    const factOpts = ["Sí", "No", "No estoy seguro(a)"];
    crearChart(elLine, {
      type: 'bar',
      data: {
        labels: factOpts.map(l => l.length > 22 ? l.substring(0,22)+'…' : l),
        datasets: [{
          label: 'Pacientes',
          data: factOpts.map(l => contarOpcion(datos, 'frecFatiga', l)),
          backgroundColor: '#1a6b6b',
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { legend: { display: false }, title: { display: true, text: 'P4 · Frecuencia de fatiga' }},
        scales: { x: { beginAtZero: true } }
      }
    });
  }

  // 5. BARRAS — Adherencia a medicación
  const elAdh = document.getElementById('chartAdherencia');
  if (elAdh) {
    const medOpts = ["Sí, diariamente","Sí, ocasionalmente","No"];
    crearChart(elAdh, {
      type: 'bar',
      data: {
        labels: medOpts,
        datasets: [{
          label: 'Pacientes',
          data: medOpts.map(l => contarOpcion(datos, 'tomaMed', l)),
          backgroundColor: ['#27ae60','#e8b84b','#c0392b'],
          borderRadius: 6
        }]
      },
      options: {
        plugins: { legend: { display: false }, title: { display: true, text: 'P4 · Adherencia a Levotiroxina' }},
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

// ───────────────────────────────────────────────────────────────
// DATOS DEMO representativos
// ───────────────────────────────────────────────────────────────
function generarDatosDemo(){
    const opts = {
        diagnosticado:["Sí", "No", "Tal vez"],
        frecSintomas:["Cansancio frecuente", "Aumento de peso sin cambios en alimentación", "Caída del cabello", "Piel seca", "Sensibilidad al frío", "Estreñimiento frecuente", "Ninguno de los anteriores"],
        tiempoDiag:["Sí, aumento de peso", "Sí, pérdida de peso", "No"],
        tomaMed:["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        factoresDif:["Sí", "No", "No estoy seguro(a)"]

    };

    const demo=[];

    for(let i=0;i<50;i++){

        const entry={};

        entry.diagnosticado =
            opts.diagnosticado[Math.floor(Math.random()*opts.diagnosticado.length)];

        entry.tiempoDiag =
            opts.tiempoDiag[Math.floor(Math.random()*opts.tiempoDiag.length)];

        entry.tomaMed =
            opts.tomaMed[Math.floor(Math.random()*opts.tomaMed.length)];

        entry.factoresDif =
            opts.factoresDif[Math.floor(Math.random()*opts.factoresDif.length)];

        // Simular selección múltiple de síntomas
        const cantidad = Math.floor(Math.random()*3)+1;

        entry.frecSintomas = [];

        while(entry.frecSintomas.length<cantidad){

            const s = opts.frecSintomas[
                Math.floor(Math.random()*opts.frecSintomas.length)
            ];

            if(!entry.frecSintomas.includes(s))
                entry.frecSintomas.push(s);

        }

        demo.push(entry);

    }

    return demo;

}

// Refrescar cuando se navega a la página 4
function refrescarGraficas() {
  chartsInicializados = false;
  destruirCharts();
  setTimeout(inicializarGraficas, 100);
}

window.inicializarGraficas  = inicializarGraficas;
window.refrescarGraficas    = refrescarGraficas;
window.renderizarGraficaRiesgo = renderizarGraficaRiesgo;

console.log("✅ Módulo Gráficas cargado");
