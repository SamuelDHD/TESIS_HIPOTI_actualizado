// ═══════════════════════════════════════════════════════════════
//  crud.js
//  Operaciones CRUD de Pacientes con Firebase Firestore
//  Crear, Leer, Actualizar, Eliminar + Importar/Exportar Excel
// ═══════════════════════════════════════════════════════════════

let pacientesCache = [];      // Cache local para tabla
let editandoId     = null;    // ID del paciente en edición

// ───────────────────────────────────────────────────────────────
// CREATE — Agregar nuevo paciente
// ───────────────────────────────────────────────────────────────
async function crearPaciente(datos) {
  try {
    const resultado = predecirRiesgo(datos);
    const paciente = {
      ...datos,
      riesgo:      resultado.nivel.toLowerCase(),
      confianza:   resultado.confianza,
      neutrosofia: resultado.neutrosofia,
      scoreML:     resultado.scoreTotal,
      factoresRiesgo: resultado.factores,
      fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(),
      fuenteDatos:   datos.fuenteDatos || "manual"
    };
    const docRef = await db.collection(COLECCION_PACIENTES).add(paciente);
    console.log("✅ Paciente creado con ID:", docRef.id);
    mostrarToast("Paciente registrado exitosamente", "success");
    return docRef.id;
  } catch (err) {
    console.error("❌ Error al crear paciente:", err);
    mostrarToast("Error al guardar el paciente", "error");
    throw err;
  }
}

// ───────────────────────────────────────────────────────────────
// READ — Escuchar cambios en tiempo real (onSnapshot)
// ───────────────────────────────────────────────────────────────
function escucharPacientes() {
  db.collection(COLECCION_PACIENTES)
    .orderBy("fechaRegistro", "desc")
    .onSnapshot(snapshot => {
      pacientesCache = [];
      snapshot.forEach(doc => {
        pacientesCache.push({ id: doc.id, ...doc.data() });
      });
      renderTabla(pacientesCache);
      actualizarContadores();
    }, err => {
      console.error("❌ Error escuchando pacientes:", err);
      // Si Firebase no está configurado, cargar datos demo
      cargarDemoLocal();
    });
}

// ───────────────────────────────────────────────────────────────
// UPDATE — Actualizar paciente existente
// ───────────────────────────────────────────────────────────────
async function actualizarPaciente(id, datos) {
  try {
    const resultado = predecirRiesgo(datos);
    const actualizado = {
      ...datos,
      riesgo:         resultado.nivel.toLowerCase(),
      confianza:      resultado.confianza,
      neutrosofia:    resultado.neutrosofia,
      scoreML:        resultado.scoreTotal,
      factoresRiesgo: resultado.factores,
      fechaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection(COLECCION_PACIENTES).doc(id).update(actualizado);
    mostrarToast("Paciente actualizado correctamente", "success");
  } catch (err) {
    console.error("❌ Error al actualizar paciente:", err);
    mostrarToast("Error al actualizar", "error");
    throw err;
  }
}

// ───────────────────────────────────────────────────────────────
// DELETE — Eliminar paciente
// ───────────────────────────────────────────────────────────────
async function eliminarPaciente(id, nombre) {
  const confirma = confirm(`¿Eliminar al paciente #${nombre}? Esta acción no se puede deshacer.`);
  if (!confirma) return;
  try {
    await db.collection(COLECCION_PACIENTES).doc(id).delete();
    mostrarToast("Paciente eliminado", "info");
  } catch (err) {
    console.error("❌ Error al eliminar:", err);
    mostrarToast("Error al eliminar", "error");
  }
}

// ───────────────────────────────────────────────────────────────
// MODAL — Abrir formulario para crear/editar
// ───────────────────────────────────────────────────────────────
function abrirModalPaciente(paciente = null) {
  editandoId = paciente ? paciente.id : null;
  const modal = document.getElementById('modalPaciente');
  const titulo = document.getElementById('modalTitulo');

  titulo.textContent = paciente ? `✏️ Editar Paciente` : `➕ Nuevo Paciente`;

  // Rellenar campos si es edición
  const campos = ['edad','sexo','tsh','t4','col','tas','tad','imc','anos'];
  campos.forEach(c => {
    const el = document.getElementById(`f_${c}`);
    if (el) el.value = paciente ? (paciente[c] ?? '') : '';
  });

  modal.classList.add('active');
}

function cerrarModal() {
  document.getElementById('modalPaciente').classList.remove('active');
  editandoId = null;
}

// ───────────────────────────────────────────────────────────────
// GUARDAR (crea o actualiza según editandoId)
// ───────────────────────────────────────────────────────────────
async function guardarPaciente() {
  const campos = ['edad','tsh','t4','col','tas','tad','imc','anos'];
  const datos  = { sexo: document.getElementById('f_sexo').value };

  for (const c of campos) {
    const val = parseFloat(document.getElementById(`f_${c}`).value);
    if (isNaN(val)) {
      mostrarToast(`El campo ${c.toUpperCase()} es requerido`, "error");
      return;
    }
    datos[c] = val;
  }

  const btn = document.getElementById('btnGuardarPaciente');
  btn.disabled = true;
  btn.textContent = 'Guardando…';

  try {
    if (editandoId) {
      await actualizarPaciente(editandoId, datos);
    } else {
      await crearPaciente(datos);
    }
    cerrarModal();
  } finally {
    btn.disabled = false;
    btn.textContent = 'Guardar paciente';
  }
}

// ───────────────────────────────────────────────────────────────
// VER DETALLE con resultado ML
// ───────────────────────────────────────────────────────────────
function verDetalle(id) {
  const p = pacientesCache.find(x => x.id === id);
  if (!p) return;

  const resultado = predecirRiesgo(p);
  const n = resultado.neutrosofia;
  const factores = resultado.factores.length
    ? resultado.factores.map(f => `<li>${f}</li>`).join('')
    : '<li>Sin factores críticos detectados</li>';

  document.getElementById('detalleContenido').innerHTML = `
    <div class="detalle-grid">
      <div class="detalle-section">
        <h4>📋 Datos Clínicos</h4>
        <table class="detalle-table">
          <tr><td>Edad</td><td><strong>${p.edad} años</strong></td></tr>
          <tr><td>Sexo</td><td><strong>${p.sexo === 'M' ? 'Masculino' : 'Femenino'}</strong></td></tr>
          <tr><td>TSH</td><td><strong>${p.tsh} μU/mL</strong></td></tr>
          <tr><td>T4 Libre</td><td><strong>${p.t4} ng/dL</strong></td></tr>
          <tr><td>Colesterol</td><td><strong>${p.col} mg/dL</strong></td></tr>
          <tr><td>TAS / TAD</td><td><strong>${p.tas} / ${p.tad} mmHg</strong></td></tr>
          <tr><td>IMC</td><td><strong>${p.imc}</strong></td></tr>
          <tr><td>Años con diagnóstico</td><td><strong>${p.anos} años</strong></td></tr>
        </table>
      </div>
      <div class="detalle-section">
        <h4>🤖 Resultado del Modelo ML</h4>
        <div class="ml-resultado badge-${resultado.clase}">
          Riesgo <strong>${resultado.nivel}</strong>
          <span class="conf-badge">${resultado.confianza}% confianza</span>
        </div>
        <div class="neutro-box">
          <h5>∿ Lógica Neutrosófica</h5>
          <div class="neutro-bars">
            <div class="neutro-row"><span>Verdad (T)</span><div class="nbar" style="width:${n.T*100}%;background:#27ae60"></div><span>${n.T}</span></div>
            <div class="neutro-row"><span>Indeterminación (I)</span><div class="nbar" style="width:${n.I*100}%;background:#e8b84b"></div><span>${n.I}</span></div>
            <div class="neutro-row"><span>Falsedad (F)</span><div class="nbar" style="width:${n.F*100}%;background:#c0392b"></div><span>${n.F}</span></div>
          </div>
        </div>
        <h5 style="margin-top:12px;">⚠️ Factores de Riesgo Detectados</h5>
        <ul class="factores-list">${factores}</ul>
      </div>
    </div>
  `;
  document.getElementById('modalDetalle').classList.add('active');
}

function cerrarDetalle() {
  document.getElementById('modalDetalle').classList.remove('active');
}

// ───────────────────────────────────────────────────────────────
// FILTRO Y BÚSQUEDA
// ───────────────────────────────────────────────────────────────
function filtrarTabla(val) {
  const v = val.toLowerCase().trim();
  const filtrados = v
    ? pacientesCache.filter(p =>
        String(p.edad).includes(v) ||
        (p.sexo||'').toLowerCase().includes(v) ||
        (p.riesgo||'').toLowerCase().includes(v) ||
        String(p.tsh||'').includes(v)
      )
    : pacientesCache;
  renderTabla(filtrados);
}

// ───────────────────────────────────────────────────────────────
// RENDER TABLA
// ───────────────────────────────────────────────────────────────
let paginaActual = 1;
const POR_PAGINA = 10;
let datosTablaActual = [];

function renderTabla(datos) {
  datosTablaActual = datos;
  const inicio = (paginaActual - 1) * POR_PAGINA;
  const filas  = datos.slice(inicio, inicio + POR_PAGINA);
  const tbody  = document.getElementById('tableBody');
  if (!tbody) return;

  if (filas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" style="text-align:center;padding:32px;color:#6b7a8d;">
      No hay pacientes registrados aún. Haz clic en "Nuevo Paciente" para agregar.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = filas.map((p, i) => {
    const idx = inicio + i + 1;
    const riesgoClass = (p.riesgo||'bajo').toLowerCase();
    const conf = p.confianza ? `<br><small style="opacity:.6">${p.confianza}% ML</small>` : '';
    return `
      <tr>
        <td><strong>${idx}</strong></td>
        <td>${p.edad ?? '—'} años</td>
        <td>${p.sexo === 'M' ? '♂ M' : '♀ F'}</td>
        <td>${p.tsh ?? '—'}</td>
        <td>${p.t4 ?? '—'}</td>
        <td>${p.col ?? '—'} mg/dL</td>
        <td>${p.tas ?? '—'}</td>
        <td>${p.tad ?? '—'}</td>
        <td>${p.imc ?? '—'}</td>
        <td>${p.anos ?? '—'} años</td>
        <td><span class="badge ${riesgoClass}">${capitalizar(p.riesgo||'—')}</span>${conf}</td>
        <td>
          <div class="action-btns">
            <button class="act-btn view"   onclick="verDetalle('${p.id}')"    title="Ver detalle ML">🔍</button>
            <button class="act-btn edit"   onclick="abrirModalPaciente(pacientesCache.find(x=>x.id==='${p.id}'))" title="Editar">✏️</button>
            <button class="act-btn delete" onclick="eliminarPaciente('${p.id}', ${idx})" title="Eliminar">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  renderPaginacion(datos.length);
  document.getElementById('rowCount').textContent =
    `${datos.length} registro${datos.length !== 1 ? 's' : ''}`;
}

function renderPaginacion(total) {
  const totalPaginas = Math.ceil(total / POR_PAGINA);
  const pg = document.getElementById('pagination');
  if (!pg) return;
  pg.innerHTML = '';
  for (let i = 1; i <= totalPaginas; i++) {
    const b = document.createElement('button');
    b.className = 'pg-btn' + (i === paginaActual ? ' active' : '');
    b.textContent = i;
    b.onclick = () => { paginaActual = i; renderTabla(datosTablaActual); };
    pg.appendChild(b);
  }
}

function actualizarContadores() {
  const total    = pacientesCache.length;
  const altos    = pacientesCache.filter(p => p.riesgo === 'alto').length;
  const moderados= pacientesCache.filter(p => p.riesgo === 'moderado').length;
  const bajos    = pacientesCache.filter(p => p.riesgo === 'bajo').length;
  const elT = document.getElementById('cntTotal');
  const elA = document.getElementById('cntAlto');
  const elM = document.getElementById('cntModerado');
  const elB = document.getElementById('cntBajo');
  if (elT) elT.textContent = total;
  if (elA) elA.textContent = altos;
  if (elM) elM.textContent = moderados;
  if (elB) elB.textContent = bajos;
}

// ───────────────────────────────────────────────────────────────
// DATOS DEMO (cuando Firebase no está configurado)
// ───────────────────────────────────────────────────────────────
function cargarDemoLocal() {
  const sexos   = ['M','F'];
  const demo = [];
  for (let i = 1; i <= 15; i++) {
    const p = {
      id:   `demo_${i}`,
      edad: 30 + Math.floor(Math.random() * 45),
      sexo: sexos[i % 2],
      tsh:  parseFloat((Math.random() * 15 + 0.5).toFixed(2)),
      t4:   parseFloat((Math.random() * 2 + 0.3).toFixed(2)),
      col:  150 + Math.floor(Math.random() * 120),
      tas:  100 + Math.floor(Math.random() * 60),
      tad:  60  + Math.floor(Math.random() * 30),
      imc:  parseFloat((18 + Math.random() * 20).toFixed(1)),
      anos: Math.floor(Math.random() * 20 + 1),
      fuenteDatos: "demo"
    };
    const res = predecirRiesgo(p);
    p.riesgo    = res.clase;
    p.confianza = res.confianza;
    demo.push(p);
  }
  pacientesCache = demo;
  renderTabla(demo);
  actualizarContadores();
  mostrarToast("⚠️ Modo demo — configura Firebase para persistencia", "info");
}

// ───────────────────────────────────────────────────────────────
// UTILIDADES
// ───────────────────────────────────────────────────────────────
function capitalizar(str) {
  if (!str) return '—';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mostrarToast(msg, tipo = "info") {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast toast-${tipo} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Exponer globalmente
window.crearPaciente       = crearPaciente;
window.actualizarPaciente  = actualizarPaciente;
window.eliminarPaciente    = eliminarPaciente;
window.abrirModalPaciente  = abrirModalPaciente;
window.cerrarModal         = cerrarModal;
window.guardarPaciente     = guardarPaciente;
window.verDetalle          = verDetalle;
window.cerrarDetalle       = cerrarDetalle;
window.filtrarTabla        = filtrarTabla;
window.escucharPacientes   = escucharPacientes;
window.pacientesCache      = pacientesCache;
window.mostrarToast        = mostrarToast;

console.log("✅ Módulo CRUD cargado");
