import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import RegisteredSeller from './../../components/RegisteredSeller';


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
    // Seller/Buyer is on Scatter
    if (this.props.scatterRegistered) {
      userForm = (
          <RegisteredSeller {...this.props} />
      )
    }
    // Need to get on Scatter
    else {
      userForm = (
        <a className="nav-link" href="/">Scatter</a>)
    }

    return (
        <div>
          {userForm}
        </div>
    );
  }
}

export default Scatter;
