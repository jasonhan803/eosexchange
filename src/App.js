import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import logo from './logo.svg';
import SellerList from './components/SellerList'
import Sell from './components/Sell'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/sell">Sell</Link>
            <Switch>
              <Route exact path="/" component={SellerList} />
              <Route exact path="/sell" component={Sell} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
