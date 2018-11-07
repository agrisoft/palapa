import React, { Component } from 'react';
import { Carousel } from './components/carousel';
import { Berita } from './components/berita';
import './index.css';
import 'simple-line-icons/css/simple-line-icons.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  autoplay: true,
};
class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="banner">
          <Carousel />
          <div className="banner__overlay">
            <p className="banner__intro">
                Geoportal PALAPA merupakan salah satu simpul Jaringan Informasi Geospasial Nasional (JIGN). 
                Data dan informasi geospasial disediakan dalam bentuk GIS web services dan dapat ditelusuri 
                keberadaan datanya.
            </p>
            <div className="search">
              <a href="#advanced-search" className="search__advanced-link">
                <span className="icon-settings" />
              </a>
              <a href="#submit-search" className="search__submit">
                <span className="icon-magnifier" />
              </a>
              <input type="text" placeholder="Kata Kunci" className="search__input" />
            </div>
          </div>
        </div>
        <Berita />
        <div>
          Web GIS
        </div>
        <div>
          Walidata
        </div>
        <div>
          Kategori Dataset
        </div>
        <div>
          Dataset Terbaru
        </div>
        <div>
          Footer
        </div>
      </div>
    );
  }
}

export default Home;
