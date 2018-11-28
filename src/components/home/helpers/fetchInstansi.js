import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
export const fetchInstansi = () => {
  const [dataInstansi, setDataInstansi] = useState(null);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/group/listl`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.organization,
            image: item.logo,
            url: '#'
          });
          return true;
        });
        setDataInstansi(data);
      });
  }
  return dataInstansi;
};

export default fetchInstansi;
