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
  const [categories, setCategories] = React.useState([]);
  const [categoryProducts, setCategoryProducts] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await fetch("/api/Category");
        const catData = await catRes.json();
        setCategories(catData);

        const productData = {};
        for (const cat of catData) {
          const prodRes = await fetch(`/api/Category/${cat.id}/products`);
          const prod = await prodRes.json();
          productData[cat.name] = prod;
        }
        setCategoryProducts(productData);
      } catch (err) {
        console.error("Failed to load carousel data", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Slider />
      
      {/* Banner */}
      <section className="relative w-full h-64 md:h-96 flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500">
        <img
          src="#"
          alt="Banner"
          className="absolute w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center text-black">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Welcome to Hayroo E-commerce!
          </h1>
          <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">
            Easy shopping, home delivery, and daily deals!
          </p>
          <a
            href="#"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Carousel per Category */}
      {categories.map((cat) =>
        categoryProducts[cat.name] && categoryProducts[cat.name].length > 0 ? (
          <ProductCarousel
            key={cat.id}
            title={`Top Picks in ${cat.name}`}
            products={categoryProducts[cat.name].slice(0, 8)}
          />
        ) : null
      )}

      {/* Optional: Fallback grid */}
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
