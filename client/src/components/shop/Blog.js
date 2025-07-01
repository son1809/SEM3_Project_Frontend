import React, { Fragment, useEffect } from "react";
import Layout from "./layout";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog - Hayroo Store";
  }, []);

  return (
    <Layout>
      <Fragment>
        <div className="max-w-3xl mx-auto py-12 px-4 md:px-12 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Blog - Discover Our Handcrafted Products</h1>
          <p className="mb-10 text-gray-700 text-center px-2 md:px-10 lg:px-20">
            Explore the most outstanding products at our store: from elegant handcrafted leather wallets, to artistic ceramics, and intricately carved wooden artworks that embody cultural value.
          </p>

          {/* Post 1: Leather Wallets */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">1. Handcrafted Leather Wallets</h2>
            <div className="flex justify-center mb-4">
              <img
                src="https://www.leonardo.vn/cdn/shop/files/1_f953bdb1-80d7-40c7-a609-b3043fe9eef9_1800x.png?v=1747282216"
                alt="Leather Wallet"
                className="rounded-xl shadow-md max-w-full h-auto object-cover border border-gray-200"
                style={{ maxHeight: 320 }}
              />
            </div>
            <p className="text-gray-600 text-justify px-2 md:px-10 lg:px-20 mt-2">
              Our leather wallets are entirely handmade from genuine cowhide. The design is simple, elegant, and suitable for both men and women. A meaningful gift for yourself or your loved ones.
            </p>
          </div>

          {/* Post 2: Artistic Ceramics */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">2. Artistic Ceramics</h2>
            <div className="flex justify-center mb-4">
              <img
                src="https://pendecor.vn/uploads/files/2022/10/27/thiet-ke-cua-hang-gom-su-5.jpg"
                alt="Ceramics"
                className="rounded-xl shadow-md max-w-full h-auto object-cover border border-gray-200"
                style={{ maxHeight: 320 }}
              />
            </div>
            <p className="text-gray-600 text-justify px-2 md:px-10 lg:px-20 mt-2">
              Each ceramic piece is a work of art rich in tradition. From tea cups and mugs to vases, all are made from natural clay and undergo a meticulous firing process.
            </p>
          </div>

          {/* Post 3: Carved Wooden Artworks */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">3. Carved Wooden Artworks</h2>
            <div className="flex justify-center mb-4">
              <img
                src="https://mocaulac.com/wp-content/uploads/2018/11/tranh-go-bat-ma.jpg"
                alt="Carved Wood Art"
                className="rounded-xl shadow-md max-w-full h-auto object-cover border border-gray-200"
                style={{ maxHeight: 320 }}
              />
            </div>
            <p className="text-gray-600 text-justify px-2 md:px-10 lg:px-20 mt-2">
              From small wooden statues to wall hangings, our carved wooden artworks offer a rustic yet sophisticated beauty. These products are not only aesthetically pleasing but also carry positive meanings for your home.
            </p>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Blog;
