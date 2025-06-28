import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const fallbackImages = [
  "https://www.gomnghethuat.com/wp-content/uploads/Thap-Gom-Nghe-Thuat.jpg",
  "https://bantranh.com/wp-content/uploads/2022/07/tranh-phong-canh-bien1.jpg",
  "https://www.eovietnam.com/wp-content/uploads/2021/09/unnamed-6.jpg",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5a-lvb2u3pnqgyiba@resize_w900_nl.webp",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rbkm-lpl98xyicezff7@resize_w900_nl.webp",
  "https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72"
];

const ProductCategory = ({ pickedCategoryId }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { catId } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
      {categories.length > 0 ? (
        categories.map((cat, idx) => {
          const isPicked = String(cat.id) === String(pickedCategoryId);
          return (
            <div
              key={cat.id}
              onClick={() => navigate(`/products/category/${cat.id}`)}
              className={`flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform ${isPicked ? 'bg-yellow-200 border-2 border-yellow-600 rounded-lg shadow-lg' : ''}`}
              style={isPicked ? { boxShadow: '0 0 0 3px #facc15' } : {}}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
                <img
                  src={fallbackImages[idx % fallbackImages.length]}
                  alt={cat.name}
                  className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/80' }}
                />
              </div>
              <span className="mt-2 text-sm md:text-base text-gray-700 font-semibold">{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</span>
            </div>
          );
        })
      ) : (
        <div className="col-span-4 text-center text-gray-500">No categories found</div>
      )}
    </div>
  );
};

export default ProductCategory;
