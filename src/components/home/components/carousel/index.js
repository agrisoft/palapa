import React from 'react';
import Slider from "react-slick";

import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';

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
        <div className="carousel__image" style={{ backgroundImage: 'url("' + image1 + '")' }} />
      </div>
      <div>
        <div className="carousel__image" style={{ backgroundImage: 'url("' + image2 + '")' }} />
      </div>
      <div>
        <div className="carousel__image" style={{ backgroundImage: 'url("' + image3 + '")' }} />
      </div>
    </Slider>
  </div>
);

export default Carousel;
