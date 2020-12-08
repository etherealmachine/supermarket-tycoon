import classNames from 'classnames';
import React, { useContext } from 'react';
import { Context, Department as DepartmentType, DeptName } from './State';

const Department = (props: { deptKey: string, dept: DepartmentType }) => {
  const { deptKey, dept } = props;
  const state = useContext(Context);
  return <div className="card flex-grow-1 mx-3 mb-4">
    <div className="card-body d-flex flex-column py-2">
      <div className="d-flex justify-content-center">
        <h5>{DeptName[deptKey]}</h5>
        <div className="ml-auto">Price: ${dept.sale ? dept.salePrice : dept.price}</div>
        <div className="mx-2">
          {dept.sale ?
            <span className="badge badge-success">Sale</span> :
            (state.phase === 'stocking' && <button
              onClick={() => state.startSale(deptKey)}
              className="btn btn-success btn-sm">
              Sale
             </button>)
          }
        </div>
      </div>
      <table className="table table-sm">
        <thead><tr><th scope="col">Expiry</th><th>Stock</th></tr></thead>
        <tbody>
          {Object.entries(dept.stock).map(([expiry, count]) => <tr key={expiry}
            className={classNames({
              'bg-danger': (expiry === 'every' || expiry === state.round.toString()),
              'bg-warning': (expiry === (state.round + 1).toString()),
            })}>
            <td>{expiry}</td>
            <td>
              {count}
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>;
}

export default Department;