import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBnyZY-PWAB8fTaJKK0C_JhFV6QC-djVEE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-c95b8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-c95b8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-c95b8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "633457106820",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:633457106820:web:b87193344c0b7a278087d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
