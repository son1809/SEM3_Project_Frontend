import { createOrder, startPayment } from "./FetchApi";

// Fetch cart products
export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

// New pay function for order creation
export const pay = async (
  cartProducts,
  deliveryType,
  dispatch,
  state,
  setState,
  totalCost,
  navigate
) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
    return;
  }
  // Prepare items array for backend
  const items = cartProducts.map((item) => ({
    productId: item.id,
    quantity: item.cartQuantity || 1,
  }));

  const orderData = {
    items,
    deliveryType: deliveryType || "Standard",
    deliveryAddress: state.address,
  };

  try {
    dispatch({ type: "loading", payload: true });
    let order = await createOrder(orderData);
    if (order && order.id) {
      // Start PayPal payment
      let payment = await startPayment({
        orderId: order.id,
        amount: order.totalAmount,
      });
      if (payment && payment.payUrl) {
        window.location.href = payment.payUrl; // Redirect to PayPal
      } else {
        setState({ ...state, error: "Payment initiation failed" });
        dispatch({ type: "loading", payload: false });
      }
    } else if (order && order.error) {
      setState({ ...state, error: order.error });
      dispatch({ type: "loading", payload: false });
    }
  } catch (error) {
    setState({ ...state, error: "Order failed" });
    dispatch({ type: "loading", payload: false });
  }
};
