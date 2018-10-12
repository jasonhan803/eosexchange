import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';


class TransferForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalWeight: '',
      amount: '',
      paymentMethod: '',
      price: '',
      minLimit: '',
      maxLimit: ''
    };
  }

  handleChange = (event) => {
    this.setState({amount: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Transferring funds');
    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);

    eos.contract('eosio.token').then(contract => {
      const options = { authorization: [ `chnkyfirede1@active` ] };
      console.log(contract);
      contract.transfer(this.props.user, "localeosxxxl", "10.0000 EOS", options)
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
    eos.getAccount(this.props.user.userName)
    .then(result => {
      //console.log(result)
      this.setState({totalWeight: result.total_resources.cpu_weight })
    })
    .catch(error => console.error(error));

  }


  render() {
    //console.log(this.props.user);

    return (
      <div id="container">
        <div className="element tile-2 home bg-change pages">
          <p>Transfer Form</p>
          <p>{this.props.user.userName}</p>
          <p>{this.state.totalWeight} : Total Weight</p>
          <p>{this.props.user.liquidBal} : Liquid Balance</p>
          <form onSubmit={this.handleSubmit}>
          <label>
              Amount:
              <input type="text" value={this.state.amount} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Transfer" />
          </form>
        </div>
      </div>
    );
  }
}

export default TransferForm;
