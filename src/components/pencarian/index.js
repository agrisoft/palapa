import React from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Header from '../../library/header';
import { Carousel } from './components/carousel';
import { Kategori } from './components/kategori';
import { Instansi } from './components/instansi';
import { ListDataset } from './components/list-dataset';
import { Footer } from '../../library/footer';
import { useMedia } from '../../helpers/use-media';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBanners } from '../../helpers/fetchBanners';
import { fetchKategori } from '../../helpers/fetchKategori';
import { fetchInstansi } from '../../helpers/fetchInstansi';
import { fetchDataset } from '../../helpers/fetchDataset';
import './index.scss';

const Pencarian = () => {
  const dataSettings = fetchSettings();
  const dataBanner = fetchBanners();
  const dataInstansi = fetchInstansi();
  const dataKategori = fetchKategori();
  const dataDataset = fetchDataset();
  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let className = '';
  if (isSmall) {
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
  }

  let pagination = (
    <div className="pagination">
      <span className="pagination__item">1</span>
      <span className="pagination__item-current">2</span>
      <span className="pagination__item">2</span>
      <span className="pagination__item">3</span>
      <span className="pagination__item">4</span>
    </div>
  )
  pagination = null;

  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="pencarian">
        <div className="pencarian__banner">
          <Carousel images={dataBanner.images} />
          <div className="pencarian__banner__overlay">
            <div className="container">
              <h2>Pencarian Data</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pencarian__filter">
            <h3>Filter Pencarian</h3>
            <div className="pencarian__panel">
              <h4>Batas Pencarian</h4>
              <div className="pencarian__peta">
                <Map center={[ -6.175985, 106.827313 ]} zoom={12} zoomControl={false}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ZoomControl position="topleft" />
                </Map>
              </div>
              <Kategori data={dataKategori} />
              <Instansi data={dataInstansi} />
            </div>
          </div>
          <div className="pencarian__content">
            <div className="pencarian__input-wrapper">
              <a href="#submit-search" className="pencarian__submit">
                <span className="icon-magnifier" />
              </a>
              <input type="text" placeholder="Kata Kunci" className="pencarian__input" />
            </div>
            <div className="pencarian__dataset__list">
              <ListDataset data={dataDataset} />
            </div>
           {pagination}
          </div>
        </div>
        <Footer dataSettings={dataSettings} />
      </div>
    </div>
  );
};

export default Pencarian;
