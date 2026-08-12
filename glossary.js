/* ══════════════════════════════════════════════════════════
   GLOSARIO — Alfabetización Sanitaria
   Hipotiroidismo No Controlado y Riesgo Cardiovascular
   ══════════════════════════════════════════════════════════
   Cada término soporta un campo "imagen" (URL) opcional.
   Si "imagen" está vacío, la tarjeta muestra el ícono emoji.
   Para agregar una imagen a un término, pega la URL dentro de
   imagen: "https://..." en el objeto correspondiente.

   La barra de filtros se genera AUTOMÁTICAMENTE en orden
   alfabético (A, B, C, D…) según la letra inicial de cada
   "termino". No es necesario mantenerla a mano.
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
  {
    id: 'g1', categoria: 'definiciones', icono: '🦋',
    termino: 'Hipotiroidismo',
    resumen: 'Condición en la que la tiroides no produce suficiente hormona tiroidea.',
    detalle: 'El hipotiroidismo ocurre cuando la glándula tiroides —ubicada en la parte frontal del cuello— no genera suficiente cantidad de hormonas tiroideas (T3 y T4). Estas hormonas regulan el metabolismo, la temperatura corporal, la frecuencia cardíaca y la energía general del organismo. Cuando los niveles bajan, el metabolismo se enlentece y aparecen síntomas progresivos.',
    caracteristicas: ['Es una enfermedad crónica que requiere control de por vida.', 'Afecta con mayor frecuencia a mujeres mayores de 40 años.', 'Se diagnostica principalmente con exámenes de TSH y T4 libre.'],
    ejemplos: ['Una persona con cansancio constante, aumento de peso y piel seca a quien un examen de sangre confirma TSH elevada.', 'Un paciente que, tras iniciar levotiroxina, recupera su nivel de energía en pocas semanas.'],
    imagen: ''
  },
  {
    id: 'g2', categoria: 'definiciones', icono: '🧪',
    termino: 'TSH (Hormona Estimulante de la Tiroides)',
    resumen: 'Hormona que regula el funcionamiento de la tiroides; su nivel indica si hay hipotiroidismo.',
    detalle: 'La TSH es producida por la glándula hipófisis y estimula a la tiroides para que libere T3 y T4. Cuando la tiroides funciona poco, la hipófisis "compensa" liberando más TSH, por eso valores elevados de TSH suelen indicar hipotiroidismo.',
    caracteristicas: ['Rango normal habitual: 0.4 a 4.0 μU/mL (varía según laboratorio).', 'Es el primer examen que se solicita ante sospecha de hipotiroidismo.', 'Se usa también para ajustar la dosis de levotiroxina.'],
    ejemplos: ['TSH de 8.5 μU/mL → sugiere hipotiroidismo activo.', 'TSH de 2.1 μU/mL → función tiroidea dentro de lo normal.'],
    imagen: ''
  },
  {
    id: 'g3', categoria: 'definiciones', icono: '🔬',
    termino: 'T4 Libre (Tiroxina)',
    resumen: 'Principal hormona producida por la tiroides; su medición confirma el diagnóstico.',
    detalle: 'La T4 libre es la forma activa y no unida a proteínas de la tiroxina circulante en sangre. Junto con la TSH, es el examen de laboratorio más usado para diagnosticar y monitorear el hipotiroidismo.',
    caracteristicas: ['Valores bajos junto a TSH alta confirman hipotiroidismo manifiesto.', 'Se mide en ng/dL.', 'Su valor ayuda a distinguir un hipotiroidismo subclínico de uno manifiesto.'],
    ejemplos: ['T4 libre de 0.6 ng/dL con TSH elevada → hipotiroidismo manifiesto.', 'T4 libre normal con TSH ligeramente alta → posible hipotiroidismo subclínico.'],
    imagen: ''
  },
  {
    id: 'g4', categoria: 'definiciones', icono: '❤️',
    termino: 'Riesgo Cardiovascular',
    resumen: 'Probabilidad de desarrollar enfermedades del corazón y los vasos sanguíneos.',
    detalle: 'Es una estimación de la probabilidad que tiene una persona de sufrir eventos como infarto, angina, insuficiencia cardíaca o accidente cerebrovascular en un periodo determinado. En el hipotiroidismo no controlado, este riesgo aumenta por alteraciones en el colesterol, la presión arterial y la función del corazón.',
    caracteristicas: ['Se clasifica en tres niveles: bajo, moderado y alto.', 'Depende de varios factores combinados, no de uno solo.', 'Puede reducirse con tratamiento y hábitos saludables.'],
    ejemplos: ['Un paciente con colesterol alto, presión elevada e hipotiroidismo no controlado → riesgo alto.', 'Un paciente con hormonas y presión normales → riesgo bajo.'],
    imagen: ''
  },
  {
    id: 'g5', categoria: 'definiciones', icono: '🤖',
    termino: 'Neutrosofía',
    resumen: 'Enfoque matemático que maneja la incertidumbre mediante grados de verdad, falsedad e indeterminación.',
    detalle: 'A diferencia de la lógica clásica (verdadero/falso), la neutrosofía asigna a cada dato tres componentes: verdad (T), indeterminación (I) y falsedad (F). Se usa junto al Machine Learning para clasificar el riesgo cardiovascular considerando la incertidumbre propia de los datos clínicos.',
    caracteristicas: ['Los tres valores T, I y F siempre suman 1.', 'Permite representar casos "frontera" sin forzar una respuesta binaria.', 'Aporta una capa de honestidad estadística al modelo.'],
    ejemplos: ['Un paciente con score de riesgo 0.5 exacto → alta Indeterminación (I), reflejando que necesita más observación.', 'Un paciente con score 0.9 → Verdad (T) muy alta, caso claramente de riesgo alto.'],
    imagen: ''
  },
  {
    id: 'g6', categoria: 'definiciones', icono: '🥼',
    termino: 'Levotiroxina',
    resumen: 'Medicamento hormonal sintético usado como tratamiento estándar del hipotiroidismo.',
    detalle: 'La levotiroxina es una hormona tiroidea sintética idéntica a la T4 natural. Se usa para reemplazar la hormona que la tiroides no produce en cantidad suficiente. Debe tomarse todos los días, siempre a la misma hora, en ayunas.',
    caracteristicas: ['Es el tratamiento de primera línea en todo el mundo.', 'La dosis se ajusta de forma individual según peso y niveles de TSH.', 'Su efecto se evalúa con nuevos exámenes 6-8 semanas después de cada ajuste.'],
    ejemplos: ['Una persona de 70 kg puede iniciar con una dosis aproximada de 100 mcg diarios, ajustada luego según laboratorio.'],
    imagen: ''
  },

  /* ───────────── TIPOS ───────────── */
  {
    id: 'g7', categoria: 'tipos', icono: '⚠️',
    termino: 'Hipotiroidismo No Controlado',
    resumen: 'Cuando los niveles hormonales permanecen alterados a pesar del tratamiento o por falta de él.',
    detalle: 'Se considera "no controlado" cuando el paciente, con o sin tratamiento, mantiene niveles de TSH y T4 fuera del rango normal de forma persistente. Suele deberse a dosis inadecuadas, mala adherencia, interacciones con otros fármacos o alimentos, o falta de controles periódicos.',
    caracteristicas: ['Se asocia a mayor riesgo cardiovascular (hasta 2.5 veces).', 'Puede pasar desapercibido si no hay controles regulares.', 'Es reversible al ajustar correctamente el tratamiento.'],
    ejemplos: ['Un paciente que deja de tomar su medicación por varias semanas y vuelve a presentar TSH elevada.', 'Un paciente que toma calcio junto con la levotiroxina, reduciendo su absorción.'],
    imagen: ''
  },
  {
    id: 'g8', categoria: 'tipos', icono: '🩺',
    termino: 'Hipotiroidismo Subclínico',
    resumen: 'Etapa inicial con TSH elevada pero T4 libre todavía normal, casi sin síntomas.',
    detalle: 'Es una forma leve en la que los exámenes muestran una TSH ligeramente elevada mientras la T4 libre se mantiene dentro de parámetros normales. Muchas veces no genera síntomas evidentes, pero requiere seguimiento porque puede evolucionar a un hipotiroidismo manifiesto.',
    caracteristicas: ['Suele detectarse solo por exámenes de rutina.', 'También se asocia a un incremento moderado del riesgo cardiovascular.', 'No siempre requiere tratamiento inmediato, depende del criterio médico.'],
    ejemplos: ['TSH de 5.5 μU/mL con T4 libre normal en un chequeo de rutina, sin síntomas evidentes.'],
    imagen: ''
  },
  {
    id: 'g9', categoria: 'tipos', icono: '🧬',
    termino: 'Tiroiditis de Hashimoto',
    resumen: 'Enfermedad autoinmune y causa más frecuente de hipotiroidismo.',
    detalle: 'Es un trastorno en el que el propio sistema inmunológico ataca la glándula tiroides, reduciendo progresivamente su capacidad de producir hormonas. Es la causa más común de hipotiroidismo en zonas con suficiente yodo en la dieta.',
    caracteristicas: ['Se confirma con anticuerpos antitiroideos (anti-TPO) elevados.', 'Es más frecuente en mujeres y tiene componente hereditario.', 'Avanza de forma lenta y progresiva, a veces durante años.'],
    ejemplos: ['Una mujer de 35 años con antecedentes familiares de tiroiditis, TSH elevada y anti-TPO positivos.'],
    imagen: ''
  },
  {
    id: 'g10', categoria: 'tipos', icono: '🫀',
    termino: 'Dislipidemia',
    resumen: 'Alteración de los niveles de colesterol y triglicéridos en sangre.',
    detalle: 'El hipotiroidismo no controlado suele elevar el colesterol total, el colesterol LDL ("malo") y los triglicéridos, ya que las hormonas tiroideas influyen directamente en el metabolismo de las grasas. Es uno de los principales mecanismos por los que el hipotiroidismo aumenta el riesgo cardiovascular.',
    caracteristicas: ['Suele mejorar al normalizar la función tiroidea con tratamiento.', 'Se detecta con un perfil lipídico en sangre.', 'Se potencia con una dieta alta en grasas saturadas.'],
    ejemplos: ['Colesterol total de 260 mg/dL en un paciente con TSH elevada, que baja a 210 mg/dL tras 3 meses de tratamiento tiroideo.'],
    imagen: ''
  },
  {
    id: 'g11', categoria: 'tipos', icono: '📈',
    termino: 'Hipertensión Arterial',
    resumen: 'Presión arterial elevada de forma sostenida; frecuente en hipotiroidismo no controlado.',
    detalle: 'El déficit de hormonas tiroideas puede aumentar la rigidez de las arterias y la presión diastólica (el número "de abajo"). Mantener la presión arterial dentro de rangos saludables es clave para reducir el riesgo de infarto y accidente cerebrovascular.',
    caracteristicas: ['Se diagnostica con valores sostenidos ≥ 130/80 mmHg.', 'Frecuentemente no da síntomas ("el asesino silencioso").', 'Se controla con dieta baja en sodio, ejercicio y, si aplica, medicación.'],
    ejemplos: ['Un paciente con hipotiroidismo no controlado que registra presión de 145/95 mmHg en controles repetidos.'],
    imagen: ''
  },
  {
    id: 'g12', categoria: 'tipos', icono: '💔',
    termino: 'Insuficiencia Cardíaca',
    resumen: 'El corazón pierde eficiencia para bombear sangre; complicación posible en casos severos.',
    detalle: 'En casos de hipotiroidismo severo y prolongado sin tratamiento, el corazón puede debilitarse y perder capacidad de bombeo eficiente, generando fatiga, hinchazón en piernas y dificultad para respirar.',
    caracteristicas: ['Es una de las complicaciones más graves del hipotiroidismo no tratado.', 'Se manifiesta con hinchazón, fatiga y falta de aire.', 'Requiere atención médica especializada y urgente.'],
    ejemplos: ['Un paciente con hipotiroidismo de varios años sin tratamiento que desarrolla hinchazón en piernas y dificultad para respirar al caminar.'],
    imagen: ''
  },

  /* ───────────── CARACTERÍSTICAS (síntomas) ───────────── */
  {
    id: 'g13', categoria: 'caracteristicas', icono: '😴',
    termino: 'Fatiga y Cansancio Persistente',
    resumen: 'Uno de los síntomas más comunes y tempranos del hipotiroidismo.',
    detalle: 'La disminución del metabolismo provoca una sensación de agotamiento incluso después de dormir bien. Suele acompañarse de dificultad para concentrarse ("niebla mental") y menor tolerancia al esfuerzo físico.',
    caracteristicas: ['Persiste aunque la persona duerma las horas recomendadas.', 'Suele mejorar semanas después de iniciar tratamiento.', 'Puede confundirse con estrés o depresión si no se investiga.'],
    ejemplos: ['Una persona que se siente exhausta todo el día pese a dormir 8 horas, hasta que un examen revela hipotiroidismo.'],
    imagen: ''
  },
  {
    id: 'g14', categoria: 'caracteristicas', icono: '⚖️',
    termino: 'Aumento de Peso',
    resumen: 'Ganancia de peso a pesar de mantener hábitos alimenticios similares.',
    detalle: 'Al enlentecerse el metabolismo, el cuerpo quema menos calorías en reposo. Es frecuente que los pacientes noten un aumento de peso moderado que resulta difícil de revertir solo con dieta, hasta que se corrigen los niveles hormonales.',
    caracteristicas: ['Generalmente es un aumento moderado (no extremo).', 'Se acompaña de retención de líquidos en algunos casos.', 'Suele estabilizarse una vez controlada la tiroides.'],
    ejemplos: ['Una persona que sube 4-5 kg en pocos meses sin cambios notorios en su dieta o actividad física.'],
    imagen: ''
  },
  {
    id: 'g15', categoria: 'caracteristicas', icono: '🥶',
    termino: 'Intolerancia al Frío',
    resumen: 'Sensación de frío constante, incluso en ambientes templados.',
    detalle: 'La reducción del metabolismo basal disminuye la producción de calor corporal, por lo que muchos pacientes sienten frío en manos y pies o necesitan abrigarse más de lo habitual.',
    caracteristicas: ['Afecta principalmente manos, pies y punta de la nariz.', 'Puede notarse incluso en climas cálidos.', 'Mejora progresivamente con el tratamiento.'],
    ejemplos: ['Una persona que necesita usar suéter en una habitación donde el resto de las personas están cómodas.'],
    imagen: ''
  },
  {
    id: 'g16', categoria: 'caracteristicas', icono: '💇',
    termino: 'Piel Seca y Caída de Cabello',
    resumen: 'Cambios visibles en piel, cabello y uñas asociados al déficit hormonal.',
    detalle: 'La piel puede volverse seca, áspera y pálida; el cabello más quebradizo y con mayor caída de lo habitual; las uñas quebradizas. Estos cambios suelen mejorar progresivamente al normalizar los niveles hormonales.',
    caracteristicas: ['Suele notarse primero en codos, rodillas y talones.', 'La caída de cabello es difusa, no en parches.', 'Revierte varios meses después de iniciado el tratamiento.'],
    ejemplos: ['Una persona que nota su cabello más delgado y su piel más áspera de lo habitual en pocos meses.'],
    imagen: ''
  },
  {
    id: 'g17', categoria: 'caracteristicas', icono: '💓',
    termino: 'Bradicardia (Pulso Lento)',
    resumen: 'Frecuencia cardíaca más lenta de lo normal, signo de alerta cardiovascular.',
    detalle: 'El déficit de hormonas tiroideas puede reducir la frecuencia cardíaca en reposo. Aunque no siempre genera síntomas, es un signo que el equipo médico evalúa junto con otros parámetros para valorar el riesgo cardiovascular global.',
    caracteristicas: ['Se considera bradicardia un pulso menor a 60 latidos por minuto.', 'Puede detectarse en un examen físico de rutina.', 'Se revisa junto a un electrocardiograma si hay otros síntomas.'],
    ejemplos: ['Un paciente con hipotiroidismo cuyo pulso en reposo es de 52 latidos por minuto.'],
    imagen: ''
  },

  /* ───────────── CUIDADOS ───────────── */
  {
    id: 'g18', categoria: 'cuidados', icono: '⏰',
    termino: 'Tomar la Medicación en Ayunas',
    resumen: 'La levotiroxina se absorbe mejor con el estómago vacío, siempre a la misma hora.',
    detalle: 'Se recomienda tomar la levotiroxina en ayunas, 30 a 60 minutos antes del desayuno, y siempre a la misma hora todos los días. El calcio, el hierro, los antiácidos y algunos alimentos pueden interferir con su absorción.',
    caracteristicas: ['Debe espaciarse al menos 4 horas de calcio, hierro o antiácidos.', 'La constancia horaria mejora la estabilidad de los niveles hormonales.', 'No debe tomarse junto con café, según algunos estudios reduce su absorción.'],
    ejemplos: ['Tomar la pastilla a las 6:30 a.m. con agua, y desayunar recién a las 7:15 a.m.'],
    imagen: ''
  },
  {
    id: 'g19', categoria: 'cuidados', icono: '🩸',
    termino: 'Control Periódico de TSH',
    resumen: 'Exámenes de laboratorio regulares para ajustar la dosis del tratamiento.',
    detalle: 'Los controles de TSH permiten al médico verificar que la dosis de levotiroxina sea la adecuada. Generalmente se solicitan cada 6 a 8 semanas tras un cambio de dosis, y luego cada 6 a 12 meses una vez que los niveles están estables.',
    caracteristicas: ['Evita tanto el sub-tratamiento como el sobre-tratamiento.', 'Se recomienda mantener un registro histórico de resultados.', 'Debe repetirse ante cualquier síntoma nuevo o cambio de peso importante.'],
    ejemplos: ['Un paciente que se realiza TSH cada 8 semanas hasta estabilizar su dosis, y luego cada 6 meses.'],
    imagen: ''
  },
  {
    id: 'g20', categoria: 'cuidados', icono: '🚶',
    termino: 'Actividad Física Moderada',
    resumen: 'El ejercicio regular ayuda a controlar el peso y protege la salud cardiovascular.',
    detalle: 'Caminar, nadar o realizar ejercicio aeróbico moderado de forma regular contribuye a mejorar el metabolismo, controlar el peso corporal, reducir la presión arterial y fortalecer el sistema cardiovascular.',
    caracteristicas: ['Se recomienda consultar la intensidad adecuada con el médico.', 'Ayuda también a mejorar el estado de ánimo y la energía.', '150 minutos semanales de actividad moderada es una meta común.'],
    ejemplos: ['Caminar 30 minutos, 5 veces por semana, a paso constante.'],
    imagen: ''
  },
  {
    id: 'g21', categoria: 'cuidados', icono: '📅',
    termino: 'Seguimiento Médico Continuo',
    resumen: 'Consultas regulares con endocrinología para vigilar la evolución del tratamiento.',
    detalle: 'El hipotiroidismo es una condición crónica que requiere seguimiento a largo plazo. Mantener las citas médicas programadas permite ajustar el tratamiento a tiempo y detectar complicaciones cardiovasculares tempranamente.',
    caracteristicas: ['Idealmente con endocrinología o medicina interna.', 'Incluye revisión de peso, presión arterial y síntomas nuevos.', 'Es clave para resolver dudas y ajustar dosis a tiempo.'],
    ejemplos: ['Una cita de control cada 6 meses una vez que el tratamiento está estable.'],
    imagen: ''
  },

  /* ───────────── ADVERTENCIAS ───────────── */
  {
    id: 'g22', categoria: 'advertencias', icono: '🚨',
    termino: 'Dolor en el Pecho o Palpitaciones',
    resumen: 'Señal de alarma que requiere atención médica inmediata.',
    detalle: 'Si aparece dolor u opresión en el pecho, palpitaciones intensas, dificultad para respirar o hinchazón repentina en piernas, se debe buscar atención médica de urgencia, ya que pueden ser signos de complicaciones cardiovasculares graves.',
    caracteristicas: ['No debe esperarse a la siguiente cita programada.', 'Puede acompañarse de mareo, sudoración fría o desmayo.', 'Ante la duda, siempre es mejor acudir a un servicio de urgencias.'],
    ejemplos: ['Un paciente que siente opresión en el pecho al subir escaleras y decide acudir de inmediato a emergencias.'],
    imagen: ''
  },
  {
    id: 'g23', categoria: 'advertencias', icono: '⛔',
    termino: 'No Suspender el Tratamiento por Cuenta Propia',
    resumen: 'Dejar la levotiroxina sin indicación médica puede agravar el riesgo cardiovascular.',
    detalle: 'Interrumpir el tratamiento —incluso al sentirse mejor— puede hacer que los niveles hormonales vuelvan a descontrolarse, aumentando nuevamente el riesgo cardiovascular. Cualquier ajuste de dosis debe ser indicado únicamente por el médico tratante.',
    caracteristicas: ['Sentirse mejor no significa estar curado, es una enfermedad crónica.', 'Suspender el tratamiento revierte los beneficios logrados.', 'Cualquier cambio debe consultarse antes con el médico.'],
    ejemplos: ['Un paciente que deja la pastilla por sentirse bien y, dos meses después, vuelve a tener TSH elevada.'],
    imagen: ''
  },
  {
    id: 'g24', categoria: 'advertencias', icono: '💊',
    termino: 'Interacciones con Otros Medicamentos',
    resumen: 'Ciertos fármacos y suplementos pueden alterar la absorción de la levotiroxina.',
    detalle: 'Suplementos de calcio y hierro, antiácidos, algunos anticonvulsivantes y ciertos alimentos pueden reducir la absorción de la levotiroxina si se toman muy cerca del medicamento. Es importante informar al médico sobre todo lo que se está tomando.',
    caracteristicas: ['Espaciar al menos 4 horas de calcio o hierro.', 'Informar siempre al médico sobre suplementos naturales.', 'Revisar interacciones al iniciar cualquier medicamento nuevo.'],
    ejemplos: ['Tomar un suplemento de calcio en el almuerzo, lejos de la levotiroxina que se tomó en ayunas.'],
    imagen: ''
  },
  {
    id: 'g25', categoria: 'advertencias', icono: '🤰',
    termino: 'Atención Especial en Embarazo',
    resumen: 'El hipotiroidismo no controlado durante el embarazo requiere vigilancia estrecha.',
    detalle: 'Durante el embarazo, las necesidades de hormona tiroidea aumentan y un hipotiroidismo no controlado puede afectar tanto a la madre como al desarrollo del bebé. Se recomienda un control hormonal más frecuente bajo supervisión médica especializada.',
    caracteristicas: ['La dosis de levotiroxina suele necesitar ajuste durante el embarazo.', 'Requiere control de TSH más frecuente que en la población general.', 'Debe ser manejado junto con el obstetra y el endocrinólogo.'],
    ejemplos: ['Una mujer embarazada con hipotiroidismo previo a quien se le aumenta la dosis de levotiroxina en el primer trimestre.'],
    imagen: ''
  },

  /* ───────────── DIETAS ───────────── */
  {
    id: 'g26', categoria: 'dietas', icono: '🥦',
    termino: 'Alimentos Recomendados',
    resumen: 'Fibra, yodo, selenio y grasas saludables favorecen el control metabólico.',
    detalle: 'Se recomienda incluir frutas, verduras y cereales integrales ricos en fibra; pescados y frutos secos como fuente de selenio y ácidos grasos omega-3; y lácteos o pescados como fuente moderada de yodo, siempre según indicación médica.',
    caracteristicas: ['La fibra ayuda contra el estreñimiento típico del hipotiroidismo.', 'El selenio y el yodo participan en la producción hormonal.', 'Las porciones deben adaptarse a cada paciente.'],
    ejemplos: ['Incluir nueces, pescado azul dos veces por semana y abundantes vegetales en las comidas.'],
    imagen: ''
  },
  {
    id: 'g27', categoria: 'dietas', icono: '🚫',
    termino: 'Alimentos a Moderar',
    resumen: 'Grasas saturadas, exceso de sal y alimentos ultraprocesados deben limitarse.',
    detalle: 'Conviene reducir el consumo de grasas saturadas y trans, el exceso de sodio (por su efecto sobre la presión arterial) y los alimentos ultraprocesados. Un consumo excesivo de soja también puede interferir con la absorción de la levotiroxina.',
    caracteristicas: ['Las frituras y embutidos elevan el colesterol LDL.', 'El exceso de sal se asocia a hipertensión.', 'La soja en exceso, cerca de la medicación, reduce su absorción.'],
    ejemplos: ['Evitar tomar leche de soja justo después de la levotiroxina; esperar al menos 4 horas.'],
    imagen: ''
  },
  {
    id: 'g28', categoria: 'dietas', icono: '🍽️',
    termino: 'Control del Peso Corporal',
    resumen: 'Mantener un peso saludable reduce la carga sobre el sistema cardiovascular.',
    detalle: 'Debido al metabolismo más lento, es común que el control de peso requiera más esfuerzo. Una alimentación equilibrada, porciones adecuadas y actividad física regular ayudan a prevenir el sobrepeso, factor que se suma al riesgo cardiovascular ya elevado.',
    caracteristicas: ['El IMC es el indicador más usado para monitorear el peso.', 'Los cambios deben ser graduales, no dietas extremas.', 'Se recomienda acompañamiento nutricional si hay sobrepeso marcado.'],
    ejemplos: ['Un paciente que, junto con su tratamiento hormonal, baja su IMC de 29 a 25 en 6 meses con dieta y ejercicio.'],
    imagen: ''
  },
  {
    id: 'g29', categoria: 'dietas', icono: '💧',
    termino: 'Hidratación y Estreñimiento',
    resumen: 'Beber suficiente agua ayuda a contrarrestar el tránsito intestinal lento.',
    detalle: 'El hipotiroidismo no controlado suele enlentecer el tránsito intestinal, favoreciendo el estreñimiento. Mantener una buena hidratación junto con una dieta rica en fibra contribuye a mejorar este síntoma de forma natural.',
    caracteristicas: ['Se recomienda alrededor de 2 litros de agua al día (según indicación médica).', 'La fibra sin suficiente agua puede empeorar el estreñimiento.', 'Mejora habitualmente al normalizar la función tiroidea.'],
    ejemplos: ['Aumentar el consumo de agua y agregar avena o frutas con cáscara al desayuno.'],
    imagen: ''
  },
  {
    id: 'g30', categoria: 'definiciones', icono: '🔄',
    termino: 'Arritmia Cardíaca',
    resumen: 'Alteración del ritmo normal del corazón.',
    detalle: 'Una arritmia cardíaca ocurre cuando el corazón late de manera demasiado rápida, demasiado lenta o de forma irregular. Puede tener múltiples causas y, en personas con alteraciones tiroideas, debe valorarse junto con la función tiroidea y otros factores cardiovasculares.',
    caracteristicas: ['Puede manifestarse como latidos irregulares, rápidos o lentos.', 'Algunas arritmias pueden no producir síntomas.', 'Requiere valoración médica cuando es persistente o se acompaña de dolor en el pecho, desmayo o dificultad para respirar.'],
    ejemplos: ['Una persona que percibe latidos irregulares y presenta mareo debe ser evaluada por un profesional de salud.'],
    imagen: ''
  },
  {
    id: 'g31', categoria: 'definiciones', icono: '🫀',
    termino: 'Aterosclerosis',
    resumen: 'Acumulación de grasas y otras sustancias en las paredes de las arterias.',
    detalle: 'La aterosclerosis es un proceso progresivo en el que se forman placas dentro de las arterias. Puede disminuir el flujo sanguíneo y aumentar el riesgo de enfermedad coronaria, infarto y accidente cerebrovascular. El hipotiroidismo puede favorecer alteraciones del perfil lipídico que contribuyen al riesgo cardiovascular.',
    caracteristicas: ['Puede avanzar durante años sin síntomas evidentes.', 'Está relacionada con factores como colesterol LDL elevado, hipertensión, tabaquismo y diabetes.', 'Su prevención requiere controlar los factores de riesgo cardiovascular.'],
    ejemplos: ['Una persona con LDL elevado, hipertensión y tabaquismo puede presentar mayor riesgo de desarrollar aterosclerosis.'],
    imagen: ''
  },
  {
    id: 'g32', categoria: 'definiciones', icono: '🧈',
    termino: 'Colesterol',
    resumen: 'Sustancia grasa necesaria para el organismo que, en exceso, puede aumentar el riesgo cardiovascular.',
    detalle: 'El colesterol participa en funciones importantes del organismo, pero concentraciones elevadas en la sangre, especialmente de LDL, pueden favorecer la formación de placas en las arterias. El hipotiroidismo puede asociarse con elevación del colesterol.',
    caracteristicas: ['Forma parte del perfil lipídico.', 'El colesterol LDL elevado se relaciona con mayor riesgo de aterosclerosis.', 'Debe interpretarse junto con otros factores de riesgo cardiovascular.'],
    ejemplos: ['Un paciente con hipotiroidismo no controlado puede presentar colesterol elevado en un análisis de sangre.'],
    imagen: ''
  },
  {
    id: 'g33', categoria: 'definiciones', icono: '🛡️',
    termino: 'Colesterol HDL',
    resumen: 'Lipoproteína de alta densidad que participa en el transporte del colesterol hacia el hígado.',
    detalle: 'El HDL forma parte del perfil lipídico y participa en el transporte reverso del colesterol. Su valor se interpreta junto con LDL, triglicéridos, colesterol total y el resto de los factores de riesgo cardiovascular.',
    caracteristicas: ['Se conoce habitualmente como colesterol HDL.', 'Forma parte del perfil lipídico.', 'Un HDL bajo puede asociarse con mayor riesgo cardiovascular en determinados contextos.'],
    ejemplos: ['El médico puede revisar el HDL junto con LDL y triglicéridos para valorar el perfil cardiovascular de un paciente.'],
    imagen: ''
  },
  {
    id: 'g34', categoria: 'definiciones', icono: '🧬',
    termino: 'Colesterol LDL',
    resumen: 'Lipoproteína de baja densidad que transporta colesterol hacia los tejidos.',
    detalle: 'El LDL transporta colesterol por la sangre y, cuando se encuentra elevado, puede favorecer la acumulación de colesterol en las paredes arteriales y aumentar el riesgo de enfermedad cardiovascular. El hipotiroidismo puede contribuir a su elevación.',
    caracteristicas: ['Es uno de los principales parámetros del perfil lipídico.', 'Los niveles elevados se relacionan con mayor riesgo de aterosclerosis.', 'Su interpretación depende del riesgo cardiovascular global de cada persona.'],
    ejemplos: ['Un paciente con hipotiroidismo no controlado puede presentar LDL elevado y necesitar evaluación médica de sus factores de riesgo.'],
    imagen: ''
  },
  {
    id: 'g35', categoria: 'cuidados', icono: '🩺',
    termino: 'Control Tiroideo',
    resumen: 'Seguimiento de la función de la tiroides mediante evaluación clínica y pruebas de laboratorio.',
    detalle: 'El control tiroideo permite comprobar si el tratamiento está logrando una adecuada regulación de la función tiroidea. Habitualmente incluye la valoración de TSH y, según el caso, T4 libre y otros estudios.',
    caracteristicas: ['Permite valorar la respuesta al tratamiento.', 'La frecuencia de los controles depende de la situación clínica.', 'Ayuda a prevenir las consecuencias de un hipotiroidismo persistentemente descontrolado.'],
    ejemplos: ['Una persona que recibe levotiroxina realiza controles de TSH según la indicación de su médico.'],
    imagen: ''
  },
  {
    id: 'g36', categoria: 'caracteristicas', icono: '😮‍💨',
    termino: 'Disnea',
    resumen: 'Sensación de dificultad o falta de aire.',
    detalle: 'La disnea puede tener causas cardiovasculares, respiratorias, metabólicas u otras. En una persona con hipotiroidismo debe valorarse clínicamente y no atribuirse automáticamente a la alteración tiroidea.',
    caracteristicas: ['Puede aparecer durante el esfuerzo o incluso en reposo.', 'Puede acompañar a enfermedades cardiovasculares o respiratorias.', 'Si es intensa, súbita o se acompaña de dolor en el pecho, requiere atención urgente.'],
    ejemplos: ['Una persona que presenta falta de aire al realizar actividades habituales debe consultar para determinar su causa.'],
    imagen: ''
  },
  {
    id: 'g37', categoria: 'definiciones', icono: '❤️',
    termino: 'Enfermedad Cardiovascular',
    resumen: 'Conjunto de enfermedades que afectan al corazón y los vasos sanguíneos.',
    detalle: 'Las enfermedades cardiovasculares incluyen afecciones como enfermedad coronaria, accidente cerebrovascular, insuficiencia cardíaca y otras alteraciones del corazón y la circulación. El riesgo aumenta cuando se acumulan factores como hipertensión, colesterol elevado, diabetes, tabaquismo y sedentarismo.',
    caracteristicas: ['Puede afectar al corazón, arterias y otros vasos sanguíneos.', 'Tiene múltiples factores de riesgo modificables y no modificables.', 'La prevención incluye controlar los factores de riesgo y mantener hábitos saludables.'],
    ejemplos: ['La enfermedad coronaria y el accidente cerebrovascular son ejemplos de enfermedades cardiovasculares.'],
    imagen: ''
  },
  {
    id: 'g38', categoria: 'definiciones', icono: '🫀',
    termino: 'Enfermedad Coronaria',
    resumen: 'Enfermedad que afecta las arterias que suministran sangre al músculo cardíaco.',
    detalle: 'La enfermedad coronaria suele relacionarse con la acumulación de placas ateroscleróticas en las arterias coronarias. Puede reducir el aporte de oxígeno al corazón y producir angina o infarto de miocardio.',
    caracteristicas: ['Puede estar relacionada con aterosclerosis.', 'El colesterol LDL elevado es un factor de riesgo importante.', 'Puede prevenirse o reducirse mediante el control de factores de riesgo.'],
    ejemplos: ['Una persona con enfermedad coronaria puede presentar dolor u opresión en el pecho durante el esfuerzo.'],
    imagen: ''
  },
  {
    id: 'g39', categoria: 'definiciones', icono: '⚠️',
    termino: 'Factores de Riesgo Cardiovascular',
    resumen: 'Características, condiciones o hábitos que aumentan la probabilidad de enfermedad cardiovascular.',
    detalle: 'Los factores de riesgo cardiovascular pueden ser modificables o no modificables. Entre los modificables se encuentran hipertensión, colesterol elevado, tabaquismo, diabetes, sedentarismo y obesidad, mientras que la edad y algunos antecedentes familiares no pueden modificarse.',
    caracteristicas: ['El riesgo depende de la combinación de varios factores.', 'Algunos pueden reducirse mediante tratamiento y cambios de estilo de vida.', 'La valoración debe ser individualizada.'],
    ejemplos: ['Una persona con hipertensión, LDL elevado, obesidad y sedentarismo acumula varios factores de riesgo cardiovascular.'],
    imagen: ''
  },
  {
    id: 'g40', categoria: 'definiciones', icono: '🍬',
    termino: 'Glucosa en Sangre',
    resumen: 'Cantidad de glucosa presente en la sangre.',
    detalle: 'La glucosa es una fuente importante de energía para el organismo. Su medición permite detectar alteraciones del metabolismo y contribuye a valorar factores relacionados con el riesgo cardiovascular, especialmente cuando existe diabetes o prediabetes.',
    caracteristicas: ['Puede medirse en ayunas o mediante otras pruebas según el objetivo clínico.', 'Los valores persistentemente elevados requieren evaluación médica.', 'La diabetes constituye un importante factor de riesgo cardiovascular.'],
    ejemplos: ['El médico puede solicitar glucosa en ayunas como parte de una evaluación metabólica y cardiovascular.'],
    imagen: ''
  },
  {
    id: 'g41', categoria: 'definiciones', icono: '🦋',
    termino: 'Glándula Tiroides',
    resumen: 'Órgano ubicado en la parte anterior del cuello que produce hormonas tiroideas.',
    detalle: 'La glándula tiroides produce principalmente tiroxina (T4) y triyodotironina (T3), hormonas que participan en la regulación del metabolismo y diversas funciones del organismo, incluida la función cardiovascular.',
    caracteristicas: ['Está ubicada en la parte anterior del cuello.', 'Produce principalmente T4 y T3.', 'Su funcionamiento está regulado en gran medida por la TSH.'],
    ejemplos: ['Cuando la glándula tiroides produce menos hormonas de las necesarias puede desarrollarse hipotiroidismo.'],
    imagen: ''
  },
  {
    id: 'g42', categoria: 'advertencias', icono: '💔',
    termino: 'Infarto Agudo de Miocardio',
    resumen: 'Daño del músculo cardíaco causado por una interrupción importante del flujo sanguíneo.',
    detalle: 'El infarto agudo de miocardio ocurre cuando el flujo sanguíneo hacia una parte del músculo cardíaco se bloquea o reduce de forma importante. Es una emergencia médica y suele estar relacionado con enfermedad de las arterias coronarias.',
    caracteristicas: ['Puede producir presión, dolor u opresión en el pecho.', 'Puede acompañarse de dificultad para respirar, sudoración, náuseas o malestar.', 'Requiere atención médica de emergencia.'],
    ejemplos: ['Una persona con dolor intenso u opresión persistente en el pecho debe solicitar atención de emergencia.'],
    imagen: ''
  },
  {
    id: 'g43', categoria: 'definiciones', icono: '💉',
    termino: 'Resistencia a la Insulina',
    resumen: 'Disminución de la respuesta de las células a la acción de la insulina.',
    detalle: 'La resistencia a la insulina ocurre cuando las células responden de manera menos eficaz a la insulina. Se relaciona con obesidad, alteraciones metabólicas y un mayor riesgo de desarrollar diabetes tipo 2 y enfermedad cardiovascular.',
    caracteristicas: ['Puede asociarse con exceso de grasa abdominal.', 'Puede coexistir con alteraciones de glucosa y lípidos.', 'Forma parte de procesos metabólicos relacionados con el riesgo cardiovascular.'],
    ejemplos: ['Una persona con obesidad abdominal y alteraciones de glucosa puede requerir evaluación metabólica por posible resistencia a la insulina.'],
    imagen: ''
  },
  {
    id: 'g44', categoria: 'definiciones', icono: '📊',
    termino: 'Síndrome Metabólico',
    resumen: 'Conjunto de alteraciones metabólicas que aumenta el riesgo de enfermedad cardiovascular y diabetes tipo 2.',
    detalle: 'El síndrome metabólico se caracteriza por la presencia conjunta de factores como obesidad abdominal, presión arterial elevada, glucosa elevada, triglicéridos elevados y HDL bajo. La evaluación depende de criterios clínicos establecidos.',
    caracteristicas: ['Agrupa varios factores de riesgo en una misma persona.', 'Se relaciona con mayor riesgo cardiovascular.', 'El control del peso, la actividad física y otros factores modificables es importante.'],
    ejemplos: ['Una persona con obesidad abdominal, hipertensión, triglicéridos elevados y HDL bajo presenta varios componentes del síndrome metabólico.'],
    imagen: ''
  },
  {
    id: 'g45', categoria: 'definiciones', icono: '💓',
    termino: 'Miocardio',
    resumen: 'Tejido muscular que forma la mayor parte de la pared del corazón.',
    detalle: 'El miocardio es el músculo encargado de contraerse para impulsar la sangre. Necesita un suministro adecuado de oxígeno y nutrientes a través de las arterias coronarias.',
    caracteristicas: ['Es el principal tejido muscular del corazón.', 'Su contracción permite el bombeo de sangre.', 'Puede sufrir daño cuando se interrumpe el suministro de sangre.'],
    ejemplos: ['Durante un infarto agudo de miocardio, una parte del músculo cardíaco puede sufrir daño por falta de oxígeno.'],
    imagen: ''
  },
  {
    id: 'g46', categoria: 'definiciones', icono: '🔵',
    termino: 'Nódulo Tiroideo',
    resumen: 'Crecimiento o lesión localizada dentro de la glándula tiroides.',
    detalle: 'Un nódulo tiroideo es una alteración estructural localizada en la tiroides. La mayoría son benignos, pero algunos requieren estudios adicionales para determinar su naturaleza. La presencia de un nódulo no significa necesariamente que exista hipotiroidismo.',
    caracteristicas: ['Puede ser único o múltiple.', 'Puede detectarse durante una exploración o mediante ecografía.', 'Algunos requieren seguimiento o estudios complementarios.'],
    ejemplos: ['Durante una evaluación del cuello se detecta un nódulo tiroideo y el médico solicita una ecografía.'],
    imagen: ''
  },
  {
    id: 'g47', categoria: 'definiciones', icono: '⚖️',
    termino: 'Obesidad',
    resumen: 'Enfermedad crónica caracterizada por una acumulación excesiva de tejido adiposo que puede afectar la salud.',
    detalle: 'La obesidad se asocia con mayor probabilidad de hipertensión, alteraciones de lípidos, diabetes tipo 2 y enfermedad cardiovascular. En personas con hipotiroidismo, el control de la función tiroidea forma parte de una evaluación integral del peso.',
    caracteristicas: ['Es un factor de riesgo cardiovascular modificable.', 'Puede coexistir con hipertensión, dislipidemia y alteraciones de glucosa.', 'Su manejo debe ser individualizado y sostenible.'],
    ejemplos: ['Una persona con obesidad, hipertensión y LDL elevado puede beneficiarse de una intervención integral para reducir su riesgo cardiovascular.'],
    imagen: ''
  },
  {
    id: 'g48', categoria: 'definiciones', icono: '🧪',
    termino: 'Perfil Lipídico',
    resumen: 'Conjunto de análisis que permite evaluar las principales grasas presentes en la sangre.',
    detalle: 'El perfil lipídico suele incluir colesterol total, colesterol LDL, colesterol HDL y triglicéridos. Es especialmente útil para valorar alteraciones metabólicas y factores relacionados con el riesgo cardiovascular.',
    caracteristicas: ['Permite evaluar diferentes componentes de las grasas sanguíneas.', 'Puede ayudar a identificar dislipidemias.', 'Debe interpretarse junto con el contexto clínico y otros factores de riesgo.'],
    ejemplos: ['El médico solicita un perfil lipídico a un paciente con hipotiroidismo para valorar colesterol y triglicéridos.'],
    imagen: ''
  },
  {
    id: 'g49', categoria: 'definiciones', icono: '🩸',
    termino: 'Presión Arterial',
    resumen: 'Fuerza que ejerce la sangre contra las paredes de las arterias.',
    detalle: 'La presión arterial se expresa mediante dos valores: sistólico y diastólico. Su medición es fundamental para identificar hipertensión y valorar el riesgo cardiovascular.',
    caracteristicas: ['Se expresa en milímetros de mercurio (mmHg).', 'Los valores deben interpretarse según las guías y el contexto clínico.', 'La medición correcta requiere condiciones adecuadas y, en muchos casos, controles repetidos.'],
    ejemplos: ['Una persona puede medir su presión arterial en diferentes días para aportar información útil al profesional de salud.'],
    imagen: ''
  },
  {
    id: 'g50', categoria: 'definiciones', icono: '🦋',
    termino: 'Triyodotironina (T3)',
    resumen: 'Hormona tiroidea que participa en la regulación del metabolismo y diversas funciones del organismo.',
    detalle: 'La T3 es una hormona tiroidea biológicamente activa. Una parte se produce directamente en la tiroides y otra se forma a partir de T4 en diferentes tejidos. Participa en procesos metabólicos y cardiovasculares.',
    caracteristicas: ['Es una de las principales hormonas tiroideas.', 'Tiene mayor actividad biológica que la T4.', 'Su interpretación clínica depende del contexto y de otras pruebas tiroideas.'],
    ejemplos: ['La T3 forma parte del sistema hormonal que ayuda a regular el metabolismo del organismo.'],
    imagen: ''
  },
  {
    id: 'g51', categoria: 'definiciones', icono: '🧈',
    termino: 'Triglicéridos',
    resumen: 'Tipo de grasa presente en la sangre que el organismo utiliza y almacena como fuente de energía.',
    detalle: 'Los triglicéridos son un tipo de lípido sanguíneo. Cuando se encuentran elevados pueden formar parte de un perfil metabólico asociado con mayor riesgo cardiovascular, especialmente cuando coexisten con otras alteraciones.',
    caracteristicas: ['Forman parte del perfil lipídico.', 'Pueden aumentar por diferentes causas, incluida la alimentación y determinadas condiciones metabólicas.', 'Deben interpretarse junto con colesterol y otros factores de riesgo.'],
    ejemplos: ['Un paciente con alteraciones metabólicas puede presentar triglicéridos elevados en su perfil lipídico.'],
    imagen: ''
  },
  {
    id: 'g52', categoria: 'definiciones', icono: '🩻',
    termino: 'Ultrasonido Tiroideo',
    resumen: 'Estudio de imagen que utiliza ondas sonoras para observar la estructura de la glándula tiroides.',
    detalle: 'El ultrasonido tiroideo permite evaluar la estructura de la tiroides y detectar nódulos, quistes u otras alteraciones. Es una prueba estructural y no determina por sí sola si existe hipotiroidismo funcional.',
    caracteristicas: ['No utiliza radiación ionizante.', 'Permite estudiar el tamaño y la estructura de la glándula.', 'Puede utilizarse para caracterizar nódulos tiroideos.'],
    ejemplos: ['Ante la presencia de un nódulo en el cuello, el médico puede solicitar un ultrasonido tiroideo.'],
    imagen: ''
  },
  {
    id: 'g53', categoria: 'definiciones', icono: '🩸',
    termino: 'Vasos Sanguíneos',
    resumen: 'Conductos que transportan la sangre por todo el organismo.',
    detalle: 'Los vasos sanguíneos incluyen arterias, venas y capilares. Su funcionamiento adecuado es fundamental para llevar oxígeno y nutrientes a los tejidos y retirar productos de desecho.',
    caracteristicas: ['Las arterias llevan sangre desde el corazón hacia los tejidos.', 'Las venas retornan la sangre hacia el corazón.', 'Los capilares permiten el intercambio de sustancias entre la sangre y los tejidos.'],
    ejemplos: ['La aterosclerosis puede afectar las arterias y reducir el flujo sanguíneo hacia determinados tejidos.'],
    imagen: ''
  },
  {
    id: 'g54', categoria: 'definiciones', icono: '🧂',
    termino: 'Yodo',
    resumen: 'Mineral esencial que la glándula tiroides utiliza para producir hormonas tiroideas.',
    detalle: 'El yodo es necesario para la síntesis de las hormonas tiroideas. Tanto una ingesta insuficiente como un exceso de yodo pueden afectar la función tiroidea en determinadas circunstancias.',
    caracteristicas: ['Es necesario para producir T3 y T4.', 'La cantidad adecuada depende de las necesidades individuales.', 'No se recomienda consumir suplementos de yodo sin indicación profesional.'],
    ejemplos: ['La alimentación puede aportar yodo mediante alimentos como pescados y lácteos, dependiendo de la dieta y de las recomendaciones sanitarias.'],
    imagen: ''
  },
];

let glosarioLetraActiva = 'todos';

/* ─── UTILIDADES ─── */
function normalizarTexto(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function primeraLetra(termino) {
  return normalizarTexto(termino).trim().charAt(0).toUpperCase();
}
function etiquetaCategoria(catId) {
  return (CATEGORIAS_GLOSARIO[catId] || catId).replace(/^[^\s]+\s/, '');
}

/* ─── RENDER PRINCIPAL ─── */
function renderizarGlosario() {
  construirBarraAlfabetica();
  filtrarGlosario();
}

/** Genera la barra de chips A-Z automáticamente según las letras disponibles */
function construirBarraAlfabetica() {
  const chipsWrap = document.getElementById('glosarioChips');
  if (!chipsWrap) return;

  const letrasDisponibles = new Set(GLOSARIO_DATOS.map(t => primeraLetra(t.termino)));
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  let html = `<div class="chip active" data-letra="todos" onclick="seleccionarLetraGlosario('todos')">Todos</div>`;
  html += alfabeto.map(letra => {
    const disponible = letrasDisponibles.has(letra);
    return `<div class="chip chip-letra ${disponible ? '' : 'disabled'}" data-letra="${letra}" onclick="${disponible ? `seleccionarLetraGlosario('${letra}')` : ''}">${letra}</div>`;
  }).join('');

  chipsWrap.innerHTML = html;
}

function seleccionarLetraGlosario(letra) {
  glosarioLetraActiva = letra;
  document.querySelectorAll('#glosarioChips .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.letra === letra);
  });
  filtrarGlosario();
}

function filtrarGlosario() {
  const texto = (document.getElementById('glosarioBuscar')?.value || '').toLowerCase().trim();
  const grid = document.getElementById('glosarioGrid');
  const countEl = document.getElementById('glosarioCount');
  if (!grid) return;

  const resultados = GLOSARIO_DATOS
    .filter(t => {
      const coincideLetra = glosarioLetraActiva === 'todos' || primeraLetra(t.termino) === glosarioLetraActiva;
      const coincideTexto = !texto ||
        t.termino.toLowerCase().includes(texto) ||
        t.resumen.toLowerCase().includes(texto) ||
        t.detalle.toLowerCase().includes(texto);
      return coincideLetra && coincideTexto;
    })
    .sort((a, b) => a.termino.localeCompare(b.termino, 'es'));

  if (countEl) countEl.textContent = `${resultados.length} término${resultados.length === 1 ? '' : 's'} encontrado${resultados.length === 1 ? '' : 's'}`;

  if (resultados.length === 0) {
    grid.innerHTML = `
      <div class="glosario-empty" style="grid-column:1/-1;">
        <span class="ge-icon">🔍</span>
        <p>No se encontraron términos con esos criterios.<br>Intenta con otra palabra o letra.</p>
      </div>`;
    return;
  }

  grid.innerHTML = resultados.map(t => `
    <div class="glosario-card" id="gcard-${t.id}">
      ${t.imagen ? `<img class="g-card-img" id="gimg-${t.id}" src="${t.imagen}" alt="${t.termino}"/>` : ''}
      <div class="g-card-body">
        ${!t.imagen ? `<div class="g-icon">${t.icono}</div>` : ''}
        <span class="g-cat-badge g-cat-${t.categoria}">${etiquetaCategoria(t.categoria)}</span>
        <div class="g-title-row">
          <span class="g-letra-badge">${primeraLetra(t.termino)}</span>
          <h4>${t.termino}</h4>
        </div>
        <p class="g-resumen">${t.resumen}</p>
        <button class="g-ver-mas-btn" onclick="toggleGlosarioCard('${t.id}')" id="gbtn-${t.id}">
          Ver más <span class="arrow">▾</span>
        </button>
        <div class="g-expand" id="gexp-${t.id}">
          <div class="g-expand-grid">
            <div class="g-expand-concepto">
              <h5>📖 Concepto</h5>
              <p>${t.detalle}</p>
            </div>
            <div>
              <h5>🔎 Características</h5>
              <ul>${t.caracteristicas.map(c => `<li>${c}</li>`).join('')}</ul>
              <h5 style="margin-top:14px;">💡 Ejemplos</h5>
              <ul>${t.ejemplos.map(e => `<li>${e}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/** Expande o contrae una tarjeta del glosario in situ (sin modal) */
function toggleGlosarioCard(id) {
  const card = document.getElementById(`gcard-${id}`);
  const btn  = document.getElementById(`gbtn-${id}`);
  if (!card) return;
  const expandiendo = !card.classList.contains('expanded');
  card.classList.toggle('expanded', expandiendo);
  if (btn) btn.innerHTML = expandiendo
    ? 'Ver menos <span class="arrow">▾</span>'
    : 'Ver más <span class="arrow">▾</span>';
  if (expandiendo) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}