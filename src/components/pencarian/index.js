import React, { useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { Carousel } from './components/carousel';
import { Footer } from '../../library/footer';
import { Dataset } from '../../library/dataset';
import dataWalidata from './data/walidata.json';
import dataKategori from './data/kategori.json';
import dataDataset from './data/dataset.json';
import './index.scss';

const Pencarian = () => {
  return (
    <div className="pencarian">
      <div className="pencarian__banner">
        <Carousel />
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
            <h4>Walidata</h4>
            <ul>
              {dataWalidata.data.map((item) => {
                return (
                  <li>
                    <span className="pencarian__filter-item">{item.label}</span>
                    <span className="pencarian__filter-count">{item.count || 0}</span>
                  </li>
                )
              })}
            </ul>
            <h4>Kategori</h4>
            <ul>
              {dataKategori.data.map((item) => {
                return (
                  <li>
                    <span className="pencarian__filter-item">{item.label}</span>
                    <span className="pencarian__filter-count">{item.count || 0}</span>
                  </li>
                )
              })}
            </ul>
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
            {dataDataset.data.map((item) => (
              <div className="pencarian__dataset__list__item">
                <Dataset {...item} />
              </div>
            ))}
          </div>
          <div className="pagination">
            <span className="pagination__item">1</span>
            <span className="pagination__item-current">2</span>
            <span className="pagination__item">2</span>
            <span className="pagination__item">3</span>
            <span className="pagination__item">4</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pencarian;
