import React, { useState } from 'react';
import Modal from 'react-modal';
import get from 'lodash/get';
import { Map, TileLayer, WMSTileLayer, ZoomControl } from 'react-leaflet';
import { Link } from "react-router-dom";
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
  identifier,
  downloadable
}) => {
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [metadata, setMetadata] = useState([]);
  const [mapCenter, setMapCenter] = useState([ -6.175985, 106.827313 ]);

  const getMetadata = () => {
    fetch(`${config.host}/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${identifier}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`)
      .then(res => res.json())
      .then(json => {
        const metadata = mappingMetadata(json);
        setMetadata(metadata);
        setIsMetadataOpen(true);
      });
  };

  const openMap = () => {
    fetch(`${config.host}/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${identifier}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`)
      .then(res => res.json())
      .then(json => {
        const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:identificationInfo.gmd:MD_DataIdentification.';
        const extent = [
          parseFloat(get(json, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:westBoundLongitude.gco:Decimal`)),
          parseFloat(get(json, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:eastBoundLongitude.gco:Decimal`)),
          parseFloat(get(json, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:southBoundLatitude.gco:Decimal`)),
          parseFloat(get(json, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:northBoundLatitude.gco:Decimal`))
        ];
        setMapCenter([
          (extent[2] + extent[3]) / 2,
          (extent[0] + extent[1]) / 2,
        ]);
        setIsMapOpen(true);
      });
  };
  let downloadIcon = null;
  if (downloadable === 'Y') {
    downloadIcon = (
      <a
        href={`${config.dowloadWfs}${identifier}&outputFormat=shape-zip`}
        className="dataset__actions-download"
      >
        <span className="icon-cloud-download" />
      </a>
    );
  }
  return (
    <div>
      <Modal
        isOpen={isMapOpen}
        onRequestClose={() => setIsMapOpen(false)}
      >
        <div className="dataset__map">
          <div className="dataset__map__header">
            <h3 className="dataset__map__title">{title}</h3>
            <span className="dataset__map__close" onClick={() => setIsMapOpen(false)}>
              <span className="icon-close" />
            </span>
          </div>
          <Map center={mapCenter} zoom={12} zoomControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <WMSTileLayer
              layers={identifier}
              url={config.wms}
              transparent
              format="image/png"
            />
            <ZoomControl position="topleft" />
          </Map>
        </div>
      </Modal>
      <Modal
        isOpen={isMetadataOpen}
        onRequestClose={() => setIsMetadataOpen(false)}
      >
        <div className="dataset__metadata__header">
          <h3 className="dataset__metadata__title">{title}</h3>
          <span className="dataset__metadata__close" onClick={() => setIsMetadataOpen(false)}>
            <span className="icon-close" />
          </span>
        </div>
        <div className="dataset__metadata__content">
          {metadata.map((item, key) => <MetadataPanel key={key} {...item} />)}
        </div>
      </Modal>
      <div className="dataset">
        <div className="dataset__actions">
          <a
            href="#map"
            className="dataset__actions-map"
            onClick={() => openMap()}
          >
            <span className="icon-map" />
          </a>
          <a
            href="#info"
            className="dataset__actions-info"
            onClick={() => getMetadata()}
          >
            <span className="icon-info" />
          </a>
          {downloadIcon}
        </div>
        <div
          className="dataset__image-wrapper"
          onClick={() => openMap()}
        >
          <span className="dataset__image-aligner" />
          <img className="dataset__image" src={image} alt="" />
        </div>

        <Link className="dataset__kategori" to={`/pencarian?kategori=${kategori}`}>{kategori}</Link>
        <div className="dataset__title-wrapper">
          <a href="#info" className="dataset__title" onClick={() => getMetadata()}>{title}</a>
        </div>
        <Link className="dataset__author" to={`/pencarian?instansi=${author}`}>{author}</Link>
      </div>
    </div>
  );
}

export default Dataset;
