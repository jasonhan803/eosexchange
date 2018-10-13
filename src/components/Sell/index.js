import React from 'react';
import { connect } from 'react-redux';
import Selling from './../../components/Selling';
import Scatter from './../../components/Scatter';
import { registerScatter, updateIdentity, registerContract, updateAccount } from './../../actions/identity';

class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  scatterResults = (registered, identity) => {
    this.props.updateIdentity(identity);
    this.props.registerScatter();
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
      scatterCallback: this.scatterResults,
      contractCallback: this.contractResults
    }

    return (
        <div id="container">
          <Scatter {...props} />
          {this.props.identity.contractRegistered &&
              <Selling {...props} />
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

const mapDispatchToProps = dispatch => ({
  registerScatter: () => dispatch(registerScatter()),
  registerContract: () => dispatch(registerContract()),
  updateIdentity: (identity) => dispatch(updateIdentity(identity)),
  updateAccount: (accountDetails) => dispatch(updateAccount(accountDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sell);
