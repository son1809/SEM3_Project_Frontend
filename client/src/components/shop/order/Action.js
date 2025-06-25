import { createOrder } from "./FetchApi";

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
    let response = await createOrder(orderData);
    if (response && response.id) {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({ type: "cartProduct", payload: null });
      dispatch({ type: "cartTotalCost", payload: null });
      dispatch({ type: "orderSuccess", payload: true });
      setState({ ...state, error: null, success: "Order placed successfully!" });
      dispatch({ type: "loading", payload: false });
      navigate("/dashboard/orders");
    } else if (response && response.error) {
      setState({ ...state, error: response.error });
      dispatch({ type: "loading", payload: false });
    }
  } catch (error) {
    setState({ ...state, error: "Order failed" });
    dispatch({ type: "loading", payload: false });
  }
};
