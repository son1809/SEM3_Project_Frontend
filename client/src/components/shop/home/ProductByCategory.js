import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import SingleProduct from "./SingleProduct";

const ProductByCategory = () => {
  const { catId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const allProducts = await getAllProduct();
        const filtered = allProducts.filter((item) =>
          item.category.toLowerCase().includes(catId.toLowerCase())
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchCategoryProducts();
  }, [catId]);

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-6">
        Products in "{catId}"
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, idx) => (
            <SingleProduct key={idx} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductByCategory;
