import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dataBase } from "../../api/Firebase";

export const RegisterClosings = () => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchCierres = async () => {
      try {
        const collectionRef = collection(dataBase, "cierresCaja");

        // Create a query to order by the 'fecha' field in descending order (most recent first)
        const q = query(collectionRef, orderBy("fecha", "desc"));

        const querySnapshot = await getDocs(q);

        // Convert documents to objects
        const cierreDocs = querySnapshot.docs.map((doc) => {
          const fecha = doc.data().fecha; // Obtienes la fecha del documento
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        console.log("✅ Fetched cierresCaja documents:", cierreDocs);
        setData(cierreDocs);
      } catch (error) {
        console.error("Error fetching cierresCaja:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCierres();
  }, []);

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

  return (
    <div>
      <h1 className="my-3">Cierres de Caja Realizados</h1>
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

              {[...Array(Math.ceil(data.length / itemsPerPage))].map(
                (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}

              <li
                className={`page-item ${
                  currentPage === Math.ceil(data.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(data.length / itemsPerPage)
                  }
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
            <button type="submit" className="btn btn-primary mb-5">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3 mb-5"
              onClick={handleBack}
            >
              Volver
            </button>
          </div>

          {/* <form className="border p-4 rounded">
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Fecha:</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue="2023-12-20"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Cajero:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Josué"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Caja:</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue="1"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Apertura:</label>
                <input type="text" className="form-control" defaultValue="-" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Créditos:</label>
                <input type="text" className="form-control" defaultValue="-" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={handleBack}
            >
              Volver
            </button>
          </form> */}
        </div>
      )}
    </div>
  );
};
