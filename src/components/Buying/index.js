import React from 'react';
import Eos from 'eosjs';
import axios from 'axios';


class Buying extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scatterRegistered: false,
      saleItem: {},
      usd: 0,
      eos: 0
    };
  }

  handleChange = (event) => {
    let usd, eos
    switch(event.target.name) {
      case 'usd':
        eos = (parseInt(event.target.value) / parseInt(this.state.saleItem.price));
        this.setState({usd: event.target.value, eos: eos});
        break;
      case 'eos':
        usd = (parseInt(event.target.value) * parseInt(this.state.saleItem.price));
        this.setState({eos: event.target.value, usd: usd});
        break;
      default:
        break;
    }
  }

  handleSubmit = (event) => {

    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);

    let accountName='chnkyfirede1';

    // Connect with the contract
    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ accountName + `@active` ] };

      // Deposit funds to the contract
      contract.reserve(accountName, "chnkyfiredev", "eosio.token", "1.0000 EOS", options)
      .then(results => {
        console.log(results);
        // Let's just add this amount to the DB balance
        /*axios.put(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers`, { balance, accountName })
          .then(res => {
            if (res.data.message === "success") {
              this.setState(() => ({
                toConfirmation: true
              }))
            }
          })*/
      }).catch(error => {
        console.log(error);
      })
    })

    event.preventDefault();
  }

  componentWillMount() {

  }

  componentDidMount() {
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales/` + this.props.id)
      .then(res => {
        this.setState({ saleItem: res.data.Item })
      })
  }


  render() {
    console.log(this.state);
    return (
      <div className="row mb-4">
        <div className="col-md-6 col-centered">
          <div className="row">
            <div className="col-md-2 text-left">
            </div>
            <div className="col-md-4 text-left">
              <p><b>Seller</b></p>
              <p><b>Price</b></p>
              <p><b>Payment Method</b></p>
              <p><b>Trade Limits</b></p>
            </div>
            <div className="col-md-6 text-left">
              <p>{this.state.saleItem.sellerId}</p>
              <p>{this.state.saleItem.price} USD/EOS</p>
              <p>{this.state.saleItem.paymentMethod}</p>
              <p>{this.state.saleItem.minLimit} - {this.state.saleItem.maxLimit} USD</p>
              <p></p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-4 text-left">
                </div>
                <div className="col-md-4 mb-3">
                  <label>
                    USD:
                  </label>
                  <input type="text" className="form-control" value={this.state.usd} name="usd" onChange={this.handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                  <label>
                    EOS:
                  </label>
                  <input type="text" className="form-control" value={this.state.eos} name="eos" onChange={this.handleChange} />
                </div>
              </div>
              <input type="submit" value="Request To Reserve" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Buying;
