import React from 'react';
import Slider from "react-slick";

import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  autoplay: true,
};

export const Carousel = () => (
  <div className="carousel">
    <Slider {...settings}>
      <div>
        <div className="carousel__image" style={{ backgroundImage: 'url("/assets/images/slider/1.jpg")' }} />
      </div>
      <div>
        <div className="carousel__image" style={{ backgroundImage: 'url("/assets/images/slider/2.jpg")' }} />
      </div>
      <div>
        <div className="carousel__image" style={{ backgroundImage: 'url("/assets/images/slider/3.jpg")' }} />
      </div>
    </Slider>
  </div>
);

export default Carousel;
