import React from "react";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const navigate = useNavigate();
  if (!product) return null;
  // Capitalize first letter of product name
  const displayName =
    product.name && product.name.charAt(0).toUpperCase() + product.name.slice(1);
  return (
    <div className="relative col-span-1 m-2 flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow h-full min-h-[260px]">
      <div
        className="w-full flex items-center justify-center overflow-hidden rounded-t-lg"
        style={{ aspectRatio: "4/5", background: "#f3f4f6" }}
      >
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          className="object-cover object-center w-4/5 h-4/5 max-h-48 max-w-xs cursor-pointer transition-transform duration-200 hover:scale-105"
          src={product.imageUrl}
          alt={displayName}
        />
      </div>
      <div className="flex flex-col flex-1 w-full px-2 py-2 justify-between">
        <div className="text-gray-800 font-medium truncate text-base md:text-lg mb-1 text-center">
          {displayName}
        </div>
        <div className="text-yellow-700 font-bold text-lg md:text-xl text-center">
          ${product.price}.00
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
