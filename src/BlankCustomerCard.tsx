import React, { useContext } from 'react';
import { Context } from './State';

const BlankCustomerCard = (props: { index: number }) => {
  const { index } = props;
  const state = useContext(Context);
  return <div className={"card flex-grow-1 mx-4"}>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">Customer {index + 1}</h5>
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        {state.currentCustomerIndex === undefined &&
          <button className="btn btn-primary btn-sm" onClick={() => state.startCustomer(index)}>
            Start
          </button>}
      </div>
    </div>
  </div>;
}

export default BlankCustomerCard;