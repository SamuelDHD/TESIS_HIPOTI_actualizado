// ═══════════════════════════════════════════════════════════════
//  ml-engine.js
//  Motor de Machine Learning — Árbol de Decisión con
//  umbrales clínicos reales + lógica neutrosófica
//  Algoritmo: Random Forest simulado (3 árboles de decisión)
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────
// UMBRALES CLÍNICOS (basados en literatura médica)
// ───────────────────────────────────────────────────────────────
const UMBRALES = {
  tsh: {
    normal:    { min: 0.4,  max: 4.0  },  // μU/mL — ATA Guidelines
    alto:      { min: 4.0,  max: 10.0 },
    muyAlto:   { min: 10.0, max: 999  }
  },
  t4libre: {
    normal:    { min: 0.8,  max: 1.8  },  // ng/dL
    bajo:      { min: 0.0,  max: 0.8  }
  },
  colesterol: {
    optimo:    { min: 0,    max: 200  },  // mg/dL — ACC/AHA
    limite:    { min: 200,  max: 239  },
    alto:      { min: 239,  max: 999  }
  },
  tas: {
    normal:    { min: 90,   max: 120  },  // mmHg — JNC 8
    elevada:   { min: 120,  max: 130  },
    alta1:     { min: 130,  max: 140  },
    alta2:     { min: 140,  max: 999  }
  },
  tad: {
    normal:    { min: 60,   max: 80   },
    alta1:     { min: 80,   max: 90   },
    alta2:     { min: 90,   max: 999  }
  },
  imc: {
    normal:    { min: 18.5, max: 24.9 },
    sobrepeso: { min: 25.0, max: 29.9 },
    obesidad:  { min: 30.0, max: 999  }
  },
  anos: {
    reciente:  { min: 0,    max: 3    },
    moderado:  { min: 3,    max: 8    },
    cronico:   { min: 8,    max: 999  }
  }
};

// ───────────────────────────────────────────────────────────────
// ÁRBOL 1 — Basado en hormonas tiroideas + lípidos
// ───────────────────────────────────────────────────────────────
function arbol1(p) {
  let score = 0;
  // TSH elevado = hipotiroidismo no controlado
  if (p.tsh > UMBRALES.tsh.muyAlto.min)      score += 3;
  else if (p.tsh > UMBRALES.tsh.alto.min)     score += 2;
  else if (p.tsh >= UMBRALES.tsh.normal.min)  score += 0;
  else                                          score += 1; // TSH bajo también es riesgo

  // T4 libre bajo = hipotiroidismo activo
  if (p.t4 < UMBRALES.t4libre.bajo.max)        score += 2;

  // Colesterol elevado
  if (p.col >= UMBRALES.colesterol.alto.min)   score += 3;
  else if (p.col >= UMBRALES.colesterol.limite.min) score += 1;

  return score; // max: 8
}

// ───────────────────────────────────────────────────────────────
// ÁRBOL 2 — Basado en presión arterial + IMC
// ───────────────────────────────────────────────────────────────
function arbol2(p) {
  let score = 0;
  // Tensión arterial sistólica
  if (p.tas >= UMBRALES.tas.alta2.min)         score += 3;
  else if (p.tas >= UMBRALES.tas.alta1.min)    score += 2;
  else if (p.tas >= UMBRALES.tas.elevada.min)  score += 1;

  // Tensión arterial diastólica
  if (p.tad >= UMBRALES.tad.alta2.min)         score += 2;
  else if (p.tad >= UMBRALES.tad.alta1.min)    score += 1;

  // IMC
  if (p.imc >= UMBRALES.imc.obesidad.min)      score += 2;
  else if (p.imc >= UMBRALES.imc.sobrepeso.min) score += 1;

  return score; // max: 7
}

// ───────────────────────────────────────────────────────────────
// ÁRBOL 3 — Basado en tiempo de diagnóstico + edad + sexo
// ───────────────────────────────────────────────────────────────
function arbol3(p) {
  let score = 0;
  // Años con diagnóstico sin control
  if (p.anos >= UMBRALES.anos.cronico.min)     score += 2;
  else if (p.anos >= UMBRALES.anos.moderado.min) score += 1;

  // Edad (>55 mayor riesgo cardiovascular)
  if (p.edad > 65)       score += 2;
  else if (p.edad > 55)  score += 1;

  // Sexo femenino con hipotiroidismo tiene mayor incidencia (literatura)
  if (p.sexo === 'F')    score += 1;

  return score; // max: 5
}

// ───────────────────────────────────────────────────────────────
// LÓGICA NEUTROSÓFICA — Manejo de incertidumbre
// Convierte el score a valores (T, I, F) = Verdad, Indeterminación, Falsedad
// ───────────────────────────────────────────────────────────────
function neutrosofia(scoreNorm) {
  // scoreNorm: valor entre 0 y 1
  let T, I, F;
  if (scoreNorm < 0.33) {
    T = scoreNorm * 0.6;
    I = 0.2;
    F = 1 - T - I;
  } else if (scoreNorm < 0.66) {
    T = 0.4 + (scoreNorm - 0.33) * 0.6;
    I = 0.35; // zona de mayor incertidumbre (frontera)
    F = 1 - T - I;
  } else {
    T = 0.6 + (scoreNorm - 0.66) * 0.9;
    I = 0.15;
    F = Math.max(0, 1 - T - I);
  }
  // Normalizar para que sumen exactamente 1
  const suma = T + I + F;
  return {
    T: parseFloat((T / suma).toFixed(3)),
    I: parseFloat((I / suma).toFixed(3)),
    F: parseFloat((F / suma).toFixed(3))
  };
}

// ───────────────────────────────────────────────────────────────
// FUNCIÓN PRINCIPAL — Random Forest (votación de 3 árboles)
// ───────────────────────────────────────────────────────────────
function predecirRiesgo(paciente) {
  const s1 = arbol1(paciente);  // max 8
  const s2 = arbol2(paciente);  // max 7
  const s3 = arbol3(paciente);  // max 5

  // Normalizar cada árbol a [0,1]
  const n1 = s1 / 8;
  const n2 = s2 / 7;
  const n3 = s3 / 5;

  // Promedio ponderado (pesos según relevancia clínica)
  const scoreTotal = (n1 * 0.45) + (n2 * 0.35) + (n3 * 0.20);

  // Lógica neutrosófica para gestionar incertidumbre
  const neutro = neutrosofia(scoreTotal);

  // Clasificación final basada en T (verdad) + score total
  let nivel, clase, confianza;

  if (scoreTotal < 0.33) {
    nivel = "Bajo";
    clase = "bajo";
    confianza = Math.round((1 - scoreTotal) * 100);
  } else if (scoreTotal < 0.60) {
    nivel = "Moderado";
    clase = "moderado";
    confianza = Math.round((1 - Math.abs(scoreTotal - 0.46)) * 80);
  } else {
    nivel = "Alto";
    clase = "alto";
    confianza = Math.round(scoreTotal * 100);
  }

  // Factores de riesgo detectados
  const factores = [];
  if (paciente.tsh > 4.0)    factores.push(`TSH elevado (${paciente.tsh} μU/mL)`);
  if (paciente.t4 < 0.8)     factores.push(`T4 libre bajo (${paciente.t4} ng/dL)`);
  if (paciente.col >= 200)   factores.push(`Colesterol alto (${paciente.col} mg/dL)`);
  if (paciente.tas >= 130)   factores.push(`Presión sistólica elevada (${paciente.tas} mmHg)`);
  if (paciente.tad >= 80)    factores.push(`Presión diastólica elevada (${paciente.tad} mmHg)`);
  if (paciente.imc >= 25)    factores.push(`IMC elevado (${paciente.imc})`);
  if (paciente.anos >= 8)    factores.push(`Diagnóstico crónico sin control (${paciente.anos} años)`);

  return {
    nivel,
    clase,
    confianza: Math.min(confianza, 99),
    scoreTotal: parseFloat(scoreTotal.toFixed(3)),
    neutrosofia: neutro,
    scores: { arbol1: s1, arbol2: s2, arbol3: s3 },
    factores
  };
}

// ───────────────────────────────────────────────────────────────
// PREDICCIÓN DESDE ENCUESTA
// Mapea respuestas textuales a valores numéricos para el modelo
// ───────────────────────────────────────────────────────────────
function predecirDesdeEncuesta(respuestas) {
  // Convertir respuestas de encuesta a variables clínicas estimadas
  const p = {};

  // TSH estimado según frecuencia de síntomas + adherencia
  const frecSint = ["Nunca","Rara vez","A veces","Frecuentemente","Siempre"];
  const idxFrec  = frecSint.indexOf(respuestas.frecSintomas);
  p.tsh = 0.5 + (idxFrec >= 0 ? idxFrec * 2.8 : 5);

  // T4 libre estimado (inversamente proporcional a TSH)
  p.t4 = Math.max(0.3, 1.8 - (p.tsh * 0.08));

  // Colesterol estimado según IMC y tiempo
  const tiempos = ["Menos de 1 año","1 a 3 años","4 a 6 años","Más de 6 años"];
  const idxTiempo = tiempos.indexOf(respuestas.tiempoDiag);
  p.anos = idxTiempo === 0 ? 1 : idxTiempo === 1 ? 2 : idxTiempo === 2 ? 5 : 10;

  // Adherencia al tratamiento → afecta colesterol y presión
  const noToma = respuestas.tomaMed === "No";
  const tomaParcial = respuestas.tomaMed === "Sí, ocasionalmente";
  p.col = noToma ? 245 : tomaParcial ? 215 : 185;

  // Presión arterial estimada
  p.tas = noToma ? 145 : tomaParcial ? 132 : 118;
  p.tad = noToma ? 92  : tomaParcial ? 84  : 76;

  // IMC neutral (no hay dato en encuesta)
  p.imc = 26.5;

  // Edad y sexo neutros para predicción desde encuesta
  p.edad = 45;
  p.sexo = 'F'; // mayoría de casos de hipotiroidismo

  const resultado = predecirRiesgo(p);
  resultado.fuenteDatos = "encuesta";
  resultado.variablesEstimadas = p;
  return resultado;
}

// Exportar funciones globalmente
window.predecirRiesgo        = predecirRiesgo;
window.predecirDesdeEncuesta = predecirDesdeEncuesta;
window.UMBRALES              = UMBRALES;

console.log("✅ Motor ML (Árbol de Decisión + Neutrosofía) cargado");
