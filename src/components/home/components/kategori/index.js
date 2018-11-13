import React from 'react';
import './index.scss';

export const Kategori = ({ title, data }) => (
  <div className="kategori">
    <div className="container kategori__wrapper">
      <h2 className="kategori__header">
        <span className="kategori__header__line" />
        Kategori Dataset
      </h2>
      <div className="kategori__item-list">
        {data.map((item) => (
          <div className="kategori__item-wrapper">
            <a
              className="kategori__item"
              href={item.link}
            >
              <span className="kategori__item__logo">
                <img className="kategori__item__image" src={item.image} alt="" />
              </span>
              <span className="kategori__item__label">{item.label}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Kategori;
