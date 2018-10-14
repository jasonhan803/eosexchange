import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class SaleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      active: false
    };
  }

  componentDidMount() {
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales`)
      .then(res => {
        // Filter out all Sale Items that does not include the current user
        // Make a login button so deploying scatter is user initiated
        const result = res.data.Items.filter(saleItem => saleItem.sellerId !== this.props.identity.account.accountName);
        this.setState(() => ({
          sellers: result
        }))
      })
  }


  render() {
    let sellers = this.state.sellers;
    const columns = [{
      Header: 'Seller',
      accessor: 'sellerId' // String-based value accessors!
    }, {
      Header: 'Payment Method',
      accessor: 'paymentMethod',
    }, {
      Header: 'Price / BTC',
      accessor: 'price'
    }, {
      id: 'limits', // Required because our accessor is not a string
      Header: 'Limits',
      Cell: props => (
        <p>{props.original.minLimit + '-' + props.original.maxLimit} USD</p>
      )
    }, {
      Header: 'Buy',
      accessor: 'saleId',
      Cell: props => (
        <Link to={'buy/' + props.original.saleId}>BUY</Link>
      )
    }]

    return (
      <div id="container">
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h2>Sale List</h2>
        </div>
        <div className="row mb-4">
          <div className="col-md-8 col-centered">
          <ReactTable
            data={sellers}
            columns={columns}
          />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(SaleList);
