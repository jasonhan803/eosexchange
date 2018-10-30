import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Eos from 'eosjs';


class DealInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saleItem: {}
    };
  }

  componentWillMount() {

  }

  moneySent = () => {
    // Update the contract
    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }

    let eos = Eos(config);
    let buyer = this.props.identity.identity.accounts[0].name; // current account name

    // Connect with the contract
    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ buyer + `@active` ] };

      // Tells the contract that the Buyer has sent the cash to the Seller
      contract.ipaid(this.state.saleItem.dealId, options)
      .then(results => {
        // Update the DB
        // Need to change the status of the Sale to 'paid'
      }).catch(error => {
        console.log(error);
      })
    })
  }

  moneyReceived = () => {
    // Update the contract
    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }

    let eos = Eos(config);
    let buyer = this.props.identity.identity.accounts[0].name; // current account name

    // Connect with the contract
    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ buyer + `@active` ] };

      // Tells the contract that the Buyer has sent the cash to the Seller
      contract.igotpaid('7159877630084423268', options)
      .then(results => {
        // Update the DB
        // Need to change the status of the Sale to 'received'
      }).catch(error => {
        console.log(error);
      })
    })
  }



  componentDidMount() {
    const { match: { params } } = this.props;
    const saleId = params.id;
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales/` + saleId)
      .then(res => {
        this.setState({
          saleItem: res.data.Item
        })
      })
  }

  render() {
    // Will need to verify login but overriding for now.
    // similar issue to Sale List
    // For now assuming user is logged in. -- VERYIFY LOG IN
    console.log(this.props);
    const saleItem = this.state.saleItem;
    return         (<div>
          <h2>Individual Sale Info</h2>
          {this.state.saleItem &&
            <div>
              <p>{saleItem.dateCreated} - {saleItem.saleId} - {saleItem.sale_status} - {saleItem.paymentMethod } - {saleItem.buyerId}</p>
              { // If user is buyer and ...
              }
              {saleItem.sale_status === 'reserved' &&
                <div onClick={this.moneySent}>Paid</div>
              }
              { // If user is seller and ...
              }
              {saleItem.sale_status === 'paid' &&
                <div onClick={this.moneyReceived}>Received</div>
              }
            </div>
          }
        </div>);

  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(DealInfo);
