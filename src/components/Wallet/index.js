import React from 'react';
import { connect } from 'react-redux';
import Scatter from './../../components/Scatter';
import { registerScatter, updateIdentity } from './../../actions/identity';

class Wallet extends React.Component {

  scatterResults = (registered, identity) => {
    this.props.updateIdentity(identity);
    this.props.registerScatter();
  }

  render() {
    const props = {
      scatterRegistered: this.props.identity.scatterRegistered,
      identity: this.props.identity.identity,
      scatterCallback: this.scatterResults
    }

    return (
      <Scatter {...props} />
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

const mapDispatchToProps = dispatch => ({
  registerScatter: () => dispatch(registerScatter()),
  updateIdentity: (identity) => dispatch(updateIdentity(identity))
})


export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
