import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity } from "../partials/Mixins";
import { createOrder, startPayment } from "./FetchApi";

const CheckoutProducts = (props) => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(LayoutContext);
  const [shipping, setShipping] = useState("Standard");
  const [payment, setPayment] = useState("Paypal");
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [formTouched, setFormTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    dispatch({ type: "cartProduct", payload: cart });

    // Fetch user info for autofill
    const fetchUserInfo = async () => {
      try {
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const token = jwt?.token || jwt?.Token;
        if (!token) return;
        const res = await fetch("http://localhost:8080/api/auth/user/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const userData = await res.json();
        if (userData) {
          setReceiverName(userData.name || "");
          setReceiverAddress(userData.address || "");
          setReceiverEmail(userData.email || "");
        }
      } catch (err) {
        // ignore autofill errors
      }
    };
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProceed = async () => {
  if (!data.cartProduct || data.cartProduct.length === 0) {
    alert("No products in cart.");
    console.log("No products in cart", data.cartProduct);
    return;
  }

  // Prepare order data
  const items = data.cartProduct.map((item) => ({
    productId: item.id,
    quantity: item.quantitiy || item.quantity || 1,
  }));

  // Use receiver info from form
  const deliveryAddress = receiverAddress;

  // Convert deliveryType to no spaces (e.g., "Same Day" -> "SameDay")
  const deliveryTypeNoSpaces = shipping.replace(/\s+/g, "");

  // Call backend to create order
  let order;
  try {
    // Calculate total including shipping
    const totalWithShipping = orderCost + shippingCost;
    console.log("Creating order with:", { items, shipping: deliveryTypeNoSpaces, deliveryAddress, total: totalWithShipping });
    order = await createOrder({
      items,
      deliveryType: deliveryTypeNoSpaces,
      deliveryAddress,
      total: totalWithShipping,
    });
    console.log("Order creation response:", order);
  } catch (err) {
    alert("Order creation failed.");
    console.error("Order creation error:", err);
    return;
  }

  if (!order || !order.id) {
    alert("Order creation failed.");
    console.error("Order object missing or invalid:", order);
    return;
  }

  // call startPayment with the order details
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    console.log("Starting payment with:", {
      orderId: order.id,
      amount: order.totalAmount,
      token: jwt?.Token || jwt?.token,
    });
    const res = await startPayment({
      orderId: order.id,
      amount: order.totalAmount,
      token: jwt?.Token || jwt?.token,
    });
    console.log("Payment response:", res);
    if (res && res.payUrl) {
      window.location.href = res.payUrl; // Redirect to PayPal
    } else {
      navigate("/payment-failed");
      console.error("No payUrl in payment response", res);
    }
  } catch (err) {
    alert("Payment initiation failed.");
    console.error("Payment initiation error:", err);
  }
};

  // Calculate order cost
  const orderCost = (data.cartProduct && data.cartProduct.length > 0)
    ? data.cartProduct.reduce((sum, item) => sum + (item.price * (item.quantitiy || item.quantity || 1)), 0)
    : 0;

  // Shipping cost by method
  let shippingCost = 0;
  if (shipping === "Standard") shippingCost = 5;
  else if (shipping === "Express") shippingCost = 8;
  else if (shipping === "Same Day") shippingCost = 12;

  const totalCost = orderCost + shippingCost;

  return (
    <Fragment>
      <section className="mx-auto max-w-4xl mt-20 md:mt-32 lg:mt-24 bg-white rounded-lg shadow-lg p-8">
        <div className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Product List */}
          <div className="md:w-2/3 w-full mb-8 md:mb-0">
            <CheckoutProductsList products={data.cartProduct} />
            {/* Order Summary Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow flex flex-col items-end">
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-gray-700 text-lg mb-2">
                  <span>Order cost:</span>
                  <span>${orderCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg mb-2">
                  <span>Shipping cost:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900 text-xl font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {/* Info Form */}
            <form className="mt-8 p-6 bg-gray-50 rounded-lg shadow flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">Receiver Name <span className="text-red-500">*</span></label>
                <input type="text" className="border rounded px-3 py-2" value={receiverName} onChange={e => { setReceiverName(e.target.value); setFormTouched(true); }} required />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">Receiver Address <span className="text-red-500">*</span></label>
                <input type="text" className="border rounded px-3 py-2" value={receiverAddress} onChange={e => { setReceiverAddress(e.target.value); setFormTouched(true); }} required />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">Receiver Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  className={`border rounded px-3 py-2 ${!emailValid && receiverEmail ? 'border-red-500' : ''}`}
                  value={receiverEmail}
                  onChange={e => {
                    setReceiverEmail(e.target.value);
                    setFormTouched(true);
                    // Simple email regex validation
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    setEmailValid(re.test(e.target.value));
                  }}
                  required
                />
                {!emailValid && receiverEmail && (
                  <span className="text-red-500 text-sm mt-1">Please enter a valid email address.</span>
                )}
              </div>
            </form>
          </div>

          {/* Payment and shipping form */}
          <div className="md:w-1/3 w-full bg-gray-50 rounded-lg p-6 flex flex-col space-y-6 shadow">
            <div>
              <div className="text-lg font-semibold mb-3 text-gray-700">Shipping Method</div>
              <div className="space-y-4">
                {[
                  {
                    value: "Standard",
                    title: "Standard",
                    description: "5-7 working days • $5.00",
                  },
                  {
                    value: "Express",
                    title: "Express",
                    description: "1-2 working days • $8.00",
                  },
                  {
                    value: "Same Day",
                    title: "Same Day",
                    description: "Same day delivery (city only) • $12.00",
                  },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`block border rounded-lg p-4 cursor-pointer shadow-sm transition hover:shadow-md ${
                      shipping === method.value ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.value}
                        checked={shipping === method.value}
                        onChange={(e) => setShipping(e.target.value)}
                        className="mt-1 h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                      />
                      <div className="ml-4">
                        <div className="text-md font-semibold text-gray-800">{method.title}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2 text-gray-700">Payment Method</div>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center border rounded-lg p-4 cursor-pointer shadow-sm transition hover:shadow-md ${payment === "Paypal" ? "border-yellow-500 bg-yellow-50" : "border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Paypal"
                    checked={payment === "Paypal"}
                    onChange={() => setPayment("Paypal")}
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                  />
                  <img src="https://icon2.cleanpng.com/20180917/fvk/kisspng-logo-paypal-europe-services-ltd-vector-graphics-br-1713939922605.webp" alt="PayPal" className="h-8 ml-4" />
                  <span className="ml-2 font-semibold text-gray-800">PayPal</span>
                </label>
                <label className={`flex items-center border rounded-lg p-4 cursor-pointer shadow-sm transition hover:shadow-md ${payment === "CoD" ? "border-yellow-500 bg-yellow-50" : "border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="CoD"
                    checked={payment === "CoD"}
                    onChange={() => setPayment("CoD")}
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-4 font-semibold text-gray-800">Cash on Delivery (CoD)</span>
                </label>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
              className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded text-lg shadow transition duration-200 ${(!receiverName || !receiverAddress || !receiverEmail || !emailValid) ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!receiverName || !receiverAddress || !receiverEmail || !emailValid}
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
