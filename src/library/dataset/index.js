import React, { useState } from 'react';
import Modal from 'react-modal';
import config from '../../config';
import './index.scss';
import { MetadataPanel } from './components/metadata-panel';
import { mappingMetadata } from './helpers/mapping-metadata';

Modal.setAppElement('#root');

export const Dataset = ({
  title,
  kategori,
  author,
  image,
  identifier
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metadata, setMetadata] = useState([]);

  const getMetadata = () => {
    fetch(`${config.host}/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${identifier}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`)
      .then(res => res.json())
      .then(json => {
        const metadata = mappingMetadata(json);
        setMetadata(metadata);
        setIsOpen(true);
      });
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
      >
        <div className="dataset__metadata__header">
          <h3 className="dataset__metadata__title">{title}</h3>
          <span className="dataset__metadata__close" onClick={() => setIsOpen(false)}>
            <span className="icon-close" />
          </span>
        </div>
        <div className="dataset__metadata__content">
          {metadata.map((item, key) => <MetadataPanel key={key} {...item} />)}
        </div>
      </Modal>
      <div className="dataset">
        <div className="dataset__actions">
          <a href="#map" className="dataset__actions-map">
            <span className="icon-map" />
          </a>
          <a
            href="#info"
            className="dataset__actions-info"
            onClick={() => getMetadata()}
          >
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
    </div>
  );
}

export default Dataset;
