import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { CartItem, Context, Customer, DeptName, probability } from './State';

const ItemBadge = (props: { item: CartItem }) => {
  const { item } = props;
  const text = `${DeptName[item.dept]} $${item.price}`;
  if (item.coupon) {
    return <span className="badge badge-warning mx-1">{text}</span>;
  }
  if (item.sale) {
    return <span className="badge badge-success mx-1">{text}</span>;
  }
  return <span className="badge badge-primary mx-1">{text}</span>;
}

const CustomerCard = (props: { customer: Customer, index: number }) => {
  const { customer, index } = props;
  const state = useContext(Context);
  return <div className={classNames("card mx-4", { "shadow bg-white rounded": customer.shopping })}>
    <div className="card-body py-2">
      <div className="d-flex justify-content-between">
        <h5 className="card-title">{customer.name}</h5>
        {(Array(customer.coupons).fill(0).map((_, i) => <div key={i}>
          <span className="badge badge-warning mx-2">Coupon</span>
        </div>))}
        {customer.bonus && <span className="text-success">${customer.bonus}</span>}
        <span className="text-danger">$-{customer.penalty}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          {customer.impulseBuy && <ItemBadge item={customer.impulseBuy} />}
          {customer.cart.map(item => <ItemBadge item={item} />)}
        </div>
        <div>/&nbsp;{customer.cartSize}</div>
      </div>
      <div className="card-text">
        <table className="table table-sm">
          <tbody>
            {Object.entries(customer.demand).filter(([type, demand]) => demand.length > 0).map(([type, demand]) => <tr key={type}>
              <td>{DeptName[type]}</td><td>{probability(demand).toFixed(0)}%</td>
              <td>
                {state.canPurchase(customer, type) && <button
                  onClick={() => state.purchase()}
                  className={classNames(
                    "btn btn-sm",
                    {
                      "btn-primary": !state.departments[type].sale,
                      "btn-success": state.departments[type].sale
                    })}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>}
              </td>
              <td>
                {state.canPurchaseWithCoupon(customer, type) && <button
                  onClick={() => state.purchaseWithCoupon()}
                  className="btn btn-sm btn-warning">
                  <FontAwesomeIcon icon={faPlus} />
                </button>}
              </td>
              <td>
                {state.canImpulseBuy(customer, type) && <button
                  onClick={() => state.impulseBuy(type)}
                  className="btn btn-sm btn-success">
                  <FontAwesomeIcon icon={faPlus} />
                </button>}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        {state.canStartCustomer(customer) &&
          <button className="btn btn-primary btn-sm" onClick={() => state.startCustomer(index)}>
            Start
        </button>}
        {state.canAdvanceCustomer(customer) &&
          <button className="btn btn-primary btn-sm" onClick={() => state.advanceCustomer()}>
            Next
        </button>}
        {state.canFinishCustomer(customer) &&
          <button className="btn btn-primary btn-sm" onClick={() => state.finishCustomer()}>
            Finish
        </button>}
        {state.mustFailCustomer(customer) &&
          <button className="btn btn-danger btn-sm" onClick={() => state.failCustomer()}>
            Fail
        </button>}
        {state.canStartRestocking() &&
          <button className="btn btn-primary btn-sm" onClick={() => state.startRestocking(index)}>
            Restock
        </button>}
      </div>
    </div>
  </div>;
}

export default CustomerCard;