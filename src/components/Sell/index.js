import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import TransferForm from './../../components/TransferForm';
import Selling from './../../components/Selling';
import Scatter from './../../components/Scatter'


class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userName: '',
      scatterRegistered: false,
      hasMinimum: false,
      liquidBal: ''
    };
  }

  scatterResults = (registered, userName) => {
    this.setState({
      scatterRegistered: registered,
      userName: userName
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
            <Selling id={this.state.userName } />
          }
        </div>
    );
  }
}

export default Sell;
