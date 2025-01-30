import React, { FormEvent, useState } from "react";
import "./CreditsForm.css";

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

function CreditsForm({
  creditosData,
  creditosTotal,
  updateFields,
}: CreditsProps) {
  const handleAddCredit = (e : FormEvent) => {
    e.preventDefault();
    const newCredit = {
      id: creditosData.length + 1,
      name: "",
      amount: 0,
    };

    const updatedCredits = [...creditosData, newCredit];
    const updatedTotal = updatedCredits.reduce(
      (sum, credit) => sum + credit.amount,
      0
    );

    updateFields({
      creditosData: updatedCredits,
      creditosTotal: updatedTotal,
    });
  };

  const handleUpdateCredit = (
    id: number,
    field: keyof (typeof creditosData)[0],
    value: string | number
  ) => {
    const updatedCredits = creditosData.map((credit) =>
      credit.id === id
        ? { ...credit, [field]: field === "amount" ? Number(value) : value }
        : credit
    );
    const updatedTotal = updatedCredits.reduce(
      (sum, credit) => sum + credit.amount,
      0
    );

    updateFields({
      creditosData: updatedCredits,
      creditosTotal: updatedTotal,
    });
  };

  const handleRemoveCredit = (id: number) => {
    const updatedCredits = creditosData.filter((credit) => credit.id !== id);
    const updatedTotal = updatedCredits.reduce(
      (sum, credit) => sum + credit.amount,
      0
    );

    updateFields({
      creditosData: updatedCredits,
      creditosTotal: updatedTotal,
    });
  };
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
            {creditosData.map((credit) => (
              <tr key={credit.id}>
                <td>
                  <input
                    className="form-control border-0"
                    value={credit.name}
                    onChange={(e) =>
                      handleUpdateCredit(credit.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control border-0 text-center"
                    value={credit.amount}
                    onChange={(e) =>
                      handleUpdateCredit(credit.id, "amount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveCredit(credit.id)}
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
                {creditosTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary" onClick={handleAddCredit}>
          Agregar Crédito
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
