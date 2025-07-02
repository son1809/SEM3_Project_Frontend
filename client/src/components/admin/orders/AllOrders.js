import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";

import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";

const AllOrders = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  // Sorting logic
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
        return { key, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  let sortedOrders = orders ? [...orders] : [];
  if (sortConfig.key && sortConfig.direction) {
    sortedOrders.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === "orderDate" || sortConfig.key === "deliveryDate") {
        aVal = aVal ? new Date(aVal) : 0;
        bVal = bVal ? new Date(bVal) : 0;
      }
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ml-1">⇅</span>;
    if (sortConfig.direction === 'asc') return <span className="ml-1">↑</span>;
    if (sortConfig.direction === 'desc') return <span className="ml-1">↓</span>;
    return <span className="ml-1">⇅</span>;
  };

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('id')}>Order ID{getSortIcon('id')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('orderDate')}>Order Date{getSortIcon('orderDate')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('deliveryDate')}>Delivery Date{getSortIcon('deliveryDate')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('deliveryType')}>Delivery Type{getSortIcon('deliveryType')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('dispatchStatus')}>Dispatch Status{getSortIcon('dispatchStatus')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('paymentStatus')}>Payment Status{getSortIcon('paymentStatus')}</th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('totalAmount')}>Total{getSortIcon('totalAmount')}</th>
              <th className="px-4 py-2 border">Items</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders && sortedOrders.length > 0 ? (
              sortedOrders.map((item, i) => {
                return (
                  <OrderTableRow
                    key={i}
                    order={item}
                    editOrder={(oId, type, status) =>
                      editOrderReq(oId, type, status, dispatch)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {orders && orders.length} order found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Order Row Component */
const OrderTableRow = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);

  return (
    <Fragment>
      <tr className="border-b">
        <td className="p-2 text-center">{order.id}</td>
        <td className="p-2 text-center">
          {order.orderDate ? moment(order.orderDate).format("lll") : ""}
        </td>
        <td className="p-2 text-center">
          {order.deliveryDate ? moment(order.deliveryDate).format("lll") : ""}
        </td>
        <td className="p-2 text-center">{order.deliveryType}</td>
        <td className="p-2 text-center">{order.dispatchStatus}</td>
        <td className="p-2 text-center">{order.paymentStatus}</td>
        <td className="p-2 text-center">${order.totalAmount}</td>
        <td className="p-2">
          {order.items && order.items.length > 0 ? (
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span>{item.productName}</span>
                  <span>{item.quantity}x</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span>No items</span>
          )}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editOrder(order.id, true, order.dispatchStatus)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteOrderReq(order.id, dispatch)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllOrders;
