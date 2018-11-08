import React from 'react';
import Slider from "react-slick";

import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  rows: 1,
  autoplaySpeed: 2000,
  autoplay: true,
  arrows: false,
};

export const LinkCarousel = ({ title, data }) => (
  <div className="link-carousel">
    <div className="container link-carousel__wrapper">
      <h2 className="link-carousel__header">
        <span className="link-carousel__header__line" />
        {title}
      </h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div className="link-carousel__item-wrapper">
            <a
              className="link-carousel__item"
              href={item.link}
            >
              <span className="link-carousel__item__logo">
                <img className="link-carousel__item__image" src={item.image} alt="" />
              </span>
              <span className="link-carousel__item__label">{item.label}</span>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default LinkCarousel;
