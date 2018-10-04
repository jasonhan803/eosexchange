import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import logo from './logo.svg';
import './App.css';

ScatterJS.scatter.connect("Test Dev").then(connected => {
    // User does not have Scatter Desktop, Mobile or Classic installed.
    if(!connected) {
        // User does not have Scatter installed/unlocked.
        return false;
    }

    const scatter = ScatterJS.scatter;




    let getIdentity = () => {
      scatter.getIdentity({ accounts:[{
      blockchain: 'EOS',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      protocol: 'https',
      host: 'junglenodes.eosmetal.io',
      port: 443
    }] }).then(identity => {
        console.log(identity, "identitySuccess")

      }).catch(error => {
        console.log(error, "identityCrisis")
      })
    }

    //getIdentity();

    let eos = Eos({
      keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',// private key
      httpEndpoint: 'http://jungle.cryptolions.io',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    });

    //console.log('User is connected to Scatter');

    //window.scatter = null;

});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
