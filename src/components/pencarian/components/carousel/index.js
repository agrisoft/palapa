import React from 'react';
import Slider from "react-slick";

import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  autoplay: true,
};
export const Carousel = ({ images = []}) => {
  return (
    <div className="pencarian_carousel">
      <Slider {...settings}>
      {images.map((image, index) => (
        <div key={`carousel-${index}`}>
          <div className="pencarian_carousel__image" style={{ backgroundImage: 'url("' + image + '")' }} />
        </div>
      ))}
      </Slider>
    </div>
  );
}

export default Carousel;
