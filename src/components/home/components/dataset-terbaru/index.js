import React, { useState } from 'react';
import fetch from 'node-fetch';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Dataset from '../../../../library/dataset';
import './index.scss';
import config from '../../../../config';

export const DatasetTerbaru = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetched, setFetched] = useState(false);

  if (!isFetched) {
    setFetched(true);
    fetch(`${config.api}/listmetalayer`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        const recentData = json.slice(0, 4);
        recentData.map((item) => {
          data.push({
            identifier: item.identifier,
            title: item.title,
            kategori: item.keywords,
            image: `${config.host}/gsassets/thumbnails/` + item.identifier.replace(/:/,'-') + '.png',
            author: item.workspace,
          });
          return true;
        });
        setLoading(false);
        setData(data);
      });
  }
  if (isLoading) {
    return (
      <div className="dataset-terbaru">
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
    <div className="dataset-terbaru">
      <div className="container dataset-terbaru__wrapper">
        <h2 className="dataset-terbaru__header">
          <span className="dataset-terbaru__header__line" />
          Dataset Terbaru
        </h2>
        <div className="dataset-terbaru__list">
          {data.map((item) => (
            <div key={item.identifier} className="dataset-terbaru__list__item">
              <Dataset {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatasetTerbaru;
