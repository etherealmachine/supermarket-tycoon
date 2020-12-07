import React, { useContext } from 'react';
import { Context, } from './State';

import Department from './Department';

const Store = (_props: {}) => {
  const state = useContext(Context);
  return <div className="d-flex flex-grow-1 flex-column mt-1">
    <div className="d-flex justify-content-between">
      <h5>Store</h5>
      <div>Space in store: {15 - state.inStore()} / 15</div>
    </div>
    <div className="d-flex flex-row">
      <Department deptKey='bakery' dept={state.departments['bakery']} />
      <Department deptKey='dairy' dept={state.departments['dairy']} />
      <Department deptKey='dryGoods' dept={state.departments['dryGoods']} />
    </div>
    <div className="d-flex flex-row">
      <Department deptKey='frozen' dept={state.departments['frozen']} />
      <Department deptKey='produce' dept={state.departments['produce']} />
    </div>
  </div>;
}

export default Store;