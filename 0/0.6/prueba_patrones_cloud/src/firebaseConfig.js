import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
///Configuración del proyecto de firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBPyWNXelcz6AIkKnT68tbi8eYZ-h4CcY",
  authDomain: "prueba-patrones-cloud.firebaseapp.com",
  projectId: "prueba-patrones-cloud",
  storageBucket: "prueba-patrones-cloud.firebasestorage.app",
  messagingSenderId: "644167211830",
  appId: "1:644167211830:web:a63ce61bed9225f5f4f197",
  measurementId: "G-HNEL9EWB3H"
};
/// inicializamos el app con la configuración del proyecto
const app = initializeApp(firebaseConfig);
/// Función del módulo de autenticación de firebase para obtener las instancias de autenticación
const auth = getAuth(app);
/// Función para tener como porveedor de identidad a Google y que nos permita loguearnos con una cuenta de gmail
const provider = new GoogleAuthProvider();
/// signInWithPopup y signOut son funciones para manejar el inicio y cierre de sesión. El primero abre una ventana emergente para autenticar al usuario mediante Google y el segundo sirve para cerrar la sesión del usuario actual.
export { auth, provider, signInWithPopup, signOut };
