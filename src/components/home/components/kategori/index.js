import React, { useState } from 'react';
import fetch from 'node-fetch';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './index.scss';
import config from '../../../../config';

export const Kategori = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetched, setFetched] = useState(false);

  if (!isFetched) {
    setFetched(true);
    fetch(`${config.api}/jumlahdataset`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        const recentData = json.slice(0, 4);
        recentData.map((item) => {
          data.push({
            link: '#',
            label: item.keywords,
            image: item.logo
          });
        });
        setLoading(false);
        setData(data);
      });
  }
  if (isLoading) {
    return (
      <div className="kategori kategori-loading">
        <PropagateLoader
          className={{
            width: 1,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          sizeUnit={"px"}
          size={10}
          color={'#fff'}
          loading={true}
        />
      </div>
    );
  }
  if (data.length < 1) return null;
  return (
    <div className="kategori">
      <div className="container kategori__wrapper">
        <h2 className="kategori__header">
          <span className="kategori__header__line" />
          Kategori
        </h2>
        <div className="kategori__item-list">
          {data.map((item) => (
            <div key={item.label} className="kategori__item-wrapper">
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
}

export default Kategori;
