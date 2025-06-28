import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity } from "../partials/Mixins";

const CheckoutProducts = (props) => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(LayoutContext);
  const [shipping, setShipping] = useState("Standard");
  const [payment, setPayment] = useState("Paypal");

  useEffect(() => {
    // Instead of fetchData, just load cart from localStorage
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    dispatch({ type: "cartProduct", payload: cart });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProceed = () => {
    // Placeholder for payment flow
    alert(`Proceeding to payment with ${payment} and ${shipping} shipping.`);
    // Here you would redirect to payment page or start payment flow
  };

  // Calculate total order cost
  const totalCost = (data.cartProduct && data.cartProduct.length > 0)
    ? data.cartProduct.reduce((sum, item) => sum + (item.price * (item.quantitiy || item.quantity || 1)), 0)
    : 0;

  return (
    <Fragment>
      <section className="mx-auto max-w-4xl mt-20 md:mt-32 lg:mt-24 bg-white rounded-lg shadow-lg p-8">
        <div className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Product List */}
          <div className="md:w-2/3 w-full mb-8 md:mb-0">
            <CheckoutProductsList products={data.cartProduct} />
            {/* Total Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow flex flex-col items-end">
              <div className="text-2xl font-bold text-gray-700">Total: <span className="text-yellow-600">${totalCost}.00</span></div>
            </div>
          </div>
          {/* Payment and shipping form */}
          <div className="md:w-1/3 w-full bg-gray-50 rounded-lg p-6 flex flex-col space-y-6 shadow">
            <div>
              <div className="text-lg font-semibold mb-2 text-gray-700">Shipping Method</div>
              <select
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={shipping}
                onChange={e => setShipping(e.target.value)}
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="Same Day">Same Day</option>
              </select>
            </div>
            <div>
              <div className="text-lg font-semibold mb-2 text-gray-700">Payment Method</div>
              <select
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={payment}
                onChange={e => setPayment(e.target.value)}
                disabled
              >
                <option value="Paypal">Paypal (only supported)</option>
              </select>
            </div>
            <button
              onClick={handleProceed}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded text-lg shadow transition duration-200"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProductsList = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-6">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="flex items-center bg-gray-100 rounded-lg p-4 shadow"
              >
                <img
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="cursor-pointer h-20 w-20 object-cover object-center rounded mr-6 border border-gray-300"
                  src={product.imageUrl}
                  alt="checkoutProduct"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-gray-800 truncate">{product.name}</div>
                  <div className="text-lg text-gray-600">Price: <span className="font-bold">${product.price}.00</span></div>
                  <div className="text-lg text-gray-600">Quantity: <span className="font-bold">{quantity(product.id)}</span></div>
                  <div className="text-lg text-gray-600">Subtotal: <span className="font-bold">${subTotal(product.id, product.price)}.00</span></div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-xl text-center text-gray-500">No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
