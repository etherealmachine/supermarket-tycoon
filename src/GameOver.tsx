import React, { useContext } from 'react';

import { Context, } from './State';

const GameOver = (_props: {}) => {
  const state = useContext(Context);
  if (state.round === 6 && state.phase === undefined) {
    return <div className="d-flex justify-content-center align-items-center px-4 border border-success" style={{ height: '47px' }}>
      {state.cash >= 251 && <span>
        <span className="font-weight-bold">Supermarket Tycoon!</span>
        <span className="ml-4">Amazing!! Maybe it's time to think about opening a real store!</span>
      </span>}
      {state.cash >= 201 && state.cash < 251 && <span>
        <span className="font-weight-bold">Master Grocer</span>
        <span className="ml-4">Congratulations, You were born to be a grocer!</span>
      </span>}
      {state.cash >= 151 && state.cash < 200 && <span>
        <span className="font-weight-bold">Grocery Manager</span>
        <span className="ml-4">Good job - your customers are happy and you have money to expand</span>
      </span>}
      {state.cash >= 101 && state.cash < 150 && <span>
        <span className="font-weight-bold">Grocer</span>
        <span className="ml-4">Your store makes a tidy profit</span>
      </span>}
      {state.cash >= 51 && state.cash < 100 && <span>
        <span className="font-weight-bold">Corner Store</span>
        <span className="ml-4">Your store makes a small profit, but there's no margin for error</span>
      </span>}
      {state.cash >= 0 && state.cash < 50 && <span>
        <span className="font-weight-bold">Breakeven</span>
        <span className="ml-4">Don't quit your day job...</span>
      </span>}
    </div >;
  }
  if (state.cash < 0) {
    return <div className="d-flex justify-content-center align-items-center px-4 border border-danger" style={{ height: '47px' }}>
      <span className="font-weight-bold">Bankrupt!</span>
      <span className="ml-4">You've angered your last customer and ran out of money!</span>
    </div >;
  }
  return null;
}

export default GameOver;