import React, { useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Select from 'react-select';
import Header from '../../library/header';

import { Carousel } from './components/carousel';
import { DatasetTerbaru } from './components/dataset-terbaru';
import { Kategori } from './components/kategori';
import { LinkCarousel } from './components/link-carousel';
import { Berita } from './components/berita';
import { Footer } from '../../library/footer';
import './index.scss';
import 'simple-line-icons/css/simple-line-icons.css'
import dataWalidataTmp from './data/walidata.json';
import dataKategoriTmp from './data/kategori.json';
import { useMedia } from '../../helpers/use-media';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBerita } from '../../helpers/fetchBerita';
import { fetchDataset } from '../../helpers/fetchDataset';
import { fetchBanners } from './helpers/fetchBanners';
import { fetchKategori } from './helpers/fetchKategori';
import { fetchInstansi } from './helpers/fetchInstansi';
import { fetchWeb } from './helpers/fetchWeb';

export const Home = ({ history }) => {
  const dataSettings = fetchSettings();
  const dataBanner = fetchBanners();
  const dataset = fetchDataset();
  const datasetTerbaru = (dataset === null) ? null : dataset.slice(0, 4);
  const dataKategori = fetchKategori();
  const dataInstansi = fetchInstansi();
  const dataWeb = fetchWeb();
  const dataBerita = fetchBerita();

  const [isAdvanceActive, setAdvanceActive] = useState(false);
  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
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
  let className = '';
  if (isSmall) {
    mapHeight = 200;
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
    mapHeight = 400;
  }

  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="home">
        <div className="banner">
          <Carousel images={dataBanner.images} />
          <div className="banner__overlay" />
        </div>
        <div className="home__search">
          <div className="container">
            <p className="home__search__intro">{dataBanner.tagline}</p>
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
                  <Select placeholder="Semua Kategori" options={dataKategoriTmp.data} styles={selectColorStyles} />
                </div>
                <div className="search__select-walidata">
                  <Select placeholder="Semua Instansi" options={dataWalidataTmp.data} styles={selectColorStyles} />
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
      </div>
      <DatasetTerbaru data={datasetTerbaru} />
      <Kategori data={dataKategori} />
      <LinkCarousel
        title="Instansi"
        data={dataInstansi}
        isSmall={isSmall}
        isMedium={isMedium}
      />
      <LinkCarousel
        title="Web GIS"
        data={dataWeb}
        isSmall={isSmall}
        isMedium={isMedium}
      />
      <Berita
        data={dataBerita}
        clickHandler={(id) => history.push(`/berita/${id}`)}
      />
      <Footer dataSettings={dataSettings} />
    </div>
  );
};

export default Home;
