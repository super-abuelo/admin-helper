import React, { useState } from "react";
import "./CreditsForm.css";

type CreditRow = {
  id: number; // Unique identifier for each row
  name: string; // Name of the credit
  amount: number; // Credit amount
};

type CreditsData = {
  creditosData: {
    id: number; // Unique identifier for each credit
    name: string; // Name of the credit
    amount: number; // Amount of the credit
  }[];
  creditosTotal: number; // Total sum of all credits
};

type CreditsProps = CreditsData & {
  updateFields: (fields: Partial<CreditsData>) => void;
};

function CreditsForm({ creditosData, creditosTotal, updateFields}: CreditsProps) {
  const [credits, setCredits] = useState<CreditRow[]>([
    { id: 1, name: "", amount: 0 },
  ]);

  const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCredits((prev) => [
      ...prev,
      { id: prev.length + 1, name: "", amount: 0 }, // Add a new empty row
    ]);
  };

  const handleUpdateRow = (
    id: number,
    field: keyof CreditRow,
    value: string | number
  ) => {
    setCredits((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [field]: field === "amount" ? Number(value) : value }
          : row
      )
    );
  };

  const handleRemoveRow = (id: number) => {
    setCredits((prev) => prev.filter((row) => row.id !== id));
  };

  const totalAmount = credits.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div>
      <h1 className="my-3">Créditos</h1>
      <div className="d-flex justify-content-center">
        <table className="table table-striped-columns table-bordered w-50 shadow">
          <thead>
            <tr>
              <th className="col-6">Créditos - Nombres</th>
              <th className="col-3">Monto</th>
              <th className="col-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    className="form-control border-0"
                    value={row.name}
                    onChange={(e) =>
                      handleUpdateRow(row.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control border-0 text-center"
                    value={row.amount}
                    onChange={(e) =>
                      handleUpdateRow(row.id, "amount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td colSpan={2} className="text-center">
                {totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary" onClick={handleAddRow}>
          Agregar Fila
        </button>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <h1 className="my-3">Créditos</h1>
  //     <div className="d-flex justify-content-center">
  //       <table className="table table-striped-columns table-bordered w-50 shadow">
  //         <thead>
  //           <tr>
  //             <th className="col-8">Créditos - Nombres</th>
  //             <th className="col">Monto</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td>
  //               <input className="form-control border-0" />
  //             </td>
  //             <td>
  //               <input className="form-control border-0 text-center" />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <input className="form-control border-0" />
  //             </td>
  //             <td>
  //               <input className="form-control border-0 text-center" />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td>
  //               <input className="form-control border-0" />
  //             </td>
  //             <td>
  //               <input className="form-control border-0 text-center" />
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}

export default CreditsForm;
