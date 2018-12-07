import React, { useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import queryString from 'query-string';
import Header from '../../library/header';
import { Carousel } from './components/carousel';
import { Kategori } from './components/kategori';
import { Instansi } from './components/instansi';
import { ListDataset } from './components/list-dataset';
import { Footer } from '../../library/footer';
import { useMedia } from '../../helpers/use-media';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBanners } from '../../helpers/fetchBanners';
import { fetchKategori } from '../../helpers/fetchKategori';
import { fetchInstansi } from '../../helpers/fetchInstansi';
import { fetchDataset } from '../../helpers/fetchDataset';
import { addCountInstansi } from './helpers/add-count-instansi';
import { addCountKategori } from './helpers/add-count-kategori';
import './index.scss';

const paginationPerPage = 12;
let filterMaxExtent;

const findMaxExtent = (dataDataset) => {
  if (filterMaxExtent) return filterMaxExtent;
  let extent;
  dataDataset.map((item) => {
    if (!extent) {
      extent = item.bbox;
    } else {
      if (item.bbox[0][0] < extent[0][0]) {
        extent[0][0] = item.bbox[0][0];
      }
      if (item.bbox[0][1] < extent[0][1]) {
        extent[0][1] = item.bbox[0][1];
      }
      if (item.bbox[1][0] > extent[1][0]) {
        extent[1][0] = item.bbox[1][0];
      }
      if (item.bbox[1][1] > extent[1][1]) {
        extent[1][1] = item.bbox[1][1];
      }
    }
    return item;
  });
  filterMaxExtent = extent;
  return extent;
}

const Pencarian = ({ location, history }) => {
  const filter = queryString.parse(location.search);
  const currentPage = filter.page || 1;
  delete filter.page;
  const [ keyword, setKeyword ] = useState(filter.keyword);
  const dataSettings = fetchSettings();
  const dataBanner = fetchBanners();
  const dataInstansi = fetchInstansi();
  const dataKategori = fetchKategori();
  const dataDataset = fetchDataset() || [];

  const finalDataKategori = addCountKategori(dataKategori, dataDataset);
  const finalDataInstansi = addCountInstansi(dataInstansi, dataDataset);

  const maxExtent = findMaxExtent(dataDataset);
  let filterMapProps;
  let map = null;
  if (maxExtent) {
    filterMapProps = {
      bounds: maxExtent,
      zoomControl: false
    };

    map = (
      <Map
        {...filterMapProps}
        onMoveend={(e) => {
          const map = e.target;
          const curBounds =  map.getBounds();
          const south = curBounds.getSouth();
          const west = curBounds.getWest();
          const east = curBounds.getEast();
          const north = curBounds.getNorth();
          filter.bounds = [[south, west], [north, east]];
          history.push(`/pencarian?${queryString.stringify(filter)}`);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
      </Map>
    );
  }

  if (!filter.bounds) {
    filter.bounds = queryString.stringify(maxExtent);
  }

  let filteredDataset = dataDataset.filter((item) => {
    if (filter.kategori) {
      if (Array.isArray(filter.kategori)) {
        if (filter.kategori.indexOf(item.kategori) < 0) return false;
      } else {
        if (item.kategori !== filter.kategori) return false;
      }
    }
    if (filter.instansi) {
      if (Array.isArray(filter.instansi)) {
        if (filter.instansi.indexOf(item.author) < 0) return false;
      } else {
        if (item.author !== filter.instansi) return false;
      }
    }
    if (filter.keyword && !item.title.toLowerCase().includes(filter.keyword.toLowerCase())) return false;

    if (filter.bounds) {
      const swString = filter.bounds[0].split(',');
      const nwString = filter.bounds[1].split(',');
      const sw = [parseFloat(swString[0]), parseFloat(swString[1])];
      const nw = [parseFloat(nwString[0]), parseFloat(nwString[1])];
      const bbox = [sw, nw];
      const curMapBounds = latLngBounds(bbox);
      const itemBounds = latLngBounds(item.bbox);
      return curMapBounds.intersects(itemBounds);
    }

    return true;
  });

  let pagination = null;

  if (filteredDataset.length > paginationPerPage) {
    const startPage = (currentPage - 1) * paginationPerPage;
    const endPage = startPage + paginationPerPage;

    let paginateNext = null;
    let paginatePrev = null;

    if (endPage < filteredDataset.length) {
      const filterNext = {
        ...filter,
        page: parseInt(currentPage) + 1
      };
      paginateNext = (
        <span
          className="pagination__next"
          onClick={() => {
            history.push('/pencarian?' + queryString.stringify(filterNext));
          }}
        >
          Selanjutnya <span className="icon-arrow-right" />
        </span>
      );
    }
    if (currentPage > 1) {
      const filterPrev = {
        ...filter,
        page: parseInt(currentPage) - 1
      };
      paginatePrev = (
        <span
          className="pagination__prev"
          onClick={() => {
            history.push('/pencarian?' + queryString.stringify(filterPrev));
          }}
        >
          <span className="icon-arrow-left" /> Sebelumnya
        </span>
      );
    }

    filteredDataset = filteredDataset.splice(startPage, paginationPerPage);

    pagination = (
      <div className="pagination">
        {paginateNext}
        {paginatePrev}
      </div>
    )
  }

  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let className = '';
  if (isSmall) {
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
  }

  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="pencarian">
        <div className="pencarian__banner">
          <Carousel images={dataBanner.images} />
          <div className="pencarian__banner__overlay">
            <div className="container">
              <h2>Pencarian Data</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pencarian__filter">
            <h3>Filter Pencarian</h3>
            <div className="pencarian__panel">
              <h4>Batas Pencarian</h4>
              <div className="pencarian__peta">
                {map}
              </div>
              <Kategori data={finalDataKategori} filter={filter} history={history} />
              <Instansi data={finalDataInstansi} filter={filter} history={history} />
            </div>
          </div>
          <div className="pencarian__content">
            <div className="pencarian__input-wrapper">
              <a
                href="#submit-search"
                className="pencarian__submit"
                onClick={(e) => {
                  e.preventDefault();
                  const nextFilter = {
                    ...filter,
                    keyword
                  };
                  const query = queryString.stringify(nextFilter);
                  history.push(`/pencarian?${query}`);
                }}
              >
                <span className="icon-magnifier" />
              </a>
              <input
                type="text"
                placeholder="Kata Kunci"
                className="pencarian__input"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const nextFilter = {
                      ...filter,
                      keyword
                    };
                    const query = queryString.stringify(nextFilter);
                    history.push(`/pencarian?${query}`);
                  }
                }}
              />
            </div>
            <div className="pencarian__dataset__list">
              <ListDataset data={filteredDataset} />
            </div>
           {pagination}
          </div>
        </div>
        <Footer dataSettings={dataSettings} />
      </div>
    </div>
  );
};

export default Pencarian;
