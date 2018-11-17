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


export const Home = () => {
  const [isAdvanceActive, setAdvanceActive] = useState(false);
  let isSmall = useMedia("(max-width: 760px)");
  let isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let searchClassName = 'search';
  if (isAdvanceActive) {
    searchClassName = 'search search-active';
  }

  const selectColorStyles = {
    control: styles => ({ ...styles,
      borderRadius: 0,
      height: isSmall ? 40 : 60,
      backgroundColor: '#f1f1f1',
    }),
  };

  let mapHeight = 650;
  if (isSmall) {
    mapHeight = 200;
  } else if (isMedium) {
    mapHeight = 400;
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
            <span className="search__submit-wrapper">
              <a href="#submit-search" className="search__submit">
                <span className="icon-magnifier" />
              </a>
            </span>
            <div className="search__select-wrapper">
              <div className="search__select-kategori">
                <Select placeholder="Semua Kategori" options={dataKategori.data} styles={selectColorStyles} />
              </div>
              <div className="search__select-walidata">
                <Select placeholder="Semua Instansi" options={dataWalidata.data} styles={selectColorStyles} />
              </div>
            </div>
            <span className="search__input-wrapper">
              <input type="text" placeholder="Kata Kunci" className="search__input" />
            </span>
            <div className="search__map-wrapper" style={{ height: isAdvanceActive ? mapHeight : 0}}>
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
      <DatasetTerbaru data={dataTerbaru.data} />
      <Kategori data={dataKategori.data} />
      <LinkCarousel title="Instansi" data={dataWalidata.data} />
      <LinkCarousel title="Web GIS" data={dataWeb.data} />
      <Berita />
      <Footer />
    </div>
  );
};

export default Home;
