import React from 'react';
import './index.scss';

export const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="footer__didukung">
        <h3 className="footer__header">Didukung Oleh</h3>
        <div className="footer__logo">
          <a className="footer__logo__item" href="#">
            <img src="/assets/images/logo-big.png" alt="BIG" />
          </a>
          <a className="footer__logo__item" href="#">
            <img src="/assets/images/logo-footer.png" alt="BIG" />
          </a>
        </div>
      </div>
      <div className="footer__kontak">
        <h3 className="footer__header">Kontak Kami</h3>
        <p>
          Geoportal Demo BIG<br />
          Jl. Sultan Hairun, Kota Ambon, 97126, Maluku, Indonesia
        </p>
        <p>Email: shanearil@gmail.com</p>
      </div>
      <div className="footer__tentang">
        <h3 className="footer__header">Tentang Kami</h3>
        <p>
          Geoportal PALAPA dikembangkan oleh Badan Informasi Geospasial (BIG) dan dapat
          digunakan secara bebas oleh Kementerian dan Lembaga, Pemerintah Provinsi,
          Pemerintah Kota dan Kabupaten sebagai aplikasi simpul jaringan di instansi 
          masing-masing. Geoportal PALAPA ini merupakan aplikasi open source.
        </p>
        <p>&copy; 2018 Badan Informasi Geospasial All rights reserved.</p>
      </div>
    </div>
  </div>
);

export default Footer;
