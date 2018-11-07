import React from 'react';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import Jelajah from './components/jelajah';
import Pencarian from './components/pencarian';

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

export default App;

