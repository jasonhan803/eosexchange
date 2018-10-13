import React from 'react';
import Eos from 'eosjs';
import axios from 'axios';
import { Link } from 'react-router-dom';


// User needs to register in the contract and on the DB
// Ideally should be able to check one or the other
// On creation should add both

// Only checking database for now
class RegisteredSeller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  // Add to Contract and to DB
  registerSeller = () => {
    // contract action regseller
    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }

    let eos = Eos(config);

    const accountName = this.props.identity.accounts[0].name;

    eos.contract('localeosxxxl').then(contract => {
      const options = { authorization: [ accountName + '@active' ] };
      contract.regseller(accountName, "eosio.token", "0.0000 EOS", options)
      .then(results => {
        console.log('Added to contract - adding to DB');

        axios.post(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers`, { name: accountName })
          .then(res => {
            console.log('Added to DB');
            if (res.data.message === "success") {
              this.props.contractCallback(true, res.data.Item);
            }
          })
        console.log(results);
      }).catch(error => {
        console.log(error);
      })
    })
  }

  getUser = () => {
    const user = this.props.identity.accounts[0].name;
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers/` + user )
    .then(res => {
      if(!this.isEmpty(res.data)) {
        this.props.contractCallback(true, res.data.Item);
      }
    })
  }

  componentDidMount = () => {
    if (this.props.scatterRegistered) {
      this.getUser();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 mb-4">
          {this.props.contractRegistered &&
            <div>
              <p>Current Balance - ${this.props.account.balance}</p>
              {this.props.type !== "Transfer" &&
                <p>Need more funds in the contract - <Link to="/transfer">Transfer Here</Link></p>
              }
            </div>
          }
          {!this.props.contractRegistered &&
            <div>
              <h4>Sellers need to Register with the Contract</h4>
              <p>Register with one click <span onClick={this.registerSeller}>here</span></p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default RegisteredSeller;
