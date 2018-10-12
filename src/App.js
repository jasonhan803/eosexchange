import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import logo from './logo.svg';
import Buy from './components/Buy'
import BuySell from './components/BuySell'
import Header from './components/Header'
import Footer from './components/Footer'
import Confirmation from './components/Confirmation'
import Sell from './components/Sell'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main role="main">
            <Switch>
              <Route exact path="/" component={BuySell} />
              <Route exact path="/sell" component={Sell} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/confirmation" component={Confirmation} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
