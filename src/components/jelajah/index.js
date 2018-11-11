import React, { useState, useEffect } from 'react';
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
      Jelajah: {height}
    </div>
  );
};

export default Jelajah;
