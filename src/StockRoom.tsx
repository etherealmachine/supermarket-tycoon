import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';

import { Context, DeptName, Expirations } from './State';

const StockRoom = () => {
  const state = useContext(Context);
  return <div className="m-4">
    <h5>Stock Room</h5>
    <div className="card">
      <div className="card-body">
        <table className="table table-sm">
          <thead><tr>
            <th scope="col">Expiry</th>
            {Object.entries(DeptName).map(([key, value]) => <th key={key}>{value}</th>)}
          </tr></thead>
          <tbody>
            <tr>
              <td></td>
              {Object.keys(DeptName).map(dept => <td key={dept}>${state.currentCosts[dept]}</td>)}
            </tr>
            <tr>
              <td></td>
              {Object.keys(DeptName).map(dept => <td key={dept}>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => state.buyStock(dept)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>)}
            </tr>
            {Expirations.map(expiry => <tr key={expiry}>
              <td>{expiry}</td>
              {Object.keys(DeptName).map((key) => <td key={key}>{
                state.stockRoom[key] ? <button
                  className="btn btn-sm btn-light"
                  onClick={() => state.moveStock(key, expiry)}>
                  {state.stockRoom[key][expiry]}
                </button> : '?'
              }</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

export default StockRoom;