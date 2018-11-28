import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
export const fetchKategori = () => {
  const [data, setData] = useState(null);
  if (!isFetching) {
    isFetching = true;
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
          return true;
        });
        setData(data);
      });
  }
  return data;
};

export default fetchKategori;
