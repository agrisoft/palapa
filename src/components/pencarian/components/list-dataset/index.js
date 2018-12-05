import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Dataset } from '../../../../library/dataset'

export const ListDataset = ({ data }) => {
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
      {data.map((item) => (
        <div key={item.identifier} className="pencarian__dataset__list__item">
          <Dataset {...item} />
        </div>
      ))}
    </div>
  );
};

export default ListDataset;
