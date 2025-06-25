import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";

const CheckoutProducts = (props) => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(LayoutContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      dispatch({ type: "cartProduct", payload: responseData.Products });
    }
  };

  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProductsList products={data.cartProduct} />
          </div>
          {/* Payment and address form would go here */}
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProductsList = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => navigate(`/products/${product.id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                    src={product.imageUrl}
                    alt="checkoutProduct"
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.name}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Price : ${product.price}.00{" "}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantity : {quantity(product.id)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    Subtotal : ${subTotal(product.id, product.price)}.00
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
