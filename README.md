# Sistema Web Inteligente — Riesgo Cardiovascular & Hipotiroidismo
### Universidad de Guayaquil · Ingeniería de Software · 2025

---

## 📁 Estructura de archivos

```
proyecto/
├── index.html          ← Archivo principal (abre este en el navegador)
├── firebase-config.js  ← ⚠️ CONFIGURAR con tus credenciales de Firebase
├── ml-engine.js        ← Motor de Machine Learning (Árbol de Decisión + Neutrosofía)
├── crud.js             ← Operaciones CRUD + tabla de pacientes
├── survey.js           ← Módulo de encuesta + predicción desde respuestas
├── charts.js           ← Gráficas Chart.js con datos de Firebase
└── export.js           ← Exportación a Excel (.xlsx)
```

---

## 🔥 Paso 1 — Configurar Firebase

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Crea un proyecto nuevo (ej: `hipotiroidismo-cv-2025`)
3. En la consola, ve a **Configuración del proyecto** → **Tus apps** → botón **</>** (Web)
4. Registra la app y copia el objeto `firebaseConfig`
5. Abre `firebase-config.js` y reemplaza los valores:

```javascript
const firebaseConfig = {
  apiKey:            "PEGA_AQUI_TU_apiKey",
  authDomain:        "PEGA_AQUI_TU_authDomain",
  projectId:         "PEGA_AQUI_TU_projectId",
  storageBucket:     "PEGA_AQUI_TU_storageBucket",
  messagingSenderId: "PEGA_AQUI_TU_messagingSenderId",
  appId:             "PEGA_AQUI_TU_appId"
};
```

6. En Firebase Console → **Firestore Database** → **Crear base de datos** → modo **Prueba** (para empezar)

---

## 🚀 Paso 2 — Ejecutar el proyecto

### Opción A — VS Code con Live Server (recomendado)
1. Abre la carpeta del proyecto en VS Code
2. Instala la extensión **Live Server** (Ritwick Dey)
3. Clic derecho en `index.html` → **Open with Live Server**
4. Se abrirá en `http://127.0.0.1:5500`

### Opción B — Sin servidor (puede tener límites con Firebase)
- Simplemente abre `index.html` con doble clic en el navegador
- Si Firebase no conecta, el sistema funcionará en **modo demo** automáticamente

---

## 🤖 Algoritmo de Machine Learning

El sistema implementa un **Random Forest simulado** con 3 árboles de decisión:

| Árbol | Variables | Peso |
|-------|-----------|------|
| Árbol 1 | TSH, T4 Libre, Colesterol | 45% |
| Árbol 2 | Presión Arterial (TAS/TAD), IMC | 35% |
| Árbol 3 | Años con diagnóstico, Edad, Sexo | 20% |

### Umbrales clínicos (basados en ATA Guidelines + ACC/AHA)
- **TSH**: Normal 0.4–4.0 μU/mL
- **T4 Libre**: Normal 0.8–1.8 ng/dL
- **Colesterol**: Óptimo <200 mg/dL, Alto ≥239 mg/dL
- **TAS**: Normal <120 mmHg, Hipertensión ≥140 mmHg
- **IMC**: Normal 18.5–24.9, Obesidad ≥30

### Lógica Neutrosófica
Cada predicción genera valores **(T, I, F)**:
- **T** (Verdad): probabilidad de que el riesgo sea real
- **I** (Indeterminación): nivel de incertidumbre clínica
- **F** (Falsedad): probabilidad de que el riesgo no sea real

---

## 🗄️ Base de Datos — Colecciones Firebase

### `pacientes`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| edad | number | Edad del paciente |
| sexo | string | "M" o "F" |
| tsh | number | TSH en μU/mL |
| t4 | number | T4 Libre en ng/dL |
| col | number | Colesterol en mg/dL |
| tas | number | Tensión arterial sistólica |
| tad | number | Tensión arterial diastólica |
| imc | number | Índice de masa corporal |
| anos | number | Años con diagnóstico |
| riesgo | string | "bajo" / "moderado" / "alto" |
| confianza | number | % de confianza del modelo ML |
| scoreML | number | Score normalizado 0–1 |
| neutrosofia | object | {T, I, F} valores neutrosóficos |
| factoresRiesgo | array | Lista de factores detectados |
| fuenteDatos | string | "manual" o "encuesta" |
| fechaRegistro | timestamp | Fecha de creación |

### `encuestas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| respuestas | object | Todas las respuestas de la encuesta |
| adherencia | string | Nivel de adherencia calculado |
| riesgoML | string | Riesgo predicho por ML |
| confianzaML | number | % de confianza |
| neutrosofia | object | Valores neutrosóficos |
| factoresRiesgo | array | Factores detectados |
| fecha | timestamp | Fecha de la encuesta |

---

## 📥 Exportar a Excel

- **Pacientes** → botón "📥 Exportar Excel" en la página de Recopilación de Datos
- **Encuestas** → botón "📥 Exportar Encuestas" en la página de Encuesta
- El archivo generado incluye dos hojas: **Pacientes** y **Resumen estadístico**

---

## ⚠️ Modo Demo

Si Firebase no está configurado, el sistema activa automáticamente el **modo demo**:
- Genera 15 pacientes con datos clínicos aleatorios
- Los datos se almacenan solo en memoria (se pierden al recargar)
- Las encuestas se guardan en `localStorage` del navegador
- Todo el motor ML funciona normalmente en modo demo

---

## 📧 Contacto
Universidad de Guayaquil · Facultad de Ingeniería de Software · 2025
