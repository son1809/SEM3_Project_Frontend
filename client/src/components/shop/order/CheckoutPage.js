import React, { Fragment } from "react";
import Layout from "../layout";
import CheckoutProducts from "./CheckoutProducts";

const CheckoutPage = (props) => {
  return (
    <Fragment>
      <Layout children={<CheckoutProducts />} />
    </Fragment>
  );
};

export default CheckoutPage;
