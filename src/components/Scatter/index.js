import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import TransferForm from './../../components/TransferForm';
import SalesForm from './../../components/SalesForm';


class Scatter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isScatter: false,
      userName: ''
    };
  }

  handleChange = (event) => {
    //this.setState({value: event.target.value});
  }


  componentWillMount() {

  }

  componentDidMount() {
    let config = {
      keyProvider: '5LLKiY1D3tCndrF5NW5tJa1enukCfrPNopUJwnkUmfErT8d11eN',
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);

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
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        protocol: 'http',
        host: 'junglenodes.eosmetal.io',
        //host: 'dev.cryptolions.io',
        port: 443
      }] }).then(identity => {
          console.log(identity, "identitySuccess");
          // might have to passback userName
          this.props.callback(true, identity);
          this.setState({isScatter: true, userName: identity.accounts[0].name })
        }).catch(error => {
          console.log(error, "identityCrisis")
        })
      }

      getIdentity();

      //console.log('User is connected to Scatter');

      //window.scatter = null;

  });

  }


  render() {
    console.log(this.props);
    let userForm;
    // Seller/Buyer is on Scatter
    if (this.state.isScatter) {
      userForm = (
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h2>Ready to {this.props.type} {this.state.userName}?</h2>
        </div>
      )
    }
    // Need to get on Scatter
    else {
      userForm = (
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h2>Looking for Scatter...</h2>
          <p>No User Found on Scatter.  Scatter is required to use this dapp.</p>
        </div>)
    }

    return (
        <div className="row">
          <div className="col-lg-12">
            {userForm}
          </div>
        </div>
    );
  }
}

export default Scatter;
