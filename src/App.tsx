import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Context, State } from './State';
import { useLocalStorageState } from './Persistence';
import BlankCustomerCard from './BlankCustomerCard';
import CustomerCard from './CustomerCard';
import Department from './Department';
import TopBar from './TopBar';
import StockRoom from './StockRoom';

export default function App() {
  const [i, setCount] = useState(0);
  const [state, setState] = useLocalStorageState('AppState', new State());
  state.setState = (newState: State) => {
    setState(newState);
    setCount(i + 1);
  };
  (window as any).app = state;
  return <Router>
    <Switch>
      <Route path="/">
        <div className="d-flex flex-column m-4">
          <Context.Provider value={state}>
            <TopBar />
            <div className="d-flex flex-wrap">
              <div className="d-flex flex-grow-1 mr-4">
                {Object.entries(state.departments).map(([key, dept]) => <Department key={key} deptKey={key} dept={dept} />)}
              </div>
              <StockRoom />
              {state.currentCustomers.map((customer, i: number) => (
                customer.visible ?
                  <CustomerCard key={i} customer={customer} index={i} /> :
                  <BlankCustomerCard key={i} index={i} />
              ))}
            </div>
          </Context.Provider>
        </div>
      </Route>
    </Switch>
  </Router >;
}