import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import TransferForm from './../../components/TransferForm';
import SaleForm from './../../components/TransferForm';


class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userName: '',
      registered: false,
      hasMinimum: false,
      liquiBal: ''
    };
  }

  handleChange = (event) => {
    //this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Registering the user');


    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);

    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ `chnkyfirede1@active` ] };
      contract.regseller("chnkyfirede1", "eosio.token", "0.0000 EOS", options)
      .then(results => {
        console.log(results);
      }).catch(error => {
        console.log(error);
      })
    })
    event.preventDefault();
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
          console.log(identity, "identitySuccess")
          let registered = false;
          let hasMinimum = false;
          let lb = '';
          eos.getTableRows({
              code:'localeosxxxl',
              scope:'localeosxxxl',
              table:'sellers',
              json: true,
          }).then(result => {
            result.rows.forEach(function(el){
              if (el.owner === identity.accounts[0].name) {
                registered = true;
              }
              console.log(el.liquidbal.quantity)
              if (el.liquidbal >= 0) {
                console.log('here');
                hasMinimum = true;
              }
              lb = el.liquidbal;
            });
              this.setState({user: true, userName: identity.accounts[0].name, registered: registered, hasMinimum: hasMinimum, liquiBal: lb })
          });
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
    let sellers = this.state.sellers;

    let sellerForm;
    if (this.state.user && !this.state.registered) {
      sellerForm = (<form onSubmit={this.handleSubmit}>
        <p>{this.state.userName}</p>
        <p>{this.state.totalWeight}</p>
        <input type="submit" value="Register as Seller" />
      </form>)
    } else if (this.state.user && this.state.registered) {
      console.log(this.state.hasMinimum);
      if (this.state.hasMinimum) {
          sellerForm = (<SaleForm user={this.state.userName}/>)
      } else {
          sellerForm = (<TransferForm user={this.state.userName}/>)
      }
    }
    else {
      sellerForm = (<div><p>Looking for Scatter...</p><p>No User Found on Scatter.  Scatter is required to use this dapp.</p></div>)
    }

    return (
      <div id="container">
        <div className="element tile-2 home bg-change pages">
          <p>Selling</p>
            <p>{sellerForm}</p>
        </div>
      </div>
    );
  }
}

export default Sell;
