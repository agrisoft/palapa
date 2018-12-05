import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

export const Kategori = ({ data }) => {
  if (data === null) return (
    <div>
      <h4>Kategori</h4>
      <div className="pencarian__loading">
        <PropagateLoader
          sizeUnit={"px"}
          size={10}
          color={'#e87171'}
          loading={true}
        />
      </div>
    </div>
  );
  return (
    <div>
      <h4>Kategori</h4>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.label}>
              <span className="pencarian__filter-item">{item.label}</span>
              <span className="pencarian__filter-count">{0}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Kategori;
