import React from 'react';
import Eos from 'eosjs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SellerList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
    };
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


    eos.getTableRows({
        code:'localeosxxxl',
        scope:'localeosxxxl',
        table:'sellers',
        json: true,
    }).then(result => {
        this.setState({sellers: result.rows})
    });
  }


  render() {
    let sellers = this.state.sellers;
    // console.log(this.props);
    return (
      <div id="container">
        <div className="element tile-2 home bg-change pages">
          <p>Seller List</p>
          <ul>
          {sellers.map(m => {
            return <li key={m.owner}><p>{m.owner} | {m.liquidbal.quantity} | <span onClick={this.props.onClick}>Buy</span></p></li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SellerList;
