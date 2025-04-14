import { useState } from "react";

function RegisterSummaries() {
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  return (
    <div>
      <h1 className="my-3">Resumen de Cierres</h1>
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered w-75 shadow">
          <thead>
            <tr>
              <th>Cajero</th>
              <th>Fecha</th>
              <th>Retiro Administrativo</th>
              <th>Efectivo</th>
              <th>Dólares</th>
              <th>RapiBAC</th>
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
                    <button className="btn btn-primary">+</button>
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
    </div>
  );
}

export default RegisterSummaries;
