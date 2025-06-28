import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Ceramic Vase", img: "https://www.gomnghethuat.com/wp-content/uploads/Thap-Gom-Nghe-Thuat.jpg" },
  { name: "Oil Painting", img: "https://bantranh.com/wp-content/uploads/2022/07/tranh-phong-canh-bien1.jpg" },
  { name: "Tea Set", img: "https://www.gomnghethuat.com/wp-content/uploads/Bo-Am-Chen-Gom-Dep.jpg" },
  { name: "Document Bag", img: "https://www.eovietnam.com/wp-content/uploads/2021/09/unnamed-6.jpg" },
  { name: "Greeting Card", img: "https://down-vn.img.susercontent.com/file/cc8d8a387fb0a29420876018488fb5d2@resize_w900_nl.webp" },
  { name: "File Folder", img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5a-lvb2u3pnqgyiba@resize_w900_nl.webp" },
  { name: "Doll", img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbkm-lpl98xyicezff7@resize_w900_nl.webp" },
  { name: "Gift Bag", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8n8stlaycuf40.webp" }
];

const ProductCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          onClick={() => navigate(`/products/category/${encodeURIComponent(cat.name)}`)}
          className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
            <img
              src={cat.img}
              alt={cat.name}
              className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/80' }}
            />
          </div>
          <span className="mt-2 text-sm md:text-base text-gray-700">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
