import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Deals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
  }

  componentDidMount() {
    const user = this.props.account.accountName;
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers/` + user )
    .then(res => {
      this.setState({
        sales: res.data.Item.sales
      })
    })
  }

  render() {
    console.log(this.state.sales);
    return (
        <div>
          <h2>Selling Deals</h2>
          {this.props.identity.contractRegistered &&
            this.state.sales.map((sale) =>
              <p key={sale.saleId}><Link to={"/dashboard/" + sale.saleId}>{sale.saleId}</Link> | {sale.sale_status} | {sale.timeStamp}</p>)
          }
          <h2>Buying Deals</h2>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(Deals);
