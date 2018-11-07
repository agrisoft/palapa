import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import Jelajah from './components/jelajah';
import Pencarian from './components/pencarian';
import './index.css';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <Router>
    <div>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/jelajah/" component={Jelajah} />
      <Route path="/pencarian/" component={Pencarian} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
