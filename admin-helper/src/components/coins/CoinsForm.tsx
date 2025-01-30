
type CoinsData = {
  denominacionesMonedas: {
    quinientos?: number;
    cien?: number;
    cincuenta?: number;
    veinticinco?: number;
    diez?: number;
    cinco?: number;
  };
  monedasTotal: number;
};

type CoinsProps = CoinsData & {
  updateFields: (fields: Partial<CoinsData>) => void;
};

function CoinsForm({
  denominacionesMonedas,
  monedasTotal,
  updateFields,
}: CoinsProps) {
  
  const denominations = [
    { key: "quinientos", value: 500, label: "500" },
    { key: "cien", value: 100, label: "100" },
    { key: "cincuenta", value: 50, label: "50" },
    { key: "veinticinco", value: 25, label: "25" },
    { key: "diez", value: 10, label: "10" },
    { key: "cinco", value: 5, label: "5" },
  ];

  const calculateTotal = (denominaciones: CoinsData["denominacionesMonedas"]) => {
    return Object.entries(denominaciones).reduce((total, [key, quantity]) => {
      const value = {
        quinientos: 500,
        cien: 100,
        cincuenta: 50,
        veinticinco: 25,
        diez: 10,
        cinco: 5,
      }[key as keyof typeof denominaciones];
      return total + value * quantity;
    }, 0);
  };

  return (
    <div>
      <h1 className="my-3">Monedas</h1>
      <div className="d-flex justify-content-center text-center">
        <table className="table table-striped-columns table-bordered w-50 shadow">
          <thead>
            <tr>
              <th className="col-4">Denominación</th>
              <th className="col-4">Cantidad</th>
              <th className="col-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {denominations.map(({ key, value, label }) => (
              <tr key={key}>
                <td>
                  <label className="my-2">{label}</label>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control border-0 text-center"
                    value={denominacionesMonedas[key as keyof typeof denominacionesMonedas]}
                    placeholder="-"
                    onChange={(e) => {
                      const quantity = Number(e.target.value) || 0;

                      // Update the state with the new value and recalculate the total
                      const newDenominaciones = {
                        ...denominacionesMonedas,
                        [key]: quantity,
                      };

                      updateFields({
                        denominacionesMonedas: newDenominaciones,
                        monedasTotal: calculateTotal(newDenominaciones),
                      });
                    }}
                  />
                </td>
                <td>
                  <label className="my-2">
                    {denominacionesMonedas[key as keyof typeof denominacionesMonedas] * value}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <label>Total Monedas: {monedasTotal}</label>
      </div>
    </div>
  );
}

export default CoinsForm