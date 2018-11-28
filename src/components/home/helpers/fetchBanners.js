import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
export const fetchBanners = () => {
  const [dataBanner, setDataBanner] = useState([]);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/frontend`)
      .then(res => res.json())
      .then(json => {
        let images = [];
        if (json[0].image_1) images.push(json[0].image_1);
        if (json[0].image_2) images.push(json[0].image_2);
        if (json[0].image_3) images.push(json[0].image_3);
        if (json[0].image_4) images.push(json[0].image_4);
        setDataBanner({
          tagline: json[0].remark_1,
          images
        });
      });
  }
  return dataBanner;
};

export default fetchBanners;
