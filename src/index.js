import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Home from './components/home';
import Jelajah from './components/jelajah';
import Pencarian from './components/pencarian';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/jelajah/" component={Jelajah} />
        <Route path="/pencarian/" component={Pencarian} />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
