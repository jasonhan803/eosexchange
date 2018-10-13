import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Selling extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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


  render() {

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
