import React from 'react';
import Scatter from './../../components/Scatter'
import Buying from './../../components/Buying'
import { connect } from 'react-redux';
import { registerScatter, updateIdentity, registerContract, updateAccount } from './../../actions/identity';


class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterRegistered: false,
      saleId: ''
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
      type: 'Buy',
      scatterCallback: this.scatterResults,
      contractCallback: this.contractResults
    }

    const { match: { params } } = this.props;
    const saleId = params.id;

    return (
      <div id="container">
        <Scatter {...props} />
        {this.props.identity.contractRegistered &&
          <Buying id={saleId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Buy);
