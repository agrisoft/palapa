import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
let storedData = null;
export const fetchDatasetTerbaru = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
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
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchDatasetTerbaru;
