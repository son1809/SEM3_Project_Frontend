import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import ProductCategory from "./ProductCategory";
import SingleProduct from "./SingleProduct";

const ProductByCategory = () => {
  const { catId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/category/${catId}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data); // support both {products:[]} and []
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
    // Fetch category name from category API
    fetch(`http://localhost:8080/api/category/${catId}`)
      .then((res) => res.json())
      .then((catData) => setCategoryName(catData.name ? catData.name.charAt(0).toUpperCase() + catData.name.slice(1) : ""))
      .catch(() => setCategoryName(""));
  }, [catId]);

  return (
    <Layout>
      <section className="px-4 md:px-10 mt-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Categories</h2>
        <ProductCategory pickedCategoryId={catId} />
      </section>
      <section className="px-4 md:px-10 mt-10">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Products in {categoryName ? `"${categoryName}"` : `category #${catId}`}
        </h2>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, idx) => (
              <SingleProduct key={idx} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products found in this category.</p>
        )}
      </section>
    </Layout>
  );
};

export default ProductByCategory;
