import React from 'react';
import Eos from 'eosjs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Buying from './../../components/Buying'
import axios from 'axios';

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
    console.log(sellers);
    // console.log(this.props);
    return (
      <div id="container">
        <div className="element tile-2 home bg-change pages">
          <p>Seller List</p>
          <ul>
          {sellers.map(m => {
            return <li key={m.saleId}><p>{m.sellerId} | {m.paymentMethod} | {m.price} | {m.minLimit} | {m.maxLimit}</p></li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Buy;
