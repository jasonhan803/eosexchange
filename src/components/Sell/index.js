import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';


class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userName: '',
      totalWeight: '',
      amount: '',
      paymentMethod: '',
      price: '',
      minLimit: '',
      maxLimit: ''
    };
  }

  handleChange = (event) => {
    //this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('A name was submitted: ' + this.state.value);
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
          eos.getAccount(identity.accounts[0].name)
          .then(result => {
            console.log(result)
            this.setState({user: true, userName: identity.accounts[0].name, totalWeight: result.total_resources.cpu_weight })
          })
          .catch(error => console.error(error));
          //this.setState({user: true, userName: identity.accounts[0].name })
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
    if (this.state.user) {
      sellerForm = (<form onSubmit={this.handleSubmit}>
        <p>{this.state.userName}</p>
        <p>{this.state.totalWeight}</p>
        <label>
          Amount:
          <input type="text" value={this.state.amount} onChange={this.handleChange} />
        </label>
        <label>
          Payment Method:
          <input type="text" value={this.state.paymentMethod} onChange={this.handleChange} />
        </label>
        <label>
          Price/EOS:
          <input type="text" value={this.state.price} onChange={this.handleChange} />
        </label>
        <label>
          Min Limit:
          <input type="text" value={this.state.minLimit} onChange={this.handleChange} />
        </label>
        <label>
          Max Limit:
          <input type="text" value={this.state.maxLimit} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>)
    } else {
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
