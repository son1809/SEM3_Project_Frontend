import React, { Fragment, createContext, useReducer, useEffect } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import { getAllProduct } from "../../admin/products/FetchApi";
import ProductCarousel from "./ProductCarousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HomeContext = createContext();

const HomeComponent = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fix: Always use the correct API base URL for fetch, not relative paths
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all products for homepage
        const allProductRes = await getAllProduct();
        if (allProductRes && Array.isArray(allProductRes.Products)) {
          setProducts(allProductRes.Products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Slider />

      {/* Single Carousel: Top picks for you */}
      <ProductCarousel
        title="Top picks for you"
        products={products && products.length > 0 ? [...products].sort(() => 0.5 - Math.random()).slice(0, 8) : []}
      />

      {/* Giới thiệu */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Shop with us</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4">
          {[
            { icon: "🚚", title: "Fast Delivery", desc: "Guaranteed on-time and safe delivery to your door." },
            { icon: "💰", title: "Best Price", desc: "Always offering great deals and market-leading prices." },
            { icon: "📞", title: "24/7 Support", desc: "Our support team is ready to assist you anytime." },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 max-w-xs text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="px-4 md:px-10 mt-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Featured Categories</h2>
        <ProductCategory />
      </section>

      {/* All products grid removed, now on /products page */}
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
