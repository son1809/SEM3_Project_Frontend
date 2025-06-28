import React, { useState, useEffect, Fragment } from "react";

const images = [
  "https://source.unsplash.com/1600x500/?shopping,store",
  "https://source.unsplash.com/1600x500/?handmade,art",
  "https://source.unsplash.com/1600x500/?gift,craft",
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
      <div className="w-full mt-4">
        <div className="overflow-hidden rounded-lg shadow-md">
          <img
            src={images[currentIndex]}
            alt="Banner"
            className="w-full h-60 object-cover transition-all duration-700"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Slider;
