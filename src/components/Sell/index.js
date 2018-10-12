import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import TransferForm from './../../components/TransferForm';
import Selling from './../../components/Selling';
import RegisteredSeller from './../../components/RegisteredSeller';
import Scatter from './../../components/Scatter'


class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      identity: '',
      scatterRegistered: false,
      sellerRegistered: false,
      hasMinimum: false,
      liquidBal: ''
    };
  }

  scatterResults = (registered, identity) => {
    this.setState({
      scatterRegistered: registered,
      identity
    })
  }

  registeredResults = (registered) => {
    this.setState({
      sellerRegistered: registered,
    })
  }

  handleChange = (event) => {
    //this.setState({value: event.target.value});
  }


  componentWillMount() {

  }

  componentDidMount() {

  }


  render() {

    return (
        <div id="container">
          <Scatter callback={this.scatterResults} type={"Sell"} />
          {this.state.scatterRegistered &&
              <RegisteredSeller callback={this.registeredResults} identity={this.state.identity } />
          }
          {this.state.sellerRegistered &&
              <Selling identity={this.state.identity } />
          }
        </div>
    );
  }
}

export default Sell;
