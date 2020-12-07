import React, { useContext } from 'react';
import { Context, Department as DepartmentType, DeptName } from './State';

const Department = (props: { deptKey: string, dept: DepartmentType }) => {
  const { deptKey, dept } = props;
  const state = useContext(Context);
  return <div className="d-flex flex-column flex-grow-1 m-4">
    <div className="d-flex justify-content-between">
      <h5>{DeptName[deptKey]}</h5>
      <div>
        {dept.sale ?
          <span className="badge badge-success">Sale</span> :
          <button
            onClick={() => state.startSale(deptKey)}
            className="btn btn-success btn-sm">
            Sale
        </button>}
      </div>
    </div>
    <div className="d-flex">
      <div>Price: ${dept.sale ? dept.salePrice : dept.price}</div>
    </div>
    <table className="table table-sm">
      <thead><tr><th scope="col">Expiry</th><th>Stock</th></tr></thead>
      <tbody>
        {Object.entries(dept.stock).map(([expiry, count]) => <tr key={expiry}>
          <td>{expiry}</td>
          <td>{count}</td>
        </tr>
        )}
      </tbody>
    </table>
  </div>;
}

export default Department;