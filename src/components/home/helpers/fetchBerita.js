import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
export const fetchBerita = () => {
  const [data, setData] = useState(null);
  if (!isFetching) {
    isFetching = true;
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
        setData(data);
      });
  }
  return data;
};

export default fetchBerita;
