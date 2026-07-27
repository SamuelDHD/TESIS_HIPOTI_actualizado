/* ══════════════════════════════════════════════════════════
   GLOSARIO — Alfabetización Sanitaria
   Hipotiroidismo No Controlado y Riesgo Cardiovascular
   ══════════════════════════════════════════════════════════
   Cada término soporta un campo "imagen" (URL) opcional.
   Si "imagen" está vacío, la tarjeta muestra el ícono emoji.
   Para agregar una imagen a un término, basta con pegar la
   URL dentro de imagen: "https://..." en el objeto correspondiente.
   ══════════════════════════════════════════════════════════ */

const CATEGORIAS_GLOSARIO = [
  { id: 'todos',          label: 'Todos' },
  { id: 'definiciones',   label: '📘 Definiciones' },
  { id: 'tipos',          label: '🧬 Tipos' },
  { id: 'caracteristicas',label: '🔎 Características' },
  { id: 'cuidados',       label: '💚 Cuidados' },
  { id: 'advertencias',   label: '🚨 Advertencias' },
  { id: 'dietas',         label: '🥗 Dietas' },
];

const GLOSARIO_DATOS = [
  /* ───────────── DEFINICIONES ───────────── */
  {
    id: 'g1', categoria: 'definiciones', icono: '🦋',
    termino: 'Hipotiroidismo',
    resumen: 'Condición en la que la tiroides no produce suficiente hormona tiroidea.',
    detalle: 'El hipotiroidismo ocurre cuando la glándula tiroides —ubicada en la parte frontal del cuello— no genera suficiente cantidad de hormonas tiroideas (T3 y T4). Estas hormonas regulan el metabolismo, la temperatura corporal, la frecuencia cardíaca y la energía general del organismo. Cuando los niveles bajan, el metabolismo se enlentece y aparecen síntomas como cansancio, aumento de peso y sensibilidad al frío.',
    imagen: ''
  },
  {
    id: 'g2', categoria: 'definiciones', icono: '🧪',
    termino: 'TSH (Hormona Estimulante de la Tiroides)',
    resumen: 'Hormona que regula el funcionamiento de la tiroides; su nivel indica si hay hipotiroidismo.',
    detalle: 'La TSH es producida por la glándula hipófisis y estimula a la tiroides para que libere T3 y T4. Cuando la tiroides funciona poco, la hipófisis "compensa" liberando más TSH, por eso valores elevados de TSH suelen indicar hipotiroidismo. El rango normal de referencia habitual es de 0.4 a 4.0 μU/mL, aunque puede variar según el laboratorio.',
    imagen: ''
  },
  {
    id: 'g3', categoria: 'definiciones', icono: '🔬',
    termino: 'T4 Libre (Tiroxina)',
    resumen: 'Principal hormona producida por la tiroides; su medición confirma el diagnóstico.',
    detalle: 'La T4 libre es la forma activa y no unida a proteínas de la tiroxina circulante en sangre. Junto con la TSH, es el examen de laboratorio más usado para diagnosticar y monitorear el hipotiroidismo. Valores bajos de T4 libre junto a TSH elevada confirman un hipotiroidismo manifiesto.',
    imagen: ''
  },
  {
    id: 'g4', categoria: 'definiciones', icono: '❤️',
    termino: 'Riesgo Cardiovascular',
    resumen: 'Probabilidad de desarrollar enfermedades del corazón y los vasos sanguíneos.',
    detalle: 'El riesgo cardiovascular es una estimación de la probabilidad que tiene una persona de sufrir eventos como infarto, angina, insuficiencia cardíaca o accidente cerebrovascular en un periodo determinado. En el hipotiroidismo no controlado, este riesgo aumenta debido a alteraciones en el colesterol, la presión arterial y la función del corazón.',
    imagen: ''
  },
  {
    id: 'g5', categoria: 'definiciones', icono: '🤖',
    termino: 'Neutrosofía',
    resumen: 'Enfoque matemático que maneja la incertidumbre mediante grados de verdad, falsedad e indeterminación.',
    detalle: 'A diferencia de la lógica clásica (verdadero/falso), la neutrosofía asigna a cada dato tres componentes: verdad (T), indeterminación (I) y falsedad (F). En este sistema se usa junto al Machine Learning para clasificar el riesgo cardiovascular considerando la incertidumbre propia de los datos clínicos, ofreciendo una evaluación más matizada que un simple "sí" o "no".',
    imagen: ''
  },
  {
    id: 'g6', categoria: 'definiciones', icono: '🥼',
    termino: 'Levotiroxina',
    resumen: 'Medicamento hormonal sintético usado como tratamiento estándar del hipotiroidismo.',
    detalle: 'La levotiroxina es una hormona tiroidea sintética idéntica a la T4 natural. Se usa para reemplazar la hormona que la tiroides no produce en cantidad suficiente. Debe tomarse todos los días, siempre a la misma hora, en ayunas, para asegurar una absorción adecuada y un control estable de los niveles hormonales.',
    imagen: ''
  },

  /* ───────────── TIPOS ───────────── */
  {
    id: 'g7', categoria: 'tipos', icono: '⚠️',
    termino: 'Hipotiroidismo No Controlado',
    resumen: 'Cuando los niveles hormonales permanecen alterados a pesar del tratamiento o por falta de él.',
    detalle: 'Se considera "no controlado" cuando el paciente, con o sin tratamiento, mantiene niveles de TSH y T4 fuera del rango normal de forma persistente. Suele deberse a dosis inadecuadas de medicación, mala adherencia al tratamiento, interacciones con otros fármacos o alimentos, o falta de controles médicos periódicos.',
    imagen: ''
  },
  {
    id: 'g8', categoria: 'tipos', icono: '🩺',
    termino: 'Hipotiroidismo Subclínico',
    resumen: 'Etapa inicial con TSH elevada pero T4 libre todavía normal, casi sin síntomas.',
    detalle: 'Es una forma leve en la que los exámenes muestran una TSH ligeramente elevada mientras la T4 libre se mantiene dentro de parámetros normales. Muchas veces no genera síntomas evidentes, pero requiere seguimiento porque puede evolucionar a un hipotiroidismo manifiesto y también se asocia a un incremento moderado del riesgo cardiovascular.',
    imagen: ''
  },
  {
    id: 'g9', categoria: 'tipos', icono: '🧬',
    termino: 'Tiroiditis de Hashimoto',
    resumen: 'Enfermedad autoinmune y causa más frecuente de hipotiroidismo.',
    detalle: 'Es un trastorno en el que el propio sistema inmunológico ataca la glándula tiroides, reduciendo progresivamente su capacidad de producir hormonas. Es la causa más común de hipotiroidismo en zonas con suficiente yodo en la dieta. Su diagnóstico se apoya en anticuerpos específicos además de las pruebas hormonales habituales.',
    imagen: ''
  },
  {
    id: 'g10', categoria: 'tipos', icono: '🫀',
    termino: 'Dislipidemia',
    resumen: 'Alteración de los niveles de colesterol y triglicéridos en sangre.',
    detalle: 'El hipotiroidismo no controlado suele elevar el colesterol total, el colesterol LDL ("malo") y los triglicéridos, ya que las hormonas tiroideas influyen directamente en el metabolismo de las grasas. Esta dislipidemia es uno de los principales mecanismos por los que el hipotiroidismo aumenta el riesgo cardiovascular.',
    imagen: ''
  },
  {
    id: 'g11', categoria: 'tipos', icono: '📈',
    termino: 'Hipertensión Arterial',
    resumen: 'Presión arterial elevada de forma sostenida; frecuente en hipotiroidismo no controlado.',
    detalle: 'El déficit de hormonas tiroideas puede aumentar la rigidez de las arterias y la presión diastólica (el número "de abajo"). Mantener la presión arterial dentro de rangos saludables es clave para reducir el riesgo de infarto y accidente cerebrovascular en estos pacientes.',
    imagen: ''
  },
  {
    id: 'g12', categoria: 'tipos', icono: '💔',
    termino: 'Insuficiencia Cardíaca',
    resumen: 'El corazón pierde eficiencia para bombear sangre; complicación posible en casos severos.',
    detalle: 'En casos de hipotiroidismo severo y prolongado sin tratamiento, el corazón puede debilitarse y perder capacidad de bombeo eficiente, generando fatiga, hinchazón en piernas y dificultad para respirar. Es una de las complicaciones más graves y reforzar el motivo por el que un control temprano es tan importante.',
    imagen: ''
  },

  /* ───────────── CARACTERÍSTICAS ───────────── */
  {
    id: 'g13', categoria: 'caracteristicas', icono: '😴',
    termino: 'Fatiga y Cansancio Persistente',
    resumen: 'Uno de los síntomas más comunes y tempranos del hipotiroidismo.',
    detalle: 'La disminución del metabolismo provoca una sensación de agotamiento incluso después de dormir bien. Suele acompañarse de dificultad para concentrarse ("niebla mental") y menor tolerancia al esfuerzo físico.',
    imagen: ''
  },
  {
    id: 'g14', categoria: 'caracteristicas', icono: '⚖️',
    termino: 'Aumento de Peso',
    resumen: 'Ganancia de peso a pesar de mantener hábitos alimenticios similares.',
    detalle: 'Al enlentecerse el metabolismo, el cuerpo quema menos calorías en reposo. Es frecuente que los pacientes noten un aumento de peso moderado que resulta difícil de revertir solo con dieta, hasta que se corrigen los niveles hormonales.',
    imagen: ''
  },
  {
    id: 'g15', categoria: 'caracteristicas', icono: '🥶',
    termino: 'Intolerancia al Frío',
    resumen: 'Sensación de frío constante, incluso en ambientes templados.',
    detalle: 'La reducción del metabolismo basal disminuye la producción de calor corporal, por lo que muchos pacientes sienten frío en manos y pies o necesitan abrigarse más de lo habitual.',
    imagen: ''
  },
  {
    id: 'g16', categoria: 'caracteristicas', icono: '💇',
    termino: 'Piel Seca y Caída de Cabello',
    resumen: 'Cambios visibles en piel, cabello y uñas asociados al déficit hormonal.',
    detalle: 'La piel puede volverse seca, áspera y pálida; el cabello más quebradizo y con mayor caída de lo habitual; las uñas quebradizas. Estos cambios suelen mejorar progresivamente al normalizar los niveles hormonales con tratamiento.',
    imagen: ''
  },
  {
    id: 'g17', categoria: 'caracteristicas', icono: '💓',
    termino: 'Bradicardia (Pulso Lento)',
    resumen: 'Frecuencia cardíaca más lenta de lo normal, signo de alerta cardiovascular.',
    detalle: 'El déficit de hormonas tiroideas puede reducir la frecuencia cardíaca en reposo. Aunque no siempre genera síntomas, es un signo que el equipo médico evalúa junto con otros parámetros para valorar el riesgo cardiovascular global.',
    imagen: ''
  },

  /* ───────────── CUIDADOS ───────────── */
  {
    id: 'g18', categoria: 'cuidados', icono: '⏰',
    termino: 'Tomar la Medicación en Ayunas',
    resumen: 'La levotiroxina se absorbe mejor con el estómago vacío, siempre a la misma hora.',
    detalle: 'Se recomienda tomar la levotiroxina en ayunas, 30 a 60 minutos antes del desayuno, y siempre a la misma hora todos los días. El calcio, el hierro, los antiácidos y algunos alimentos (como la soja) pueden interferir con su absorción, por lo que conviene espaciarlos al menos 4 horas.',
    imagen: ''
  },
  {
    id: 'g19', categoria: 'cuidados', icono: '🩸',
    termino: 'Control Periódico de TSH',
    resumen: 'Exámenes de laboratorio regulares para ajustar la dosis del tratamiento.',
    detalle: 'Los controles de TSH permiten al médico verificar que la dosis de levotiroxina sea la adecuada. Generalmente se solicitan cada 6 a 8 semanas tras un cambio de dosis, y luego cada 6 a 12 meses una vez que los niveles están estables.',
    imagen: ''
  },
  {
    id: 'g20', categoria: 'cuidados', icono: '🚶',
    termino: 'Actividad Física Moderada',
    resumen: 'El ejercicio regular ayuda a controlar el peso y protege la salud cardiovascular.',
    detalle: 'Caminar, nadar o realizar ejercicio aeróbico moderado de forma regular contribuye a mejorar el metabolismo, controlar el peso corporal, reducir la presión arterial y fortalecer el sistema cardiovascular. Se recomienda consultar con el médico la intensidad adecuada según el estado de salud de cada paciente.',
    imagen: ''
  },
  {
    id: 'g21', categoria: 'cuidados', icono: '📅',
    termino: 'Seguimiento Médico Continuo',
    resumen: 'Consultas regulares con endocrinología para vigilar la evolución del tratamiento.',
    detalle: 'El hipotiroidismo es una condición crónica que requiere seguimiento a largo plazo. Mantener las citas médicas programadas permite ajustar el tratamiento a tiempo, detectar complicaciones cardiovasculares tempranamente y resolver dudas sobre síntomas nuevos.',
    imagen: ''
  },

  /* ───────────── ADVERTENCIAS ───────────── */
  {
    id: 'g22', categoria: 'advertencias', icono: '🚨',
    termino: 'Dolor en el Pecho o Palpitaciones',
    resumen: 'Señal de alarma que requiere atención médica inmediata.',
    detalle: 'Si aparece dolor u opresión en el pecho, palpitaciones intensas, dificultad para respirar o hinchazón repentina en piernas, se debe buscar atención médica de urgencia, ya que pueden ser signos de complicaciones cardiovasculares graves.',
    imagen: ''
  },
  {
    id: 'g23', categoria: 'advertencias', icono: '⛔',
    termino: 'No Suspender el Tratamiento por Cuenta Propia',
    resumen: 'Dejar la levotiroxina sin indicación médica puede agravar el riesgo cardiovascular.',
    detalle: 'Interrumpir el tratamiento —incluso al sentirse mejor— puede hacer que los niveles hormonales vuelvan a descontrolarse, aumentando nuevamente el riesgo cardiovascular. Cualquier ajuste de dosis debe ser indicado únicamente por el médico tratante.',
    imagen: ''
  },
  {
    id: 'g24', categoria: 'advertencias', icono: '💊',
    termino: 'Interacciones con Otros Medicamentos',
    resumen: 'Ciertos fármacos y suplementos pueden alterar la absorción de la levotiroxina.',
    detalle: 'Suplementos de calcio y hierro, antiácidos, algunos anticonvulsivantes y ciertos alimentos pueden reducir la absorción de la levotiroxina si se toman muy cerca del medicamento. Es importante informar al médico sobre todos los medicamentos y suplementos que se están tomando.',
    imagen: ''
  },
  {
    id: 'g25', categoria: 'advertencias', icono: '🤰',
    termino: 'Atención Especial en Embarazo',
    resumen: 'El hipotiroidismo no controlado durante el embarazo requiere vigilancia estrecha.',
    detalle: 'Durante el embarazo, las necesidades de hormona tiroidea aumentan y un hipotiroidismo no controlado puede afectar tanto a la madre como al desarrollo del bebé. Se recomienda un control hormonal más frecuente y ajustes de dosis bajo supervisión médica especializada.',
    imagen: ''
  },

  /* ───────────── DIETAS ───────────── */
  {
    id: 'g26', categoria: 'dietas', icono: '🥦',
    termino: 'Alimentos Recomendados',
    resumen: 'Fibra, yodo, selenio y grasas saludables favorecen el control metabólico.',
    detalle: 'Se recomienda incluir frutas, verduras y cereales integrales ricos en fibra (favorecen el tránsito intestinal, frecuentemente lento en hipotiroidismo); pescados y frutos secos como fuente de selenio y ácidos grasos omega-3, beneficiosos para la salud tiroidea y cardiovascular; y lácteos o pescados como fuente moderada de yodo, siempre según indicación médica.',
    imagen: ''
  },
  {
    id: 'g27', categoria: 'dietas', icono: '🚫',
    termino: 'Alimentos a Moderar',
    resumen: 'Grasas saturadas, exceso de sal y alimentos ultraprocesados deben limitarse.',
    detalle: 'Conviene reducir el consumo de grasas saturadas y trans (frituras, embutidos, bollería), el exceso de sodio (por su efecto sobre la presión arterial) y los alimentos ultraprocesados. Un consumo excesivo de soja también puede interferir con la absorción de la levotiroxina si se toma cerca de la medicación.',
    imagen: ''
  },
  {
    id: 'g28', categoria: 'dietas', icono: '🍽️',
    termino: 'Control del Peso Corporal',
    resumen: 'Mantener un peso saludable reduce la carga sobre el sistema cardiovascular.',
    detalle: 'Debido al metabolismo más lento, es común que el control de peso requiera más esfuerzo. Una alimentación equilibrada, porciones adecuadas y actividad física regular ayudan a prevenir el sobrepeso, factor que se suma al riesgo cardiovascular ya elevado por el hipotiroidismo.',
    imagen: ''
  },
  {
    id: 'g29', categoria: 'dietas', icono: '💧',
    termino: 'Hidratación y Estreñimiento',
    resumen: 'Beber suficiente agua ayuda a contrarrestar el tránsito intestinal lento.',
    detalle: 'El hipotiroidismo no controlado suele enlentecer el tránsito intestinal, favoreciendo el estreñimiento. Mantener una buena hidratación junto con una dieta rica en fibra contribuye a mejorar este síntoma de forma natural.',
    imagen: ''
  },
];

let glosarioCategoriaActiva = 'todos';

/* ─── RENDER PRINCIPAL ─── */
function renderizarGlosario() {
  const chipsWrap = document.getElementById('glosarioChips');
  if (chipsWrap && chipsWrap.children.length === 0) {
    chipsWrap.innerHTML = CATEGORIAS_GLOSARIO.map(c =>
      `<div class="chip ${c.id === 'todos' ? 'active' : ''}" data-cat="${c.id}" onclick="seleccionarCategoriaGlosario('${c.id}')">${c.label}</div>`
    ).join('');
  }
  filtrarGlosario();
}

function seleccionarCategoriaGlosario(catId) {
  glosarioCategoriaActiva = catId;
  document.querySelectorAll('#glosarioChips .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === catId);
  });
  filtrarGlosario();
}

function filtrarGlosario() {
  const texto = (document.getElementById('glosarioBuscar')?.value || '').toLowerCase().trim();
  const grid = document.getElementById('glosarioGrid');
  const countEl = document.getElementById('glosarioCount');
  if (!grid) return;

  const resultados = GLOSARIO_DATOS.filter(t => {
    const coincideCategoria = glosarioCategoriaActiva === 'todos' || t.categoria === glosarioCategoriaActiva;
    const coincideTexto = !texto ||
      t.termino.toLowerCase().includes(texto) ||
      t.resumen.toLowerCase().includes(texto) ||
      t.detalle.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });

  if (countEl) countEl.textContent = `${resultados.length} término${resultados.length === 1 ? '' : 's'} encontrado${resultados.length === 1 ? '' : 's'}`;

  if (resultados.length === 0) {
    grid.innerHTML = `
      <div class="glosario-empty" style="grid-column:1/-1;">
        <span class="ge-icon">🔍</span>
        <p>No se encontraron términos con esos criterios.<br>Intenta con otra palabra o categoría.</p>
      </div>`;
    return;
  }

  grid.innerHTML = resultados.map(t => `
    <div class="glosario-card" onclick="abrirGlosarioModal('${t.id}')">
      ${t.imagen ? `<img class="g-card-img" src="${t.imagen}" alt="${t.termino}"/>` : ''}
      <div class="g-card-body">
        ${!t.imagen ? `<div class="g-icon">${t.icono}</div>` : ''}
        <span class="g-cat-badge g-cat-${t.categoria}">${etiquetaCategoria(t.categoria)}</span>
        <h4>${t.termino}</h4>
        <p>${t.resumen}</p>
      </div>
    </div>
  `).join('');
}

function etiquetaCategoria(catId) {
  const cat = CATEGORIAS_GLOSARIO.find(c => c.id === catId);
  return cat ? cat.label.replace(/^[^\s]+\s/, '') : catId;
}

/* ─── MODAL DE DETALLE ─── */
function abrirGlosarioModal(id) {
  const t = GLOSARIO_DATOS.find(x => x.id === id);
  if (!t) return;
  document.getElementById('glosarioModalTitulo').textContent = `${t.icono} ${t.termino}`;
  document.getElementById('glosarioModalContenido').innerHTML = `
    <div class="g-modal-cat">
      <span class="g-cat-badge g-cat-${t.categoria}">${etiquetaCategoria(t.categoria)}</span>
    </div>
    ${t.imagen ? `<img class="modal-glosario-img" src="${t.imagen}" alt="${t.termino}"/>` : ''}
    <p>${t.detalle}</p>
  `;
  document.getElementById('modalGlosario').classList.add('active');
}

function cerrarGlosarioModal() {
  document.getElementById('modalGlosario').classList.remove('active');
}
