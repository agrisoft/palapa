import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Dataset } from '../../../../library/dataset'

export const ListDataset = ({ data, filter }) => {
  if (data === null) return (
    <div>
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
      {data.map((item) => {
        if (filter.kategori) {
          if (Array.isArray(filter.kategori)) {
            if (filter.kategori.indexOf(item.kategori) < 0) return null;
          } else {
            if (item.kategori !== filter.kategori) return null;
          }
        }
        if (filter.instansi) {
          if (Array.isArray(filter.instansi)) {
            if (filter.instansi.indexOf(item.author) < 0) return null;
          } else {
            if (item.author !== filter.instansi) return null;
          }
        }
        return (
          <div key={item.identifier} className="pencarian__dataset__list__item">
            <Dataset {...item} />
          </div>
        )
      })}
    </div>
  );
};

export default ListDataset;
