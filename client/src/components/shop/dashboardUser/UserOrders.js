import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { getOrderByUser } from "./FetchApi";
import Layout, { DashboardUserContext } from "./Layout";

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr>
          <th className="px-4 py-2 border">Order ID</th>
          <th className="px-4 py-2 border">Order Date</th>
          <th className="px-4 py-2 border">Delivery Date</th>
          <th className="px-4 py-2 border">Delivery Type</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Total</th>
          <th className="px-4 py-2 border">Items</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order }) => {
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
        <td className="p-2 text-center">
          <span className="block rounded-full text-center text-xs px-2 font-semibold">
            {order.dispatchStatus}
          </span>
        </td>
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
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "loading", payload: true });
      try {
        const orders = await getOrderByUser();
        dispatch({ type: "OrderByUser", payload: orders });
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "loading", payload: false });
    };
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center py-24">
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
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Orders
          </div>
          <hr />
          <div className="overflow-auto bg-white shadow-lg p-4">
            <table className="table-auto border w-full my-2">
              <TableHeader />
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((item, i) => {
                    return <TableBody key={i} order={item} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;
