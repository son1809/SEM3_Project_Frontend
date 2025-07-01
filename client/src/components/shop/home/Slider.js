import React, { useState, useEffect, Fragment } from "react";

const images = [
  "https://img.freepik.com/free-vector/elegant-aesthetic-luxury-jewelry-halfpage-banner-template_742173-17440.jpg?t=st=1751386487~exp=1751390087~hmac=add7b84153b83a0a2ce37be505aa874cb53e9e6994ed36ba39a77d8a7d78571f&w=1380",
  "https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321988.jpg",
  "https://img.freepik.com/free-psd/banner-ceramic-creations-ad-template_23-2148800034.jpg",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Fragment>
      <div className="w-full mt-4 flex justify-center">
        <div className="overflow-hidden rounded-lg shadow-md" style={{ width: 1200, height: 500, maxWidth: '100%' }}>
          <img
            src={images[currentIndex]}
            alt="Banner"
            className="w-full h-full object-contain transition-all duration-700 bg-white"
            style={{ width: 1200, height: 500, maxWidth: '100%', maxHeight: 500, objectFit: 'contain', background: '#fff' }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Slider;
