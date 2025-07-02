import React, { Fragment, useEffect } from "react";
import Layout from "./layout";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog - Hayroo Store";
  }, []);

  return (
    <Layout>
      <Fragment>
        <div className="max-w-6xl mx-auto py-12 px-4 md:px-10 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Blog – Explore Our Bestselling Products & Gift Ideas
          </h1>
          <p className="mb-14 text-gray-700 text-center px-4 md:px-20 lg:px-40 text-lg">
            Explore the most outstanding products at our store: from elegant handcrafted leather wallets, to artistic ceramics, and intricately carved wooden artworks that embody cultural value.
          </p>

          {/* Post 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Handcrafted Leather Wallets</h2>
              <p className="text-gray-600 text-justify">
                Our leather wallets are entirely handmade from genuine cowhide. The design is simple, elegant, and suitable for both men and women. A meaningful gift for yourself or your loved ones.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://www.leonardo.vn/cdn/shop/files/1_f953bdb1-80d7-40c7-a609-b3043fe9eef9_1800x.png?v=1747282216"
                alt="Leather Wallet"
                className="rounded-xl shadow-md w-full h-auto object-cover border border-gray-200"
              />
            </div>
          </div>

          {/* Post 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Artistic Ceramics</h2>
              <p className="text-gray-600 text-justify">
                Each ceramic piece is a work of art rich in tradition. From tea cups and mugs to vases, all are made from natural clay and undergo a meticulous firing process.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://pendecor.vn/uploads/files/2022/10/27/thiet-ke-cua-hang-gom-su-5.jpg"
                alt="Ceramics"
                className="rounded-xl shadow-md w-full h-auto object-cover border border-gray-200"
              />
            </div>
          </div>

          {/* Post 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Carved Wooden Artworks</h2>
              <p className="text-gray-600 text-justify">
                From small wooden statues to wall hangings, our carved wooden artworks offer a rustic yet sophisticated beauty. These products are not only aesthetically pleasing but also carry positive meanings for your home.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://mocaulac.com/wp-content/uploads/2018/11/tranh-go-bat-ma.jpg"
                alt="Carved Wood Art"
                className="rounded-xl shadow-md w-full h-auto object-cover border border-gray-200"
              />
            </div>
          </div>

          {/* Post 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Artistic Stamps</h2>
              <p className="text-gray-600 text-justify">
                Our collection of artistic stamps celebrates history, culture, and craftsmanship. Each stamp is carefully designed with intricate details, often inspired by national symbols, traditional art, or nature. Whether you're a collector or just someone who appreciates fine detail, these stamps offer a small but meaningful piece of artistry.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://inanaz.com.vn/wp-content/uploads/2019/11/B%E1%BB%99-s%C6%B0u-t%E1%BA%ADp-tem-Vi%E1%BB%87t-Nam-ch%E1%BB%A7-%C4%91%E1%BB%81-B%C3%A1c-H%E1%BB%93.jpg"
                alt="Ceramics"
                className="rounded-xl shadow-md w-full h-auto object-cover border border-gray-200"
              />
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Blog;
