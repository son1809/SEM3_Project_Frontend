import React, { useEffect, useState, Fragment } from "react";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Layout from "./layout";
import ProductCategory from "./home/ProductCategory";
import SingleProduct from "./home/SingleProduct";
import { getAllProduct } from "../admin/products/FetchApi";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllProduct();
        if (res && Array.isArray(res.Products)) {
          setProducts(res.Products);
          // Set price range based on products
          const prices = res.Products.map(p => Number(p.price)).filter(p => !isNaN(p));
          if (prices.length > 0) {
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
          }
        } else {
          setProducts([]);
        }
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filtering logic
  let filteredProducts = products;
  if (nameFilter.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name && p.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
    );
  }
  if (products.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }

  return (
    <Layout>
      {/* Categories Section */}
      <section className="px-4 md:px-10 mt-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Categories</h2>
        <ProductCategory />
      </section>
      {/* All Products Section */}
      <section className="px-4 md:px-10 mt-10">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">All Products</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-end bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Search by name..."
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
        <div className="flex flex-col flex-1 min-w-[200px] max-w-xs">
          <label className="text-gray-700 font-semibold mb-1">Price Range</label>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full flex items-center justify-between mb-1">
              <span className="text-gray-600 text-sm">${priceRange[0]}</span>
              <span className="text-gray-600 text-sm">${priceRange[1]}</span>
            </div>
            <div className="w-full px-2">
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={setPriceRange}
                allowCross={false}
                trackStyle={[{ backgroundColor: '#facc15' }]}
                handleStyle={[{ borderColor: '#facc15' }, { borderColor: '#facc15' }]}
                railStyle={{ backgroundColor: '#e5e7eb' }}
              />
            </div>
            <div className="w-full flex justify-between text-xs text-gray-400 mt-1">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
        </div>
        {loading ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">Loading...</div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product, idx) => (
              <SingleProduct key={idx} product={product} />
            ))}
          </div>
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No product found</div>
        )}
      </section>
    </Layout>
  );
};

export default AllProductsPage;
