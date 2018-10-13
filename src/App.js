import React, { Component } from 'react';
import { connect } from 'react-redux';

import SaleList from './components/SaleList'
import Buy from './components/Buy'
import BuySell from './components/BuySell'
import Header from './components/Header'
import Footer from './components/Footer'
import Confirmation from './components/Confirmation'
import Sell from './components/Sell'
import TransferForm from './components/TransferForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
              <Route exact path="/buy" component={SaleList} />
              <Route exact path="/buy/:id" component={Buy} />
              <Route exact path="/transfer" component={TransferForm} />
              <Route exact path="/confirmation" component={Confirmation} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(App);
