import React, { useState } from 'react';
import {
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

import { Context, State } from './State';
import { useLocalStorageState } from './Persistence';
import Intro from './Intro';
import BlankCustomerCard from './BlankCustomerCard';
import CustomerCard from './CustomerCard';
import TopBar from './TopBar';
import StockRoom from './StockRoom';
import Store from './Store';
import GameOver from './GameOver';

export default function App() {
  const [i, setCount] = useState(0);
  const [state, setState] = useLocalStorageState('AppState', new State());
  state.setState = (newState: State) => {
    setState(newState);
    setCount(i + 1);
  };
  (window as any).app = state;
  return <HashRouter>
    <Switch>
      <Route path="/game">
        <div className="d-flex flex-column" style={{ width: "100%", maxWidth: "1400px", marginRight: 'auto', marginLeft: 'auto' }}>
          <Context.Provider value={state}>
            <TopBar />
            <GameOver />
            <div className="d-flex flex-column flex-wrap">
              <div className="d-flex flex-row flex-grow-1">
                <Store />
                <StockRoom />
              </div>
              <div className="d-flex">
                {state.currentCustomers.map((customer, i: number) => (
                  customer.visible ?
                    <CustomerCard key={i} customer={customer} index={i} /> :
                    <BlankCustomerCard key={i} index={i} />
                ))}
              </div>
            </div>
          </Context.Provider>
        </div>
      </Route>
      <Route path="/">
        <Intro />
      </Route>
    </Switch>
  </HashRouter >;
}