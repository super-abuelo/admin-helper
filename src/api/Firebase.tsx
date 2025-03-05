import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCY04yZIph76N5CWCVpEiqR5j4RbPnVP8",
  authDomain: "admin-helper-9700e.firebaseapp.com",
  projectId: "admin-helper-9700e",
  storageBucket: "admin-helper-9700e.firebasestorage.app",
  messagingSenderId: "992028453882",
  appId: "1:992028453882:web:973785a68e07b3df845243",
};

const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);

export async function testFirestoreWrite() {
  try {
    const docRef = await addDoc(collection(dataBase, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(dataBase, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
