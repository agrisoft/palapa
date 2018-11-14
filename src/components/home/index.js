import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Select from 'react-select';

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

const colourStyles = {
  control: styles => ({ ...styles,
    borderRadius: 0,
    height: 60,
    backgroundColor: '#f1f1f1',
  }),
};

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
        <div className="banner__overlay" />
      </div>
      <div className="home__search">
        <div className="container">
          <p className="home__search__intro">
              Geoportal PALAPA merupakan salah satu simpul Jaringan Informasi Geospasial Nasional (JIGN). 
              Data dan informasi geospasial disediakan dalam bentuk GIS web services dan dapat ditelusuri 
              keberadaan datanya.
          </p>
          <div className={searchClassName}>
            <span
              className="search__advanced-link"
              onClick={() => {
                window.dispatchEvent(new Event('resize'));
                setAdvanceActive(!isAdvanceActive);
              }}
            >
              <span className="icon-settings" />
            </span>
            <a href="#submit-search" className="search__submit">
              <span className="icon-magnifier" />
            </a>
            <div className="search__select-wrapper">
              <div className="search__select-kategori">
                <Select placeholder="Semua Kategori" options={dataKategori.data} styles={colourStyles} />
              </div>
              <div className="search__select-walidata">
                <Select placeholder="Semua Walidata" options={dataWalidata.data} styles={colourStyles} />
              </div>
            </div>
            <input type="text" placeholder="Kata Kunci" className="search__input" />
            <div className="search__map-wrapper" style={{ height: isAdvanceActive ? 650 : 0}}>
              <div className="search__map">
                <Map center={[ -6.175985, 106.827313 ]} zoom={12} zoomControl={false}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ZoomControl position="topleft" />
                </Map>
              </div>
            </div>
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
