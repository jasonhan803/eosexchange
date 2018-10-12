import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';
import axios from 'axios';


class SaleInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scatterRegistered: false,
      saleItem: {},
      usd: 0,
      eos: 0
    };
  }

  handleChange = (event) => {
    switch(event.target.name) {
      case 'usd':
        this.setState({usd: event.target.value});
        break;
      case 'eos':
        this.setState({eos: event.target.value});
        break;
      default:
        break;
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales/` + this.props.id)
      .then(res => {
        this.setState({ saleItem: res.data.Item })
      })
  }


  render() {
    console.log(this.state);
    return (
      <div className="row mb-4">
        <div className="col-md-6 col-centered">
          <div className="row">
            <div className="col-md-2 text-left">
            </div>
            <div className="col-md-4 text-left">
              <p><b>Seller</b></p>
              <p><b>Price</b></p>
              <p><b>Payment Method</b></p>
              <p><b>Trade Limits</b></p>
            </div>
            <div className="col-md-6 text-left">
              <p>{this.state.saleItem.sellerId}</p>
              <p>{this.state.saleItem.price} USD</p>
              <p>{this.state.saleItem.paymentMethod}</p>
              <p>{this.state.saleItem.minLimit} - {this.state.saleItem.maxLimit} USD</p>
              <p></p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-4 text-left">
                </div>
                <div className="col-md-4 mb-3">
                  <label>
                    USD:
                  </label>
                  <input type="text" className="form-control" value={this.state.usd} name="usd" onChange={this.handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                  <label>
                    EOS:
                  </label>
                  <input type="text" className="form-control" value={this.state.eos} name="eos" onChange={this.handleChange} />
                </div>
              </div>
              <input type="submit" value="Request To Purchase" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SaleInfo;
