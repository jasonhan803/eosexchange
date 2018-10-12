import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import { Redirect } from 'react-router-dom';
import Eos from 'eosjs';
import axios from 'axios';


class Selling extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalWeight: '',
      paymentMethod: 'cash',
      price: 5,
      minLimit: 5,
      maxLimit: 50,
      toConfirmation: false
    };
  }

  handleChange = (event) => {
    switch(event.target.name) {
      case 'paymentMethod':
        this.setState({paymentMethod: event.target.value});
        break;
      case 'price':
        this.setState({price: event.target.value});
        break;
      case 'minLimit':
        this.setState({minLimit: event.target.value});
        break;
      case 'maxLimit':
        this.setState({maxLimit: event.target.value});
        break;
      default:
        break;
    }
  }

  handleSubmit = (event) => {
    const sale = {
      user: this.props.identity.accounts[0].name,
      paymentMethod: this.state.paymentMethod,
      price: this.state.price,
      minLimit: this.state.minLimit,
      maxLimit: this.state.maxLimit
    }

    axios.post(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales`, { sale })
      .then(res => {
        if (res.data.message === "success") {
          this.setState(() => ({
            toConfirmation: true
          }))
        }
      })

    event.preventDefault();
  }


  componentWillMount() {

  }

  componentDidMount() {

    let config = {
      keyProvider: '5LLKiY1D3tCndrF5NW5tJa1enukCfrPNopUJwnkUmfErT8d11eN',
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);
    eos.getAccount(this.props.identity.accounts[0].name)
    .then(result => {
      this.setState({totalWeight: result.total_resources.cpu_weight })
    })
    .catch(error => console.error(error));

  }


  render() {
    //console.log(this.props.user);
    console.log(this.props);
    if (this.state.toConfirmation === true) {
      return <Redirect to={{
        pathname: "/confirmation",
        state: { user: this.props.identity.accounts[0].name }
      }} />
    }

    return (
        <div>
          <div className="row mb-4">
            <div className="col-md-4 col-centered">
            <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
              <label>
                Payment Method:
              </label>
                <input type="text" className="form-control" value={this.state.paymentMethod} name="paymentMethod" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
              <label>
                Price:
              </label>
                <input type="text" className="form-control" value={this.state.price} name="price" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
              <label>
                Minimum Amount Limit:
              </label>
                <input type="text" className="form-control" value={this.state.minLimit} name="minLimit" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
              <label>
                Maximum Amount Limit:
              </label>
                <input type="text" className="form-control" value={this.state.maxLimit} name="maxLimit" onChange={this.handleChange} />
                </div>
              <input type="submit" value="Create Sale" />
            </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Selling;
