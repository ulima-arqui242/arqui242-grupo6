import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBPyWNXelcz6AIkKnT68tbi8eYZ-h4CcY",
  authDomain: "prueba-patrones-cloud.firebaseapp.com",
  projectId: "prueba-patrones-cloud",
  storageBucket: "prueba-patrones-cloud.firebasestorage.app",
  messagingSenderId: "644167211830",
  appId: "1:644167211830:web:a63ce61bed9225f5f4f197",
  measurementId: "G-HNEL9EWB3H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };