import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Header from './library/header';
import Home from './components/home';
import Jelajah from './components/jelajah';
import Pencarian from './components/pencarian';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { useMedia } from './helpers/use-media';
import config from './config';

const App = () => {
  const [dataSettings, setDataSettings] = useState({});
  const [isFetchedSettings, setFetchedSettings] = useState(false);
  if (!isFetchedSettings) {
    setFetchedSettings(true);
    fetch(`${config.api}/sisteminfo`)
      .then(res => res.json())
      .then(json => {
        setDataSettings({
          organization: json.organization,
          logo: json.logo,
          tentangkami: json.tentangkami,
          address: [
            json.address,
            json.city,
            json.postalcode,
            json.administrativearea,
            json.country
          ].join(', '),
          email: json.email,
          phone: json.phone,
          fax: json.fax
        });
      });
  }

  let isSmall = useMedia("(max-width: 760px)");
  let isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let className = isSmall ? 'layout-small' : '';
  if (!className && isMedium) {
    className = 'layout-medium';
  }
  return (
    <Router>
      <div className={className}>
        <Header
          logo={dataSettings.logo}
          organization={dataSettings.organization}
        />
        <Route path="/" exact component={() => <Home dataSettings={dataSettings} />} />
        <Route path="/jelajah/" component={Jelajah} />
        <Route path="/pencarian/" component={() => <Pencarian dataSettings={dataSettings} />} />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
