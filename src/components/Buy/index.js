import React from 'react';
import Eos from 'eosjs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Buying from './../../components/Buying'
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'

class Buy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      active: false
    };
  }


  componentWillMount() {

  }

  toggleBuying = () => {
      console.log('here');
      this.setState((prevState) => ({
        active: !prevState.active
      }));
  }

  componentDidMount() {
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales`)
      .then(res => {
        console.log(res);
        this.setState(() => ({
          sellers: res.data.Items
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
        <Link to={'/' + props.original.saleId}>BUY</Link>
      )
    }]
    console.log(sellers);
    return (
      <div id="container">
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h2>Seller List</h2>
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

export default Buy;
