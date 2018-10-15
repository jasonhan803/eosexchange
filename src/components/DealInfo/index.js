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

    /*let eos = Eos(config);
    let buyer = this.props.account.accountName; // current Account Name

    // Connect with the contract
    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ buyer + `@active` ] };

      // Reserves funds for current Buyer
      contract.ipaid(buyer, seller, "eosio.token", "1.0000 EOS", options)
      .then(results => {


      }).catch(error => {
        console.log(error);
      })
    })*/

    // Update the DB
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
              <div onClick={this.moneySent}>Paid</div>
            </div>
          }
        </div>);

  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(DealInfo);
