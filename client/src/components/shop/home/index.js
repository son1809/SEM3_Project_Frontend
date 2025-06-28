import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />

      {/* Category Section */}
      <section className="px-4 md:px-10 mt-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Featured Categories</h2>
        <ProductCategory />
      </section>

      {/* Suggested Product Section */}
      <section className="px-4 md:px-10 mt-10">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Recommended For You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SingleProduct />
        </div>
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
