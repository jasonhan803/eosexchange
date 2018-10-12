import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import Scatter from './../../components/Scatter'
import SaleInfo from './../../components/SaleInfo'


class Buying extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scatterRegistered: false,
      saleId: ''
    };
  }

  scatterResults = (registered) => {
    console.log(registered);
    this.setState({
      scatterRegistered: registered
    })
  }


  componentWillMount() {

  }

  componentDidMount() {

  }


  render() {
    const { match: { params } } = this.props;
    const saleId = params.id;
    return (
      <div id="container">
        <Scatter callback={this.scatterResults} />
        {this.state.scatterRegistered &&
          <SaleInfo id={saleId} />
        }
      </div>
    );
  }
}

export default Buying;
