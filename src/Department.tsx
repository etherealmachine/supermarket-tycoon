import classNames from 'classnames';
import React, { useContext } from 'react';
import { Context, Department as DepartmentType, DeptName } from './State';

const Department = (props: { deptKey: string, dept: DepartmentType }) => {
  const { deptKey, dept } = props;
  const state = useContext(Context);
  return <div className={classNames("card flex-grow-1 mx-3 mb-4", { "border border-danger": !state.hasStock(deptKey) })}>
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
          {Object.entries(dept.stock)
            .filter(
              ([expiry, _count]) => {
                if (expiry === 'every') return true;
                if (expiry === 'never') return true;
                return parseInt(expiry) >= state.round;
              }
            ).map(
              ([expiry, count]) => <tr key={expiry}>
                <td>{expiry}</td>
                <td>
                  {count}
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  </div >;
}

export default Department;