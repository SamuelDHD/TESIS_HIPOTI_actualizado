/* ══════════════════════════════════════════════════════════
   validation.js
   Validación de formularios — Formulario de Paciente
   Valida en tiempo real (al escribir/salir del campo) y
   antes de guardar. Marca visualmente los campos inválidos.
   ══════════════════════════════════════════════════════════ */

// Rango numérico permitido para cada campo clínico del formulario de paciente
const RANGOS_PACIENTE = {
  edad: { min: 1,  max: 120, label: 'la edad' },
  tsh:  { min: 0,  max: 100, label: 'la TSH' },
  t4:   { min: 0,  max: 10,  label: 'la T4 libre' },
  col:  { min: 50, max: 500, label: 'el colesterol' },
  imc:  { min: 10, max: 70,  label: 'el IMC' },
  tas:  { min: 60, max: 260, label: 'la presión sistólica' },
  tad:  { min: 30, max: 160, label: 'la presión diastólica' },
  anos: { min: 0,  max: 70,  label: 'los años con diagnóstico' },
};

/**
 * Valida un solo campo numérico contra su rango y actualiza el estado visual.
 * Devuelve el número válido o null si es inválido.
 */
function validarCampoPaciente(campo) {
  const input = document.getElementById(`f_${campo}`);
  const grupo = document.getElementById(`grp_${campo}`);
  if (!input) return null;

  const rango = RANGOS_PACIENTE[campo];
  const valor = parseFloat(input.value);
  const esValido = !isNaN(valor) && valor >= rango.min && valor <= rango.max;

  input.classList.toggle('field-error', !esValido);
  if (grupo) grupo.classList.toggle('has-error', !esValido);

  return esValido ? valor : null;
}

/**
 * Valida TODOS los campos del formulario de paciente.
 * Devuelve { valido: boolean, datos: {} } — si algún campo falla,
 * enfoca el primer campo inválido y valido = false.
 */
function validarFormularioPaciente() {
  const datos = { sexo: document.getElementById('f_sexo').value };
  let primerInvalido = null;
  let todoValido = true;

  Object.keys(RANGOS_PACIENTE).forEach(campo => {
    const valor = validarCampoPaciente(campo);
    if (valor === null) {
      todoValido = false;
      if (!primerInvalido) primerInvalido = campo;
    } else {
      datos[campo] = valor;
    }
  });

  if (!todoValido) {
    mostrarErroresCoherencia([]); // no evaluamos coherencia si aún hay campos inválidos
    const input = document.getElementById(`f_${primerInvalido}`);
    if (input) input.focus();
    mostrarToast('Revisa los campos marcados en rojo antes de guardar.', 'error');
    return { valido: false, datos };
  }

  // Todos los campos son numéricamente válidos: ahora revisamos coherencia clínica cruzada
  const erroresCoherencia = validarCoherenciaClinica(datos);
  mostrarErroresCoherencia(erroresCoherencia);
  if (erroresCoherencia.length) {
    mostrarToast('Los datos ingresados no son clínicamente coherentes entre sí.', 'error');
    return { valido: false, datos };
  }

  return { valido: true, datos };
}

/**
 * Validación de coherencia clínica CRUZADA — reglas que dependen
 * de más de un campo a la vez, aplicadas solo si todos los campos
 * individuales ya son numéricamente válidos.
 * Devuelve un arreglo de errores: [{ campos:[...], mensaje:'' }]
 */
function validarCoherenciaClinica(datos) {
  const errores = [];

  // La presión sistólica (TAS) siempre debe ser mayor que la diastólica (TAD),
  // con una diferencia mínima fisiológicamente razonable de 10 mmHg.
  if (datos.tas - datos.tad < 10) {
    errores.push({
      campos: ['tas', 'tad'],
      mensaje: 'La presión sistólica (TAS) debe ser mayor que la diastólica (TAD), con una diferencia mínima de 10 mmHg.'
    });
  }

  // No es clínicamente posible tener más años con diagnóstico que edad del paciente.
  if (datos.anos > datos.edad) {
    errores.push({
      campos: ['anos', 'edad'],
      mensaje: 'Los años con diagnóstico no pueden ser mayores que la edad del paciente.'
    });
  }

  // El diagnóstico de hipotiroidismo no suele darse antes del primer año de vida.
  if (datos.edad - datos.anos < 1) {
    errores.push({
      campos: ['anos', 'edad'],
      mensaje: 'La edad al momento del diagnóstico (edad − años con diagnóstico) debe ser de al menos 1 año.'
    });
  }

  return errores;
}

/** Muestra u oculta el banner de errores de coherencia clínica en el modal */
function mostrarErroresCoherencia(errores) {
  const banner = document.getElementById('coherenciaError');
  if (!banner) return;

  // Limpia el resaltado cruzado previo (no toca el resaltado de campo individual)
  ['tas', 'tad', 'anos', 'edad'].forEach(c => {
    document.getElementById(`f_${c}`)?.classList.remove('field-error');
  });

  if (!errores.length) {
    banner.classList.remove('show');
    banner.innerHTML = '';
    return;
  }

  errores.forEach(e => {
    e.campos.forEach(c => document.getElementById(`f_${c}`)?.classList.add('field-error'));
  });

  banner.innerHTML = `<strong>⚠️ Revisa la coherencia de los datos:</strong><ul>${
    errores.map(e => `<li>${e.mensaje}</li>`).join('')
  }</ul>`;
  banner.classList.add('show');
}


function limpiarErroresPaciente() {
  Object.keys(RANGOS_PACIENTE).forEach(campo => {
    const input = document.getElementById(`f_${campo}`);
    const grupo = document.getElementById(`grp_${campo}`);
    if (input) input.classList.remove('field-error');
    if (grupo) grupo.classList.remove('has-error');
  });
  mostrarErroresCoherencia([]);
}

/** Activa validación en vivo: se revisa cada campo al salir de él (blur) */
function activarValidacionEnVivo() {
  Object.keys(RANGOS_PACIENTE).forEach(campo => {
    const input = document.getElementById(`f_${campo}`);
    if (!input) return;
    input.addEventListener('blur', () => {
      if (input.value !== '') validarCampoPaciente(campo);
      revisarCoherenciaEnVivo();
    });
    input.addEventListener('input', () => {
      const grupo = document.getElementById(`grp_${campo}`);
      if (grupo && grupo.classList.contains('has-error')) {
        validarCampoPaciente(campo); // revalida mientras escribe si ya estaba en error
      }
    });
  });
}

/** Revisa coherencia cruzada en vivo solo si TAS/TAD/edad/años ya son válidos individualmente */
function revisarCoherenciaEnVivo() {
  const campos = ['tas', 'tad', 'edad', 'anos'];
  const valores = {};
  for (const c of campos) {
    const grupo = document.getElementById(`grp_${c}`);
    const input = document.getElementById(`f_${c}`);
    if (!input || input.value === '' || (grupo && grupo.classList.contains('has-error'))) {
      mostrarErroresCoherencia([]); // datos incompletos aún: no evaluar coherencia
      return;
    }
    valores[c] = parseFloat(input.value);
  }
  mostrarErroresCoherencia(validarCoherenciaClinica(valores));
}

window.RANGOS_PACIENTE           = RANGOS_PACIENTE;
window.validarCampoPaciente      = validarCampoPaciente;
window.validarCoherenciaClinica  = validarCoherenciaClinica;
window.mostrarErroresCoherencia  = mostrarErroresCoherencia;
window.validarFormularioPaciente = validarFormularioPaciente;
window.limpiarErroresPaciente    = limpiarErroresPaciente;
window.activarValidacionEnVivo   = activarValidacionEnVivo;

console.log("✅ Módulo de validación cargado");
