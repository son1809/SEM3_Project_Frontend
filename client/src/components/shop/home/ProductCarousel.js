import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SingleProduct from "./SingleProduct";

const ProductCarousel = ({ title, products }) => {
  return (
    <section className="px-4 md:px-10 mt-10">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <SingleProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;
