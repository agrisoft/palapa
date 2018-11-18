import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

import './index.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function useMedia(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

export const LinkCarousel = ({ title, data }) => {
  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");

  let numItems = 6;
  if (isSmall) numItems = 4;
  if (isMedium) numItems = 5;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: numItems,
    slidesToScroll: numItems,
    rows: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
  };
  return (
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
};

export default LinkCarousel;
