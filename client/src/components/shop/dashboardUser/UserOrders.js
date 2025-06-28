import React, { Fragment, useEffect, useContext, useState } from "react";
import moment from "moment";
import { getOrderByUser } from "./FetchApi";
import { cancelOrder } from "../order/FetchApi";
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
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order, onCancel, onReturnOrReplacement }) => {
  // Only allow cancel if not delivered/cancelled/shipped
  const canCancel =
    order.dispatchStatus &&
    !["Delivered", "Cancelled", "Shipped"].includes(order.dispatchStatus);

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
        <td className="p-2 text-center">
          {canCancel && (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mr-2"
              onClick={() => onCancel(order.id)}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => onReturnOrReplacement(order)}
          >
            Return/Replace
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form, setForm] = useState({ productId: "", requestType: "RETURN" });
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = async (orderId) => {
    dispatch({ type: "loading", payload: true });
    try {
      await cancelOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "loading", payload: false });
  };

  const handleReturnOrReplacement = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setForm({ productId: order.items[0]?.productId || "", requestType: "RETURN" });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // await requestReturnOrReplacement({
    //   orderId: selectedOrder.id,
    //   productId: form.productId,
    //   requestType: form.requestType,
    // });
    setSubmitting(false);
    setShowModal(false);
  };

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
                    return <TableBody key={i} order={item} onCancel={handleCancel} onReturnOrReplacement={handleReturnOrReplacement} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
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
      {/* Modal for Return/Replacement */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Request Return/Replacement</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <label className="block mb-1">Product</label>
                <select name="productId" value={form.productId} onChange={handleFormChange} className="w-full border p-2 rounded">
                  {selectedOrder.items.map((item) => (
                    <option key={item.productId} value={item.productId}>
                      {item.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Request Type</label>
                <select name="requestType" value={form.requestType} onChange={handleFormChange} className="w-full border p-2 rounded">
                  <option value="RETURN">Return</option>
                  <option value="REPLACEMENT">Replacement</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className="ml-2 px-4 py-2 rounded border" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
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
