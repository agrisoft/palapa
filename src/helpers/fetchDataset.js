import { useState } from 'react';
import config from '../config';

let isFetching = false;
let storedData = null;
export const fetchDataset = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/listmetalayer`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            identifier: item.identifier,
            title: item.title,
            downloadable: item.downloadable,
            kategori: item.keywords,
            image: `${config.host}/gsassets/thumbnails/` + item.identifier.replace(/:/,'-') + '.png',
            author: item.workspace,
          });
          return true;
        });
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchDataset;
