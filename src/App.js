import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import { connect } from 'react-redux';
import logo from './logo.svg';
import Buy from './components/Buy'
import Buying from './components/Buying'
import BuySell from './components/BuySell'
import Header from './components/Header'
import Footer from './components/Footer'
import Confirmation from './components/Confirmation'
import Sell from './components/Sell'
import TransferForm from './components/TransferForm'
import { simpleAction } from './actions/identity'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Header />
          <main role="main">
            <Switch>
              <Route exact path="/" component={BuySell} />
              <Route exact path="/sell" component={Sell} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/buy/:id" component={Buying} />
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

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
