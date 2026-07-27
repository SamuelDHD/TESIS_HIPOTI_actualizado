// ═══════════════════════════════════════════════════════════════
//  firebase-config.js
//  Configuración de Firebase 

const firebaseConfig = {
  apiKey: "AIzaSyCbNEJoI5yLT3PdPDE8t41QqZiS4lZYJ4s",
  authDomain: "hipotiroidismo-cv-2025.firebaseapp.com",
  projectId: "hipotiroidismo-cv-2025",
  storageBucket: "hipotiroidismo-cv-2025.firebasestorage.app",
  messagingSenderId: "688209938457",
  appId: "1:688209938457:web:f1bbb1d12d2e5867e54288"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Colecciones principales
const COLECCION_PACIENTES = "pacientes";
const COLECCION_ENCUESTAS = "encuestas";

// Exportar para uso global
window.db                  = db;
window.COLECCION_PACIENTES = COLECCION_PACIENTES;
window.COLECCION_ENCUESTAS = COLECCION_ENCUESTAS;

console.log("✅ Firebase inicializado correctamente");
