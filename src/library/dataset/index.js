import React from 'react';

import './index.css';

export const Dataset = ({
  title,
  kategori,
  author,
  image
}) => (
  <div className="dataset">
    <div className="dataset__actions">
      <a href="#map" className="dataset__actions-map">
        <span className="icon-map" />
      </a>
      <a href="#info" className="dataset__actions-info">
        <span className="icon-info" />
      </a>
      <a href="#download" className="dataset__actions-download">
        <span className="icon-cloud-download" />
      </a>
    </div>
    <div className="dataset__image-wrapper">
      <img className="dataset__image" src={image} alt="" />
    </div>
    <div className="dataset__title">{title}</div>
    <div className="dataset__kategori">{kategori}</div>
    <div className="dataset__author">{author}</div>
  </div>
);

export default Dataset;
