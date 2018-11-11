import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet'

import './index.css';

const Jelajah = () => {
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() =>{
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return (
    <div className="jelajah" style={{ height }}>
      <Map center={[ -6.175985, 106.827313 ]} zoom={12} zoomControl={false}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
      </Map>
    </div>
  );
};

export default Jelajah;
