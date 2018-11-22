import React, { useState } from 'react';
import fetch from 'node-fetch';
import PropagateLoader from 'react-spinners/PropagateLoader';
import config from '../../../../config';
import './index.scss';

export const Berita = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetched, setFetched] = useState(false);

  if (!isFetched) {
    setFetched(true);
    fetch(`${config.api}/berita/list`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        const recentData = json.slice(0, 3);
        recentData.map((item) => {
          data.push({
            title: item.judul,
            date: item.tanggal,
            content: item.stripped || '',
          });
          return true;
        });
        setLoading(false);
        setData(data);
      });
  }
  if (isLoading) {
    return (
      <div className="berita">
        <PropagateLoader
          className={{
            width: 1,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          sizeUnit={"px"}
          size={10}
          color={'#e87171'}
          loading={true}
        />
      </div>
    );
  }
  if (data.length < 1) return null;
  return (
    <div className="berita">
      <div className="container">
        <h2 className="berita__header">
          <span className="berita__header__line" />
          Berita Geoportal
        </h2>
        <div className="berita__items">
          <div className="berita__items__wrapper">
            {data.map((item, index) => (
              <div key={`berita-${index}`} className="berita__item">
                <h4 className="berita__item__tanggal">{item.date}</h4>
                <h3 className="berita__item__title">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
