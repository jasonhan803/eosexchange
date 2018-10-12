import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import TransferForm from './../../components/TransferForm';
import SalesForm from './../../components/SalesForm';


class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userName: '',
      registered: false,
      hasMinimum: false,
      liquidBal: ''
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
          let liquidBal = '';
          let user = {
            userName: '',
            liquidBal: ''
          };
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
              liquidBal = new Number(el.liquidbal.quantity.split(' EOS')[0]);
              liquidBal = liquidBal.toPrecision(6);
              if (liquidBal >= 0) {
                hasMinimum = true;
              }
              user.liquidBal = liquidBal;
            });
              user.userName = identity.accounts[0].name;
              console.log(user);
              this.setState({user: true, user: user, registered: registered, hasMinimum: hasMinimum })
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
    // If not Registered but found on Scatter
    if (this.state.user && !this.state.registered) {
      sellerForm = (<form onSubmit={this.handleSubmit}>
        <p>{this.state.userName}</p>
        <p>{this.state.totalWeight}</p>
        <input type="submit" value="Register as Seller" />
      </form>)
    // If on Scatter and Registered
    } else if (this.state.user && this.state.registered) {
      // Has more than zero in the account or to the minimum we set
      if (this.state.hasMinimum) {
          sellerForm = (<SalesForm user={this.state.user} />)
      } else {
          sellerForm = (<TransferForm user={this.state.user} />)
      }
    }
    // Need to get on Scatter
    else {
      // sellerForm = (<div><p>Looking for Scatter...</p><p>No User Found on Scatter.  Scatter is required to use this dapp.</p></div>)
      sellerForm = (
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h2>Looking for Scatter...</h2>
          <p>No User Found on Scatter.  Scatter is required to use this dapp.</p>
        </div>)
    }

    return (
        <div id="container">{sellerForm}</div>
    );
  }
}

export default Sell;
