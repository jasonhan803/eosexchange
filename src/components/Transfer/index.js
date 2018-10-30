import React from 'react';
import { connect } from 'react-redux';
import Eos from 'eosjs';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RegisteredSeller from './../../components/RegisteredSeller';
import { registerContract, updateAccount } from './../../actions/identity';


class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transferAmount: 0,
      toConfirmation: false
    };
  }

  contractResults = (registered, accountDetails) => {
    this.props.updateAccount(accountDetails);
    this.props.registerContract();
  }

  handleChange = (event) => {
    this.setState({transferAmount: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Transferring funds');
    let balance = Number(this.state.transferAmount).toPrecision(5);
    let accountName = this.props.identity.account.accountName;

    let config = {
      keyProvider: '5J2QfmKiwKB6NXrfnm2Y4FB3HhS8mqFGTzcSgFfz9TgRmqgDWdL', // What should this be for registering seller
      httpEndpoint: 'http://jungle.cryptolions.io:18888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
    let eos = Eos(config);

    // Connect with the contract
    eos.contract('eosio.token').then(contract => {
      const options = { authorization: [ accountName + `@active` ] };
      const eos = Number(this.state.transferAmount).toPrecision(5) + " EOS";

      // Deposit funds to the contract
      contract.transfer(accountName, "localeosxxxl", eos, options)
      .then(results => {
        console.log(results);
        // Let's just add this amount to the DB balance
        axios.put(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sellers`, { balance, accountName })
          .then(res => {
            if (res.data.message === "success") {
              this.setState(() => ({
                toConfirmation: true
              }))
            }
          })
      }).catch(error => {
        console.log(error);
      })
    })

    event.preventDefault();
  }

  render() {

    const props = {
      scatterRegistered: this.props.identity.scatterRegistered,
      identity: this.props.identity.identity,
      contractRegistered: this.props.identity.contractRegistered,
      account: this.props.identity.account,
      type: 'Transfer',
      contractCallback: this.contractResults
    }

    if (this.state.toConfirmation === true) {
      return <Redirect to={{
        pathname: "/confirmation",
        state: { user: this.props.identity.account.accountName }
      }} />
    }

    let transfer;

    if (!this.props.identity.scatterRegistered) {
      return <Redirect to={{
        pathname: "/wallet"
      }} />
    } else if (this.props.identity.scatterRegistered && !this.props.identity.contractRegistered) {
      transfer = <RegisteredSeller {...props} />
    } else {
      transfer = (
        <section className="jumbotron text-center">
          <div className="col-md-4 col-centered">
            <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
            <label>
                Amount:
             </label>
             <p>*Only whole numbers less than 10 for now - need to fix</p>
             <input type="text" value={this.state.amount} onChange={this.handleChange} />
             </div>
             <input type="submit" value="Transfer" />
            </form>
          </div>
        </section>);
    }

    return (
      <div id="container">
        {transfer}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
});

const mapDispatchToProps = dispatch => ({
  registerContract: () => dispatch(registerContract()),
  updateAccount: (accountDetails) => dispatch(updateAccount(accountDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
