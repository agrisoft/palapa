import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

import { Carousel } from './components/carousel';
import { Berita } from './components/berita';
import { LinkCarousel } from './components/link-carousel';
import { Kategori } from './components/kategori';
import { DatasetTerbaru } from './components/dataset-terbaru';
import { Footer } from '../../library/footer';
import './index.scss';
import 'simple-line-icons/css/simple-line-icons.css'
import dataWeb from './data/web.json';
import dataWalidata from './data/walidata.json';
import dataKategori from './data/kategori.json';
import dataTerbaru from './data/terbaru.json';

export const Home = () => {
  const [isAdvanceActive, setAdvanceActive] = useState(false);
  let searchClassName = 'search';
  if (isAdvanceActive) {
    searchClassName = 'search search-active';
  }

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
          <div className={searchClassName}>
            <span
              className="search__advanced-link"
              onClick={() => setAdvanceActive(!isAdvanceActive)}
            >
              <span className="icon-settings" />
            </span>
            <a href="#submit-search" className="search__submit">
              <span className="icon-magnifier" />
            </a>
            <input type="text" placeholder="Kata Kunci" className="search__input" />
          </div>
        </div>
      </div>
      <Berita />
      <LinkCarousel title="Web GIS" data={dataWeb.data} />
      <LinkCarousel title="Walidata" data={dataWalidata.data} />
      <Kategori data={dataKategori.data} />
      <DatasetTerbaru data={dataTerbaru.data} />
      <Footer />
    </div>
  );
};

export default Home;
