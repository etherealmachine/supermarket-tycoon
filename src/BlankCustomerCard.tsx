import React, { useContext } from 'react';
import { Context } from './State';

const BlankCustomerCard = (props: { index: number }) => {
  const { index } = props;
  const state = useContext(Context);
  return <div className={"card flex-grow-1 mx-4"}>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">Customer {index + 1}</h5>
      <div className="d-flex align-items-center justify-content-around">
        {state.canStartCustomer(state.currentCustomers[index]) &&
          <button className="btn btn-primary btn-sm" onClick={() => state.startCustomer(index)}>
            Start
          </button>}
        {state.canStartRestocking() &&
          <button className="btn btn-primary btn-sm" onClick={() => state.startRestocking(index)}>
            Restock
          </button>}
      </div>
    </div>
  </div>;
}

export default BlankCustomerCard;