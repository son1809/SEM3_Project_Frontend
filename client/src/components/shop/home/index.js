import React, { Fragment, createContext, useReducer, useEffect } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import { getAllProduct } from "../../admin/products/FetchApi";

export const HomeContext = createContext();

const HomeComponent = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProduct().then((res) => {
      if (res && res.Products) setProducts(res.Products);
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">Loading...</div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, idx) => (
              <SingleProduct key={idx} product={product} />
            ))}
          </div>
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No product found</div>
        )}
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
