import React, { useContext } from 'react';
import { Context, } from './State';

const TopCard = (_props: {}) => {
  const state = useContext(Context);
  return <div className="d-flex form-inline">
    <div className="m-2">Round: {state.round}</div>
    <div className="m-2">Cash: ${state.cash}</div>
    <button className="m-2 btn btn-warning btn-sm" onClick={() => state.setup()}>New Game</button>
    <button className="m-2 btn btn-primary btn-sm" onClick={() => state.prepare()}>Prepare</button>
    <button className="m-2 btn btn-light btn-sm" onClick={() => state.undo()}>Undo</button>
    <button className="m-2 btn btn-light btn-sm" onClick={() => state.redo()}>Redo</button>
    <div className="m-2">Space in store: {15 - state.inStore()} / 15</div>
    <div className="m-2">Space in stock room: {20 - state.inStockRoom()} / 20</div>
  </div>;
}

export default TopCard;