import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
export const fetchWeb = () => {
  const [data, setData] = useState(null);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/linkweb/list`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.name,
            image: item.image,
            url: item.url
          });
          return true;
        });
        setData(data);
      });
  }
  return data;
};

export default fetchWeb;
