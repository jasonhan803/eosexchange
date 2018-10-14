import React from 'react';
import Eos from 'eosjs';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Buying extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saleItem: {},
      usd: 0,
      eos: 0,
      toConfirmation: false
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
    let buyer = this.props.account.accountName; // current Account Name
    let seller = this.state.saleItem.sellerId; // off of sale Item

    // Connect with the contract
    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ buyer + `@active` ] };

      // Reserves funds for current Buyer
      contract.reserve(buyer, seller, "eosio.token", "1.0000 EOS", options)
      .then(results => {

        // Change status of Sale and add Buyer to Sale Item
        axios.put(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales`, {
          saleId: this.state.saleItem.saleId,
          action: 'reserve',
          buyer
        }).then(res => {
            // add Buyer to table and add Sale Info to Buyer
            if (res.data.message === "success") {
              axios.post(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/buyers`, {
                saleId: this.state.saleItem.saleId,
                buyer
              }).then(res => {
                  if (res.data.message === "success") {
                    this.setState(() => ({
                      toConfirmation: true
                    }))
                  }
                })
            }
          })
      }).catch(error => {
        console.log(error);
      })
    })

    event.preventDefault();
  }

  componentWillMount() {

  }

  componentDidMount() {
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales/` + this.props.saleId)
      .then(res => {
        this.setState({ saleItem: res.data.Item })
      })
  }

  render() {
    // Need a check for sale_status... make sure we're only showing 'active'
    if (this.state.toConfirmation === true) {
      return <Redirect to={{
        pathname: "/confirmation",
        state: { user: this.props.identity.accounts[0].name, balance: this.props.account.actualBalance}
      }} />
    }

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
