import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';

import { Context, DeptName, Expirations } from './State';

const StockButton = (props: { dept: string, expiry: string }) => {
  const { dept, expiry } = props;
  const state = useContext(Context);
  const stock = (state.stockRoom[dept] && state.stockRoom[dept][expiry]) || 0;
  if (stock === 0 || !['stocking', 'restocking'].includes((state.phase || ''))) {
    return <span className="d-flex align-items-center justify-content-center" style={{ height: '31px' }}>
      {stock}
    </span>;
  }
  return <button
    disabled={!state.canMoveStock(dept, expiry)}
    className="btn btn-sm btn-primary"
    onClick={() => state.moveStock(dept, expiry)}>
    {stock}
  </button>;
}

const StockRoom = () => {
  const state = useContext(Context);
  return <div className="mx-4 mt-1">
    <div className="d-flex justify-content-between">
      <h5>Stock Room</h5>
      <div>Space in stock room: {20 - state.inStockRoom()} / 20</div>
    </div>
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
              {Object.keys(DeptName).map(dept => <td key={dept} style={{ height: '40px' }}>
                {state.phase === 'purchasing' && <button
                  disabled={!state.canBuyStock(dept)}
                  className="btn btn-success btn-sm"
                  onClick={() => state.buyStock(dept)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>}
              </td>)}
            </tr>
            {Expirations.map(expiry => <tr key={expiry}>
              <td>{expiry}</td>
              {Object.keys(DeptName).map((key) => <td key={key}><StockButton dept={key} expiry={expiry} /></td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

export default StockRoom;