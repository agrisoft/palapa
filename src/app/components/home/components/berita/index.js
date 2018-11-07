import React from 'react';
import './index.css';


export const Berita = () => (
  <div className="berita">
    <div className="container">
      <h2 className="berita__header">
        <span className="berita__header__line" />
        Berita Geoportal
      </h2>
      <div className="berita__items">
        <div className="berita__items__wrapper">
          <div className="berita__item">
            <h4 className="berita__item__tanggal">8 September 2018</h4>
            <h3 className="berita__item__title">One Map Policy Satu Peta untuk Satu Indonesia</h3>
            <p>
              (Berita Geospasial Cibinong, 3 Januari 2017) Kebijakan Satu Peta (KSP)
              atau One Map Policy (OMP) merupakan amanat dari pemerintah kepada Badan
              Informasi Geospasial (BIG) yang bertujuan untuk mewujudkan penyelenggaraan
              Informasi Geospasial (IG) yang berdayaguna melalui kerja sama, […]
            </p>
          </div>
          <div className="berita__item">
            <h4 className="berita__item__tanggal">15 Agustus 2018</h4>
            <h3 className="berita__item__title">Informasi Geospasial Mendukung Provinsi NTB Gemilang</h3>
            <p>
              Mataram, Berita Geospasial BIG - Dalam rangka mendukung nawacita pemerintah,
              Badan Informasi Geospasial (BIG) melakukan penyelenggaraan informasi geospasial
              untuk mendukung kedaulatan pangan, energi, maritim, periwisata, kesehatan masyarakat
              dan sebagainya. Terkait dengan itu […]
            </p>
          </div>
          <div className="berita__item">
            <h4 className="berita__item__tanggal">7 Agustus 2018</h4>
            <h3 className="berita__item__title">BIG Selenggarakan Bimbingan Teknis Konseptor SNI, Editor SNI dan Asesor Akreditasi</h3>
            <p>
              Depok, Berita Geospasial BIG - Dalam upaya mewujudkan penyelenggaraan
              Informasi Geospasial (IG) yang berstandar dan meningkatkan kompetensi Sumber Daya
              Manusia (SDM) untuk merumuskan standar nasional di bidang IG, Badan Informasi
              Geospasial (BIG) bekerjasama dengan Badan Standardisasi Nasional […]
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Berita;
