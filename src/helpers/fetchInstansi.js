import { useState } from 'react';
import config from '../config';

let isFetching = false;
let storedData = null;
export const fetchInstansi = () => {
  const [dataInstansi, setDataInstansi] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/group/listl`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.organization,
            value: item.organization,
            image: item.logo,
            url: '#'
          });
          return true;
        });
        storedData = data;
        setDataInstansi(data);
      });
  }
  return dataInstansi;
};

export default fetchInstansi;