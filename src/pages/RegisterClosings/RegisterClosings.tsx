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
import { Login } from "../Login-Sign In/Login";
import { getAllCierresCaja } from "../../api/getFirebaseDoc";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../api/Firebase";

export const RegisterClosings = () => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCierres = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(dataBase, "cierresCaja")
        );

        // Convert documents to objects
        const cierreDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
    setShowForm(true)
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedData(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

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
              ) : data.length > 0 ? (
                data.map((cierre: any) => (
                  <tr key={cierre.id}>
                    <td>
                      {cierre.fecha?.toDate
                        ? cierre.fecha.toDate().toLocaleDateString("es-CR")
                        : cierre.fecha || "N/A"}
                    </td>
                    <td>{cierre.super}</td>
                    <td>{cierre.caja ?? "N/A"}</td>
                    <td>{cierre.usuario?.toString() || "N/A" }</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleRowClick(cierre)
                          
                          handleShowForm()
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

            {/* <tbody>

              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleRowClick({ id: 1, name: "Nombre 1", age: 30 })
                    }
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      )}

      {/* Tabla Secundaria */}
      {/* {selectedData && !showForm && (
        <div>
          <h4 className="my-2">Detalles de la fila seleccionada</h4>
          <div className="d-flex justify-content-center">
            <table className="table table-striped table-bordered w-75">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Detalles</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedData.id}</td>
                  <td>{selectedData.name}</td>
                  <td>{selectedData.age}</td>
                  <td>Detalles adicionales</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={handleShowForm}
                    >
                      Ver Formulario
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="btn btn-secondary mt-2" onClick={handleBack}>
            Volver
          </button>
        </div>
      )} */}
      {showForm && (
        <div>
          <ReviewForm closingData={selectedData} cierreId = {selectedData.id} />
          <div className="my-3">
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
