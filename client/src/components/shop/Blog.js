import React, { Fragment, useEffect } from "react";
import Layout from "./layout";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog - Hayroo Store";
  }, []);

  return (
    <Layout>
      <Fragment>
        <div className="px-0 py-10">
          <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Blog - Khám phá sản phẩm thủ công</h1>
          <p className="mb-8 text-gray-700 text-center px-6 md:px-20">
            Cùng tìm hiểu về những sản phẩm nổi bật nhất tại cửa hàng chúng tôi: từ ví da thủ công tinh tế,
            đến đồ gốm nghệ thuật và các tác phẩm gỗ điêu khắc mang đậm giá trị văn hóa.
          </p>

          {/* Post 1: Ví da */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">1. Ví da thủ công</h2>
            <img
              src="https://www.leonardo.vn/cdn/shop/files/1_f953bdb1-80d7-40c7-a609-b3043fe9eef9_1800x.png?v=1747282216"
              alt="Ví da"
              className="w-full h-auto"
            />
            <p className="text-gray-600 text-justify px-6 md:px-20 mt-4">
              Những chiếc ví da tại cửa hàng được làm hoàn toàn thủ công từ chất liệu da bò thật. Thiết kế đơn giản, tinh tế và phù hợp với cả nam lẫn nữ. Một món quà ý nghĩa cho bản thân hoặc người thân yêu.
            </p>
          </div>

          {/* Post 2: Đồ gốm */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">2. Đồ gốm nghệ thuật</h2>
            <img
              src="https://pendecor.vn/uploads/files/2022/10/27/thiet-ke-cua-hang-gom-su-5.jpg"
              alt="Đồ gốm"
              className="w-full h-auto"
            />
            <p className="text-gray-600 text-justify px-6 md:px-20 mt-4">
              Mỗi món đồ gốm là một tác phẩm mang đậm nét truyền thống. Từ những chiếc ly, chén trà đến bình hoa, tất cả đều được làm từ đất nung tự nhiên và trải qua quy trình nung kỹ lưỡng.
            </p>
          </div>

          {/* Post 3: Đồ gỗ điêu khắc */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">3. Đồ gỗ điêu khắc</h2>
            <img
              src="https://mocaulac.com/wp-content/uploads/2018/11/tranh-go-bat-ma.jpg"
              alt="Đồ gỗ điêu khắc"
              className="w-full h-auto"
            />
            <p className="text-gray-600 text-justify px-6 md:px-20 mt-4">
              Từ tượng gỗ nhỏ đến tranh treo tường, đồ gỗ điêu khắc của chúng tôi mang đến vẻ đẹp mộc mạc nhưng đầy tinh xảo. Sản phẩm không chỉ có giá trị thẩm mỹ mà còn mang ý nghĩa phong thủy.
            </p>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Blog;
