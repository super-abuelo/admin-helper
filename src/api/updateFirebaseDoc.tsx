import { doc, setDoc, updateDoc } from "firebase/firestore";
import { dataBase } from "./Firebase";

export async function updateParentDocument(collectionPath: string, id: string, data: any) {
  try {
    // Reference to the parent document
    const parentDocRef = doc(dataBase, collectionPath, id);

    // Update the parent document fields
    const baseData = {
      caja: data.caja,
      creditosTotal: data.creditosTotal,
      efectivoTotal: data.efectivoTotal,
      monedasTotal: data.monedasTotal,
      fecha: data.fecha,
      superMercado: data.superMercado,
      usuario: data.usuario,
      creditosData: data.creditosData, // Ensure this is an array of objects
    };

    await updateDoc(parentDocRef, baseData);
    console.log("✅ Parent document updated successfully!");
    updateAllSubcollections(id, data); // Call to update subcollections
  } catch (error) {
    console.error("❌ Error updating parent document:", error);
    throw new Error("❌ Error updating parent document.");
  }
}

export async function updateAllSubcollections(id: string, data: any) {
  try {
    const parentDocRef = doc(dataBase, "cierresCaja", id);

    // Define all subcollections with fixed document IDs
    const subcollections = [
      { name: "cashOpening", data: data.cashOpening, docId: "cashOpening" },
      { name: "totalAmounts", data: data.totalAmounts, docId: "totalAmounts" },
      { name: "services", data: data.services, docId: "services" },
      { name: "denominaciones", data: data.denominaciones, docId: "denominaciones" },
      { name: "denominacionesMonedas", data: data.denominacionesMonedas, docId: "denominacionesMonedas" },
    ];

    // Update all subcollections
    for (const sub of subcollections) {
      const subRef = doc(parentDocRef, sub.name, sub.docId); // Use fixed document ID
      await setDoc(subRef, sub.data, { merge: true }); // Use merge to update fields without overwriting
    }

  } catch (error) {
    console.error("❌ Error updating subcollections:", error);
    throw new Error("❌ Error updating subcollections.");
  }
}