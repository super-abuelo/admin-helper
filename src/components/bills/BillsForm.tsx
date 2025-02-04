type BillsData = {
  denominaciones: {
    cincuentaMil?: number;
    veinteMil?: number;
    diezMil?: number;
    cincoMil?: number;
    dosMil?: number;
    mil?: number;
  };
  efectivoTotal: number;
};

type BillsProps = BillsData & {
  updateFields: (fields: Partial<BillsData>) => void;
};

function BillsForm({
  denominaciones,
  efectivoTotal,
  updateFields,
}: BillsProps) {
  const denominations = [
    { key: "cincuentaMil", value: 50000, label: "50 000" },
    { key: "veinteMil", value: 20000, label: "20 000" },
    { key: "diezMil", value: 10000, label: "10 000" },
    { key: "cincoMil", value: 5000, label: "5 000" },
    { key: "dosMil", value: 2000, label: "2 000" },
    { key: "mil", value: 1000, label: "1 000" },
  ];

  const calculateTotal = (denominaciones: BillsData["denominaciones"]) => {
    return Object.entries(denominaciones).reduce((total, [key, quantity]) => {
      const value = {
        cincuentaMil: 50000,
        veinteMil: 20000,
        diezMil: 10000,
        cincoMil: 5000,
        dosMil: 2000,
        mil: 1000,
      }[key as keyof typeof denominaciones];
      return total + value * quantity;
    }, 0);
  };

  return (
    <div>
      <h1 className="my-3">Billetes</h1>
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
                    value={denominaciones[key as keyof typeof denominaciones]}
                    placeholder="-"
                    onChange={(e) => {
                      const quantity = Number(e.target.value) || 0;

                      // Update the state with the new value and recalculate the total
                      const newDenominaciones = {
                        ...denominaciones,
                        [key]: quantity,
                      };

                      updateFields({
                        denominaciones: newDenominaciones,
                        efectivoTotal: calculateTotal(newDenominaciones),
                      });
                    }}
                  />
                </td>
                <td>
                  <label className="my-2">
                    {denominaciones?.[key as keyof typeof denominaciones] ??
                      0 * value}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tbody>
            <tr>
              <td>
                <label className="my-2">50 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.cincuentaMil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    const newDenominaciones = {
                      ...denominaciones,
                      denominations[key]: quantity,
                    };

                    updateFields({
                      denominaciones: newDenominaciones,
                      efectivoTotal: calculateTotal(newDenominaciones),
                    });
                    console.log(efectivoTotal);
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.cincuentaMil != 0
                    ? denominaciones.cincuentaMil * 50000
                    : 0}
                </label>
              </td>
            </tr>

            <tr>
              <td>
                <label className="my-2">20 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.veinteMil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    updateFields({
                      denominaciones: {
                        ...denominaciones,
                        veinteMil: quantity,
                      },
                      efectivoTotal: efectivoTotal + 20000 * quantity,
                    });
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.veinteMil != 0
                    ? denominaciones.veinteMil * 20000
                    : 0}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">10 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.diezMil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    updateFields({
                      denominaciones: {
                        ...denominaciones,
                        diezMil: quantity,
                      },
                      efectivoTotal: efectivoTotal + 10000 * quantity,
                    });
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.diezMil != 0
                    ? denominaciones.diezMil * 10000
                    : 0}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">5 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.cincoMil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    updateFields({
                      denominaciones: {
                        ...denominaciones,
                        cincoMil: quantity,
                      },
                      efectivoTotal: efectivoTotal + 5000 * quantity,
                    });
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.cincoMil != 0
                    ? denominaciones.cincoMil * 5000
                    : 0}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">2 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.dosMil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    updateFields({
                      denominaciones: {
                        ...denominaciones,
                        dosMil: quantity,
                      },
                      efectivoTotal: efectivoTotal + 2000 * quantity,
                    });
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.dosMil != 0
                    ? denominaciones.dosMil * 2000
                    : 0}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="my-2">1 000</label>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={denominaciones.mil}
                  placeholder="-"
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0;
                    updateFields({
                      denominaciones: {
                        ...denominaciones,
                        mil: quantity,
                      },
                      efectivoTotal: efectivoTotal + 1000 * quantity,
                    });
                  }}
                />
              </td>
              <td>
                <label className="my-2">
                  {denominaciones.mil != 0 ? denominaciones.mil * 1000 : 0}
                </label>
              </td>
            </tr>
          </tbody> */}
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <label>Total Billetes: {efectivoTotal}</label>
      </div>
    </div>
  );
}

export default BillsForm;
