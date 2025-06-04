import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d4802.firebaseapp.com",
  projectId: "mern-auth-d4802",
  storageBucket: "mern-auth-d4802.firebasestorage.app",
  messagingSenderId: "74445393941",
  appId: "1:74445393941:web:829411bcca185f2a0a3e1c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
