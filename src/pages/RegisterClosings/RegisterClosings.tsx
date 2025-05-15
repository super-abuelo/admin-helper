import { useEffect, useState } from "react";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dataBase } from "../../api/Firebase";

export const RegisterClosings = () => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(8);
  const [selectedSuper, setSelectedSuper] = useState<number | null>(null);

  useEffect(() => {
    fetchCierres();
  }, [selectedSuper]);

  const fetchCierres = async () => {
    try {
      const collectionRef = collection(dataBase, "cierresCaja");

      let q;
      if (selectedSuper) {
        // Filter by the selected superMercado
        q = query(
          collectionRef,
          where("superMercado", "==", selectedSuper),
          orderBy("fecha", "desc")
        );
      } else {
        // Fetch all documents if no filter is selected
        q = query(collectionRef, orderBy("fecha", "desc"));
      }

      const querySnapshot = await getDocs(q);

      // Convert documents to objects
      let cierreDocs = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          fecha: doc.data().fecha,
          ...doc.data(),
        };
      });
      setData(cierreDocs);
    } catch (error) {
      console.error("Error fetching cierresCaja:", error);
    } finally {
      setLoading(false);
    }
  };

  //   function pad(n: number) {
  //     return n < 10 ? "0" + n : n;
  //   }

  //   function normalizeDate(fecha: string): string {
  //     // Handles both "YYYY-M-D" and "YYYY-MM-DD"
  //     const parts = fecha.split("-");
  //     if (parts.length !== 3) return fecha; // fallback if unexpected format
  //     const year = parts[0];
  //     const month = pad(Number(parts[1]));
  //     const day = pad(Number(parts[2]));
  //     return `${year}-${month}-${day}`;
  //   }

  //   async function normalizeAllCierresFechas() {
  //   const cierresRef = collection(dataBase, "cierresCaja");
  //   const snapshot = await getDocs(cierresRef);

  //   for (const docSnap of snapshot.docs) {
  //     const data = docSnap.data();
  //     if (data.fecha) {
  //       const normalized = normalizeDate(data.fecha);
  //       if (normalized !== data.fecha) {
  //         await updateDoc(doc(cierresRef, docSnap.id), { fecha: normalized });
  //         console.log(`Updated ${docSnap.id}: ${data.fecha} -> ${normalized}`);
  //       }
  //     }
  //   }
  // }

  const handleRowClick = (data: any) => {
    setSelectedData(data);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedData(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination window logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageWindow = 5; // Number of page buttons to show
  let startPage = Math.max(1, currentPage - Math.floor(pageWindow / 2));
  let endPage = startPage + pageWindow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageWindow + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="my-3">Cierres de Caja Realizados</h1>
      {!showForm && (
        <div className="d-flex justify-content-center my-3">
          <select
            className="form-select w-25"
            value={selectedSuper ?? ""}
            onChange={(e) => setSelectedSuper(Number(e.target.value))}
          >
            <option value="">Seleccionar Súper</option>
            <option value="1">Súper El Abuelo #1</option>
            <option value="2">Súper El Abuelo #2</option>
          </select>
        </div>
      )}
      {!showForm && (
        <div className="d-flex justify-content-center">
          <table className="table table-striped table-bordered w-75 shadow">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Súper</th>
                <th>Caja</th>
                <th>Usuario</th>
                <th>Ver Más</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center">
                    Cargando datos...
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((cierre: any) => (
                  <tr key={cierre.id}>
                    <td>{cierre.fecha}</td>
                    <td>{cierre.superMercado}</td>
                    <td>{cierre.caja ?? "N/A"}</td>
                    <td>{cierre.usuario?.toString() || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleRowClick(cierre);

                          handleShowForm();
                        }}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-danger">
                    ⚠️ No hay datos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {!showForm && (
        <div className="d-flex justify-content-center align-items-center">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>
              {startPage > 1 && (
                <>
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </button>
                  </li>
                  {startPage > 2 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                </>
              )}
              {pageNumbers.map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                </>
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      {showForm && (
        <div className="reviewContainer">
          <ReviewForm closingData={selectedData} cierreId={selectedData.id} />
          <div className="my-3">
            <button
              type="button"
              className="btn btn-secondary ms-3 mb-5"
              onClick={handleBack}
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
