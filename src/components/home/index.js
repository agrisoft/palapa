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
import { useMedia } from '../../helpers/use-media';
import config from '../../config';

export const Home = () => {
  const [dataSettings, setDataSettings] = useState({});
  const [isLoadingSettings, setLoadingSettings] = useState(true);
  const [isFetchedSettings, setFetchedSettings] = useState(false);
  if (!isFetchedSettings) {
    setFetchedSettings(true);
    fetch(`${config.api}/sisteminfo`)
      .then(res => res.json())
      .then(json => {
        setLoadingSettings(false);
        setDataSettings({
          organization: json.organization,
          image: json.logo,
        });
      });
  }

  const [dataInstansi, setDataInstansi] = useState([]);
  const [isLoadingInstansi, setLoadingInstansi] = useState(true);
  const [isFetchedInstansi, setFetchedInstansi] = useState(false);
  if (!isFetchedInstansi) {
    setFetchedInstansi(true);
    fetch(`${config.api}/group/listl`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.organization,
            image: item.logo,
          });
        });
        setLoadingInstansi(false);
        setDataInstansi(data);
      });
  }

  const [dataWeb, setDataWeb] = useState([]);
  const [isLoadingWeb, setLoadingWeb] = useState(true);
  const [isFetchedWeb, setFetchedWeb] = useState(false);
  if (!isFetchedWeb) {
    setFetchedWeb(true);
    fetch(`${config.api}/linkweb/list`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.nama,
            image: item.logo,
          });
        });
        setLoadingWeb(false);
        setDataWeb(data);
      });
  }

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
      <DatasetTerbaru />
      <Kategori />
      <LinkCarousel title="Instansi" data={dataInstansi} isLoading={isLoadingInstansi} />
      <LinkCarousel title="Web GIS" data={dataWeb} isLoading={isLoadingWeb} />
      <Berita />
      <Footer />
    </div>
  );
};

export default Home;
