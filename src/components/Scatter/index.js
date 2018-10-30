import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import RegisteredSeller from './../../components/RegisteredSeller';
import scatterLogo from './../../images/scatter.svg';
import { Link } from 'react-router-dom';


class Scatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getIdentity = (scatter) => {
    scatter.getIdentity({ accounts:[{
    blockchain: 'EOS',
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    protocol: 'http',
    host: 'junglenodes.eosmetal.io',
    port: 443
  }] }).then(identity => {
      // Callback to Parent Component to update redux with identity
      this.props.scatterCallback(true, identity);
    }).catch(error => {
      console.log(error, "identityCrisis")
    })
  }

  componentDidMount() {
    let connectToScatter = () => {
      ScatterJS.scatter.connect("Test Dev").then(connected => {
        // User does not have Scatter Desktop, Mobile or Classic installed.
        if(!connected) {
            // User does not have Scatter installed/unlocked.
            return false;
        }

        const scatter = ScatterJS.scatter;
        this.getIdentity(scatter);
      })
    }

    // If already has scatter...
    if (!this.props.scatterRegistered) {
      connectToScatter();
    }
  }


  render() {
    let userForm;
    // User on Scatter
    if (this.props.scatterRegistered) {
      userForm = (
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Welcome, {this.props.identity.accounts[0].name}</h1>
            <p>
              <Link to="/buy" className="btn btn-primary my-2">Buy</Link>
              <Link to="/sell" className="btn btn-secondary my-2">Sell</Link>
            </p>
          </div>
        </section>
      )
    }

    // Not on Scatter
    else {
      userForm = (
        <section className="jumbotron text-center">
          <div className="container">
            <img className="d-block mx-auto mb-4" src={scatterLogo} alt="" width="72" height="72" />
            <h1 className="jumbotron-heading">You need Scatter to Login</h1>
            <a href="https://get-scatter.com/" target="_blank" className="btn btn-primary my-2">Get Scatter</a>
          </div>
        </section>
      )
    }

    return (
        <div>
          {userForm}
        </div>
    );
  }
}

export default Scatter;
