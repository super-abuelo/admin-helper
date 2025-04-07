import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, dataBase } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function createUser(username: string, password: string) {
    const usersRef = collection(dataBase, "usuarios");

    // Check if username already exists in Firestore
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        throw new Error("❌ Username already taken");
    }

    const email = `${username}@adminhelper.com`;
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(usersRef, user.uid), {
        username,
        role: "1" 
    });

    return user;
}

export async function loginUser(identifier: string, password: string) {
    // If identifier doesn't contain '@', assume it's a username and get email from Firestore
    if (!identifier.includes("@")) {
        const usersRef = collection(dataBase, "usuarios");
        const q = query(usersRef, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            identifier = querySnapshot.docs[0].data().username; // Retrieve associated email
        } else {
            throw new Error("❌ Username does not exist");
        }
    }

    const email = `${identifier}@adminhelper.com`;

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
}
