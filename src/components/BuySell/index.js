import React from 'react';
import Eos from 'eosjs';
import { Link } from 'react-router-dom';
import SellerList from './../../components/SellerList'
import Buying from './../../components/Buying'

class BuySell extends React.Component {

  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  toggleBuying = () => {
    console.log('here');
 // function that will toggle active/false
   this.setState((prevState) => ({
     active: !prevState.active
   }));
 }


  render() {
    let sellers = this.state.sellers;
    console.log(sellers);
    return (
      <div>
        <SellerList onClick={this.toggleBuying} />
        <Buying active={this.state.active} />
      </div>
    );
  }
}

export default BuySell;
