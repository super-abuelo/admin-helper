import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { dataBase } from "./Firebase";

export async function getDocument(collectionPath: string, docId: string) {
  try {
    const docRef = doc(dataBase, collectionPath, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().cashOpening;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export async function getCierreCaja(id: string) {
  try {
    // ✅ Step 1: Get the **main document** (general fields)
    const docRef = doc(dataBase, "cierresCaja", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("❌ No document found!");
      return null;
    }

    // ✅ Step 2: Get all **subcollections** separately
    const subcollections = [
      "cashOpening",
      "totalAmounts",
      "services",
      "denominaciones",
      "denominacionesMonedas",
    ];
    const subcollectionData: any = {};

    for (const sub of subcollections) {
      const subRef = collection(docRef, sub);
      const subSnap = await getDocs(subRef);

      subcollectionData[sub] = {};
      subSnap.forEach((doc) => {
        subcollectionData[sub] = doc.data(); // Assuming only **one document** per subcollection
      });
    }

    // ✅ Step 4: Merge everything into one object
    const finalData = {
      id: docSnap.id,
      ...docSnap.data(), // Main document data
      ...subcollectionData, // All subcollections data
    };

    return finalData;
  } catch (error) {
    console.error("❌ Error getting document:", error);
    return null;
  }
}

export async function getAllCierresCaja() {
  try {
    // ✅ Reference to the `cierresCaja` collection
    const collectionRef = collection(dataBase, "cierresCaja");

    // ✅ Fetch all documents in the collection
    const querySnapshot = await getDocs(collectionRef);

    // ✅ Store all documents in an array
    const allCierresCaja = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Include the document fields
    }));

    return allCierresCaja;
  } catch (error) {
    console.error("❌ Error retrieving cierresCaja documents:", error);
    return [];
  }
}
