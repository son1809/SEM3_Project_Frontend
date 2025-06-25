import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";
import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const sProduct = layoutData.singleProductDetail;
  const [count, setCount] = useState(0);
  const [quantitiy, setQuantitiy] = useState(1);
  const [, setAlertq] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          });
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() });
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
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
  } else if (!sProduct) {
    return <div>No product</div>;
  }
  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.categoryId,
          product: sProduct.name,
          category: sProduct.categoryName,
        }}
      />
      <section className="m-4 md:mx-12 md:my-6">
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-4 md:mr-2">
            <img
              className="cursor-pointer w-20 h-20 object-cover object-center"
              src={sProduct.imageUrl}
              alt="pic"
            />
          </div>
          <div className="col-span-2 md:col-span-7">
            <div className="relative">
              <img
                className="w-full"
                src={sProduct.imageUrl}
                alt="Pic"
              />
            </div>
          </div>
          <div className="col-span-2 mt-8 md:mt-0 md:col-span-4 md:ml-6 lg:ml-12">
            <div className="flex flex-col leading-8">
              <div className="text-2xl tracking-wider">{sProduct.name}</div>
              <div className="flex justify-between items-center">
                <span className="text-xl tracking-wider text-yellow-700">
                  ${sProduct.price}.00
                </span>
              </div>
            </div>
            <div className="my-4 md:my-6 text-gray-600">
              {sProduct.description}
            </div>
            <div className="my-4 md:my-6">
              {+quantitiy === +sProduct.inventoryQuantity ? (
                <span className="text-xs text-red-500">Stock limited</span>
              ) : (
                ""
              )}
              <div
                className={`flex justify-between items-center px-4 py-2 border ${
                  +quantitiy === +sProduct.inventoryQuantity && "border-red-500"
                }`}
              >
                <div
                  className={`${
                    quantitiy === sProduct.inventoryQuantity && "text-red-500"
                  }`}
                >
                  Quantity
                </div>
                {/* Quantity Button */}
                {sProduct.inventoryQuantity !== 0 ? (
                  <Fragment>
                    <div className="flex items-center space-x-2">
                      <span
                        onClick={(e) =>
                          updateQuantity(
                            "decrease",
                            sProduct.inventoryQuantity,
                            quantitiy,
                            setQuantitiy,
                            setAlertq
                          )
                        }
                      >
                        <svg
                          className="w-5 h-5 fill-current cursor-pointer"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold">{quantitiy}</span>
                      <span
                        onClick={(e) =>
                          updateQuantity(
                            "increase",
                            sProduct.inventoryQuantity,
                            quantitiy,
                            setQuantitiy,
                            setAlertq
                          )
                        }
                      >
                        <svg
                          className="w-5 h-5 fill-current cursor-pointer"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </Fragment>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>
                      <svg
                        className="w-5 h-5 fill-current cursor-not-allowed"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">{quantitiy}</span>
                    <span>
                      <svg
                        className="w-5 h-5 fill-current cursor-not-allowed"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                )}
                {/* Quantity Button End */}
              </div>
              {/* Incart and out of stock button */}
              {sProduct.inventoryQuantity !== 0 ? (
                <Fragment>
                  {layoutData.inCart !== null &&
                  layoutData.inCart.includes(sProduct.id) === true ? (
                    <div
                      style={{ background: "#303031" }}
                      className={`px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75`}
                    >
                      In cart
                    </div>
                  ) : (
                    <div
                      onClick={(e) =>
                        addToCart(
                          sProduct.id,
                          quantitiy,
                          sProduct.price,
                          layoutDispatch,
                          setQuantitiy,
                          setAlertq,
                          fetchData,
                          totalCost
                        )
                      }
                      style={{ background: "#303031" }}
                      className={`px-4 py-2 text-white text-center cursor-pointer uppercase`}
                    >
                      Add to cart
                    </div>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    style={{ background: "#303031" }}
                    disabled={true}
                    className="px-4 py-2 text-white opacity-50 cursor-not-allowed text-center uppercase"
                  >
                    Out of stock
                  </div>
                </Fragment>
              )}
              {/* Incart and out of stock button End */}
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section two */}
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;
