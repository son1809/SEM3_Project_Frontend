export const subTotal = (id, price) => {
  let subTotalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  carts.forEach((item) => {
    if (item.id === id) {
      subTotalCost = (item.quantitiy || item.quantity || 0) * price;
    }
  });
  return subTotalCost;
};

export const quantity = (id) => {
  let product = 0;
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  carts.forEach((item) => {
    if (item.id === id) {
      product = item.quantitiy || item.quantity || 0;
    }
  });
  return product;
};

export const totalCost = () => {
  let totalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  carts.forEach((item) => {
    totalCost += (item.quantitiy || item.quantity || 0) * item.price;
  });
  return totalCost;
};
