import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCY04yZIph76N5CWCVpEiqR5j4RbPnVP8",
  authDomain: "admin-helper-9700e.firebaseapp.com",
  projectId: "admin-helper-9700e",
  storageBucket: "admin-helper-9700e.firebasestorage.app",
  messagingSenderId: "992028453882",
  appId: "1:992028453882:web:973785a68e07b3df845243",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const dataBase = getFirestore(app);


