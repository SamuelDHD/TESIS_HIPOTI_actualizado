// ═══════════════════════════════════════════════════════════════
//  survey.js
//  Módulo de Encuesta de Alfabetización Sanitaria
//  Al finalizar: calcula riesgo con ML y guarda en Firebase
// ═══════════════════════════════════════════════════════════════

const PREGUNTAS = [
  {
    q: "¿ALGUNA VEZ UN MÉDICO LE HA SOLICITADO UN EXAMEN SOBRE LA FUNCIÓN DE LA GLÁNDULA TIROIDES (TSH, T3 O T4)?",
    opts: ["Sí", "No", "Tal vez"],
    key: "diagnosticado"
  },
  {
    q: "¿ACTUALMENTE PRESENTA ALGUNO DE ESTOS SÍNTOMAS?",
    opts: ["Cansancio frecuente", "Aumento de peso sin cambios en alimentación", "Caída del cabello", "Piel seca", "Sensibilidad al frío", "Estreñimiento frecuente",  "Ninguno de los anteriores"],
    key: "frecSintomas",
    multiple: true
  },
  {
    q: "¿HA EXPERIMENTADO CAMBIOS DE PESO IMPORTANTES SIN UNA CAUSA APARENTE DURANTE EL ÚLTIMO AÑO?",
    opts: ["Sí, aumento de peso", "Sí, pérdida de peso", "No"],
    key: "tiempoDiag"
  },
  {
    q: "¿CON QUÉ FRECUENCIA SIENTE FATIGA O MUCHO CANSANCIO EN SUS ACTIVIDADES DIARIAS?",
    opts: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
    key: "tomaMed"
  },
  {
    q: "¿TIENE ANTECEDENTES FAMILIARES CON PROBLEMAS DE LA GLÁNDULA TIROIDES?",
    opts: ["Sí", "No", "No conozco esa información"],
    key: "olvidaMed"
  },
  {
    q: "¿INGIERE ACTUALMENTE ALGÚN MEDICAMENTO DEBIDO A UNA PATOLOGÍA DE  LA GLÁNDULA TIROIDES?",
    opts: ["Sí", "No", "No estoy seguro(a)"],
    key: "frecControl"
  },
  {
    q: "¿HA PRESENTADO CAMBIOS HORMONALES O ALTERACIONES EN SU SALUD COMO IRREGULARIDAD MENSTRUAL, CAMBIOS DE  ESTADO DE ÁNIMO O DIFICULTAD PARA CONCENTRARSE?",
    opts: ["Sí", "No", "No aplica"],
    key: "sintomasRecientes"
  },
  {
    q: "¿CON QUÉ FRECUENCIA SE REALIZA CONTROLES MÉDICOS GENERALES O CHEQUEOS PREVENTIVOS?",
    opts: ["Cada 3 a 6 meses", "Una vez al año", "Solo cuando tengo molestias", "Nunca"],
    key: "controlTrat"
  },
  {
    q: "¿CON QUÉ FRECUENCIA SE REALIZA CONTROLES MÉDICOS GENERALES O CHEQUEOS PREVENTIVOS?",
    opts: ["Sí", "No"],
    key: "dejControles"
  },
  {
    q: "¿CONSIDERA QUE PODRÍA TENER ALGÚN PROBLEMA RELACIONADO CON LA GLÁNDULA TIROIDES SEGÚN SUS SÍNTOMAS ACTUALES?",
    opts: ["Sí", "No", "No estoy seguro(a)"],
    key: "factoresDif"
  },
  {
    q: "¿HA CONSULTADO ALGUNA VEZ A UN MÉDICO POR SÍNTOMAS COMO CANSANCIO, AUMENTO DE PESO O CAMBIOS DE ESTADO DE ÁNIMO?",
    opts: ["Sí", "No"],
    key: "calidadVida"
  },
  {
    q: "¿ESTARÍA DISPUESTO(A) A REALIZARSE UNA EVALUACIÓN MÉDICA Y EXAMENES DE LABORATORIO PARA DESCARTAR ALTERACIONES DE LA GLÁNDULA TIROIDES?",
    opts: ["Sí", "No", "Tal vez"],
    key: "orientacion"
  }
];

let preguntaActual = 0;
let respuestas = new Array(PREGUNTAS.length).fill(null);

// ───────────────────────────────────────────────────────────────
// RENDERIZAR PREGUNTAS
// ───────────────────────────────────────────────────────────────
function renderizarPreguntas() {
  const letras = ['A','B','C','D','E','F','G'];
  const cont = document.getElementById('questionsContainer');
  if (!cont) return;

  cont.innerHTML = PREGUNTAS.map((q, i) => `
    <div class="question-card ${i === 0 ? 'active' : ''}" id="qcard${i}">
      <div class="q-number">Pregunta ${i + 1} de ${PREGUNTAS.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="options-grid">
        ${q.opts.map((o, j) => `
          <button class="option-btn" id="opt${i}_${j}" onclick="seleccionarOpcion(${i},${j})">
            <span class="opt-letter">${letras[j] || j + 1}</span>${o}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function seleccionarOpcion(qi, oi) {
    const pregunta = PREGUNTAS[qi];
    // Preguntas de selección múltiple
    if (pregunta.multiple) {
        if (!Array.isArray(respuestas[qi])) {
            respuestas[qi] = [];
        }
        const pos = respuestas[qi].indexOf(oi);
        if (pos === -1) {
            respuestas[qi].push(oi);
        } else {
            respuestas[qi].splice(pos, 1);
        }
        document.querySelectorAll(`#qcard${qi} .option-btn`).forEach((b, j) => {
            b.classList.toggle('selected', respuestas[qi].includes(j));
        });
        return;
    }

    // Preguntas normales
    respuestas[qi] = oi;

    document.querySelectorAll(`#qcard${qi} .option-btn`).forEach((b, j) => {
        b.classList.toggle('selected', j === oi);
    });
}

function actualizarProgreso() {
  const pct = Math.round(((preguntaActual + 1) / PREGUNTAS.length) * 100);
  const fill = document.getElementById('progressFill');
  const txt  = document.getElementById('progressText');
  const pctEl= document.getElementById('progressPct');
  if (fill) fill.style.width = pct + '%';
  if (txt)  txt.textContent  = `Pregunta ${preguntaActual + 1} de ${PREGUNTAS.length}`;
  if (pctEl) pctEl.textContent = pct + '%';
}

function siguientePregunta() {
const pregunta = PREGUNTAS[preguntaActual];
if (
    respuestas[preguntaActual] === null ||
    (pregunta.multiple && respuestas[preguntaActual].length === 0)
) {
    mostrarToast("Por favor seleccione al menos una opción.", "error");
    return;
}
  if (preguntaActual < PREGUNTAS.length - 1) {
    document.getElementById(`qcard${preguntaActual}`).classList.remove('active');
    preguntaActual++;
    document.getElementById(`qcard${preguntaActual}`).classList.add('active');
    document.getElementById('btnPrev').style.display = 'inline-flex';
    actualizarProgreso();
    if (preguntaActual === PREGUNTAS.length - 1) {
      document.getElementById('btnNext').textContent = 'Finalizar ✓';
    }
  } else {
    finalizarEncuesta();
  }
}

function preguntaAnterior() {
  if (preguntaActual > 0) {
    document.getElementById(`qcard${preguntaActual}`).classList.remove('active');
    preguntaActual--;
    document.getElementById(`qcard${preguntaActual}`).classList.add('active');
    actualizarProgreso();
    document.getElementById('btnNext').textContent = 'Siguiente →';
    if (preguntaActual === 0) {
      document.getElementById('btnPrev').style.display = 'none';
    }
  }
}

// ───────────────────────────────────────────────────────────────
// FINALIZAR ENCUESTA — Calcula riesgo ML y guarda en Firebase
// ───────────────────────────────────────────────────────────────
async function finalizarEncuesta() {
  // Construir objeto de respuestas
  const datosEncuesta = { fechaEncuesta: new Date().toISOString() };
  PREGUNTAS.forEach((q, i) => {
    datosEncuesta[q.key] = q.opts[respuestas[i]];
    if (q.multiple) {
    datosEncuesta[q.key] = respuestas[i].map(idx => q.opts[idx]);
} else {
    datosEncuesta[q.key] = q.opts[respuestas[i]];
}
  });

  // Predicción ML desde respuestas
  const resultadoML = predecirDesdeEncuesta(datosEncuesta);

  // Score de adherencia clásico (para mostrar en UI)
  const tomaMed  = respuestas[3];
  const olvida   = respuestas[4];
  const control  = respuestas[5];
  const scoreAdh = (tomaMed === 0 ? 2 : tomaMed === 1 ? 1 : 0)
                 + (olvida  === 0 ? 2 : olvida  === 1 ? 1 : 0)
                 + (control <= 1  ? 2 : control  === 2 ? 1 : 0);

  let adherencia, clsAdh;
  if (scoreAdh >= 5) { adherencia = 'Adherencia Alta';    clsAdh = 'risk-bajo'; }
  else if (scoreAdh >= 3) { adherencia = 'Adherencia Media'; clsAdh = 'risk-moderado'; }
  else { adherencia = 'Adherencia Baja'; clsAdh = 'risk-alto'; }

  // Guardar en Firebase (colección encuestas)
  const registroEncuesta = {
    respuestas:  datosEncuesta,
    adherencia,
    riesgoML:    resultadoML.nivel,
    confianzaML: resultadoML.confianza,
    scoreML:     resultadoML.scoreTotal,
    neutrosofia: resultadoML.neutrosofia,
    factoresRiesgo: resultadoML.factores,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  };

  // También crear paciente en colección pacientes con datos estimados
  const datosPaciente = {
    ...resultadoML.variablesEstimadas,
    fuenteDatos: "encuesta",
    datosEncuestaRef: datosEncuesta
  };

  try {
    await db.collection(COLECCION_ENCUESTAS).add(registroEncuesta);
    await crearPaciente(datosPaciente);
    mostrarToast("✅ Datos guardados en Firebase correctamente", "success");
  } catch (err) {
    console.warn("Firebase no disponible, guardando en localStorage");
    const local = JSON.parse(localStorage.getItem('surveyResultsV2') || '[]');
    local.push(registroEncuesta);
    localStorage.setItem('surveyResultsV2', JSON.stringify(local));
  }

  // Mostrar pantalla de resultado
  mostrarResultadoEncuesta(resultadoML, adherencia, clsAdh);
}

function mostrarResultadoEncuesta(resultadoML, adherencia, clsAdh) {
  document.querySelectorAll('.question-card').forEach(c => c.style.display = 'none');
  document.getElementById('progressWrap').style.display = 'none';
  document.getElementById('surveyNav').style.display    = 'none';

  const rs = document.getElementById('result-screen');
  rs.style.display = 'block';

  const n = resultadoML.neutrosofia;
  const factores = resultadoML.factores.length
    ? resultadoML.factores.map(f => `<li>⚠️ ${f}</li>`).join('')
    : '<li>✅ Sin factores críticos detectados</li>';

  rs.innerHTML = `
    <div style="font-size:48px;margin-bottom:16px;">📊</div>
    <h2>Resultado de su Evaluación</h2>
    <p style="color:#6b7a8d;font-size:13px;margin-bottom:16px;">
      Basado en sus respuestas, el modelo ML ha calculado:
    </p>

    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:20px 0;">
      <div>
        <p style="font-size:11px;color:#6b7a8d;margin-bottom:4px;">ADHERENCIA AL TRATAMIENTO</p>
        <div class="risk-badge ${clsAdh}">${adherencia}</div>
      </div>
      <div>
        <p style="font-size:11px;color:#6b7a8d;margin-bottom:4px;">RIESGO CARDIOVASCULAR (ML)</p>
        <div class="risk-badge risk-${resultadoML.clase}">
          Riesgo ${resultadoML.nivel}
          <span style="font-size:11px;opacity:.7;margin-left:6px;">${resultadoML.confianza}% confianza</span>
        </div>
      </div>
    </div>

    <div class="neutro-box" style="margin:20px auto;max-width:400px;">
      <h5>∿ Lógica Neutrosófica</h5>
      <div class="neutro-bars">
        <div class="neutro-row"><span>Verdad (T)</span><div class="nbar" style="width:${n.T*100}%;background:#27ae60"></div><span>${n.T}</span></div>
        <div class="neutro-row"><span>Indeterminación (I)</span><div class="nbar" style="width:${n.I*100}%;background:#e8b84b"></div><span>${n.I}</span></div>
        <div class="neutro-row"><span>Falsedad (F)</span><div class="nbar" style="width:${n.F*100}%;background:#c0392b"></div><span>${n.F}</span></div>
      </div>
    </div>

    <div style="text-align:left;max-width:480px;margin:0 auto 20px;">
      <h5 style="margin-bottom:8px;">⚠️ Factores de Riesgo Estimados</h5>
      <ul class="factores-list">${factores}</ul>
    </div>

    <p style="font-size:12px;color:#6b7a8d;margin-bottom:20px;">
      ✅ Sus respuestas han sido guardadas y un nuevo registro fue añadido a la base de datos.
    </p>
    <button class="btn btn-primary" onclick="reiniciarEncuesta()">🔄 Nueva Encuesta</button>
  `;
}

function reiniciarEncuesta() {
  preguntaActual = 0;
  respuestas.fill(null);
  const rs = document.getElementById('result-screen');
  if (rs) { rs.style.display = 'none'; rs.innerHTML = ''; }
  document.getElementById('progressWrap').style.display = 'block';
  document.getElementById('surveyNav').style.display    = 'flex';
  document.getElementById('btnNext').textContent = 'Siguiente →';
  document.getElementById('btnPrev').style.display = 'none';
  renderizarPreguntas();
  actualizarProgreso();
}

// Exponer globalmente
window.renderizarPreguntas  = renderizarPreguntas;
window.seleccionarOpcion    = seleccionarOpcion;
window.siguientePregunta    = siguientePregunta;
window.preguntaAnterior     = preguntaAnterior;
window.finalizarEncuesta    = finalizarEncuesta;
window.reiniciarEncuesta    = reiniciarEncuesta;

console.log("✅ Módulo Encuesta cargado");
