import React from 'react';
import Dataset from '../../../../library/dataset';
import './index.scss';

export const DatasetTerbaru = ({ data }) => (
  <div className="dataset-terbaru">
    <div className="container dataset-terbaru__wrapper">
      <h2 className="dataset-terbaru__header">
        <span className="dataset-terbaru__header__line" />
        Dataset Terbaru
      </h2>
      <div className="dataset-terbaru__list">
        {data.map((item) => (
          <div className="dataset-terbaru__list__item">
            <Dataset {...item} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DatasetTerbaru;
