import React from 'react';
import { connect } from 'react-redux';
import Selling from './../../components/Selling';
import RegisteredSeller from './../../components/RegisteredSeller';
import { updateBalance, registerContract, updateAccount } from './../../actions/identity';
import { Redirect } from 'react-router-dom';

class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  updateBalance = (newBalance) => {
    this.props.updateBalance(newBalance);
  }

  contractResults = (registered, accountDetails) => {
    this.props.updateAccount(accountDetails);
    this.props.registerContract();
  }

  render() {
    const props = {
      scatterRegistered: this.props.identity.scatterRegistered,
      identity: this.props.identity.identity,
      contractRegistered: this.props.identity.contractRegistered,
      account: this.props.identity.account,
      type: 'Sell',
      balanceCallback: this.updateBalance,
      contractCallback: this.contractResults
    }

    let sell;

    if (!this.props.identity.scatterRegistered) {
      return <Redirect to={{
        pathname: "/wallet"
      }} />
    } else if (this.props.identity.scatterRegistered && !this.props.identity.contractRegistered) {
      sell = <RegisteredSeller {...props} />
    } else {
      sell = <Selling {...props} />;
    }

    return (
        <div id="container">
          {sell}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

const mapDispatchToProps = dispatch => ({
  updateBalance: (balanceDetails) => dispatch(updateBalance(balanceDetails)),
  registerContract: () => dispatch(registerContract()),
  updateAccount: (accountDetails) => dispatch(updateAccount(accountDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sell);
