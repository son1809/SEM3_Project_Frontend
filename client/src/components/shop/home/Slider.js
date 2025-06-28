import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    // Remove sliderImages(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2">
        {/* Remove all sliderImages UI, just show placeholder */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-xl font-light w-full bg-orange-200 rounded py-2">
          No slide image found
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
