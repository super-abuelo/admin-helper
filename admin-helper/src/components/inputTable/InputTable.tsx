import React, { useState } from "react";
import PropTypes from "prop-types";

function InputTable(props) {
  const [rows, setRows] = useState([{ credit: "", amount: "" }]);

//   const handleChange = (index, event) => {
//     const newRows = [...rows];
//     newRows[index][event.target.name] = event.target.value;
//     setRows(newRows);
//   };

  const addRow = () => {
    setRows([...rows, { credit: "", amount: "" }]);
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Créditos - Nombres</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="credit"
                  value={row.credit}
                  //onChange={(event) => handleChange(index, event)}
                  placeholder="Nombre del cliente"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={row.amount}
                  //onChange={(event) => handleChange(index, event)}
                  placeholder="Monto"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Agregar fila</button>
    </div>
  );
}

InputTable.propTypes = {};

export default InputTable;
