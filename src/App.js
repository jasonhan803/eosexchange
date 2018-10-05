import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import logo from './logo.svg';
import BuySell from './components/BuySell'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

ScatterJS.scatter.connect("Test Dev").then(connected => {
    // User does not have Scatter Desktop, Mobile or Classic installed.
    if(!connected) {
        // User does not have Scatter installed/unlocked.
        return false;
    }

    const scatter = ScatterJS.scatter;


});

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={BuySell} />
            </Switch>

          </header>
        </div>
      </Router>
    );
  }
}

export default App;
