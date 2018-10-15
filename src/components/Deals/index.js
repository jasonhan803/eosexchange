import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Deals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      purchases: []
    };
  }

  isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  componentDidMount() {
    const user = this.props.account.accountName;
    let sales, purchases = [];
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers/` + user )
    .then(res => {
      sales = res.data.Item.sales;
      axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/buyers/` + user )
      .then(res => {
        // Need to verify that this data isn't empty because not all Sellers will be in the Buyers table
        if(!this.isEmpty(res.data)) {
          purchases = res.data.Item.purchases;
        }
        this.setState({
          sales, purchases
        })
      })
    })
  }

  render() {
    console.log(this.state);
    return (
        <div>
          <h2>Selling Deals</h2>
          {this.props.identity.contractRegistered &&
            this.state.sales.map((sale) =>
              <p key={sale.saleId}><Link to={"/dashboard/" + sale.saleId}>{sale.saleId}</Link></p>)
          }
          <h2>Buying Deals</h2>
          {this.state.purchases.map((purchase) =>
            <p key={purchase.saleId}><Link to={"/dashboard/" + purchase.saleId}>{purchase.saleId}</Link></p>)
          }
        </div>
    );
  }
}

export default Deals;
