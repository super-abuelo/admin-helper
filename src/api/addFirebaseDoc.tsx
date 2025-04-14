import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import { dataBase } from "./Firebase";

export async function addParentDocument(collectionPath: string, data: any) {
  try {
    // Se obtiene la referencia a la colección
    const collectionRef = collection(dataBase, collectionPath);

    // Se agrega un nuevo documento con los datos proporcionados
    console.log("Raw fecha value:", data.fecha);
    const fechaString = data.fecha; // "14/4/2025"
    const [day, month, year] = fechaString.split("/");
    const formattedDate = `${year}-${month}-${day}`; // Convert to "2025-04-14"
    const fecha = new Date(formattedDate)
    console.log("Processed fecha value:", fecha);
    const baseData = {
      creditosData: data.creditosData,
      efectivoTotal: data.efectivoTotal,
      monedasTotal: data.monedasTotal,
      creditosTotal: data.creditosTotal,
      fecha: formattedDate,
      superMercado: data.superMercado,
      usuario: data.usuario,
      caja: data.caja,
    };
    const newDocRef = await addDoc(collectionRef, baseData);
    console.log(baseData.fecha);

    console.log("Nuevo documento agregado con ID:", newDocRef.id);

    addAllSubcollections(newDocRef.id, data);

    return newDocRef.id.toString();
  } catch (error) {
    console.error("Error al agregar el nuevo documento:", error);
  }
}

async function addAllSubcollections(id: string, data: any) {
  try {
    const batch = writeBatch(dataBase);
    const parentDocRef = doc(dataBase, "cierresCaja", id);

    // Define all subcollections inside a single batch
    const subcollections = [
      { name: "cashOpening", data: data.cashOpening, docId: "cashOpening" },
      { name: "totalAmounts", data: data.totalAmounts, docId: "totalAmounts" },
      { name: "services", data: data.services, docId: "services" },
      {
        name: "denominaciones",
        data: data.denominaciones,
        docId: "denominaciones",
      },
      {
        name: "denominacionesMonedas",
        data: data.denominacionesMonedas,
        docId: "denominacionesMonedas",
      },
    ];

    // Add all subcollections in a loop
    subcollections.forEach((sub) => {
      const subRef = doc(collection(parentDocRef, sub.name));
      batch.set(subRef, sub.data);
    });

    // Commit batch write
    await batch.commit();
    console.log("✅ All subcollections added successfully!");
  } catch (error) {
    console.error("❌ Error adding subcollections:", error);
  }
}
