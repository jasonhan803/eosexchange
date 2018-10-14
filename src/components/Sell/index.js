import React from 'react';
import { connect } from 'react-redux';
import Selling from './../../components/Selling';
import { updateBalance } from './../../actions/identity';

class Sell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  updateBalance = (newBalance) => {
    this.props.updateBalance(newBalance);
  }

  render() {
    const props = {
      scatterRegistered: this.props.identity.scatterRegistered,
      identity: this.props.identity.identity,
      contractRegistered: this.props.identity.contractRegistered,
      account: this.props.identity.account,
      type: 'Sell',
      balanceCallback: this.updateBalance
    }

    return (
        <div id="container">
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
  updateBalance: (balanceDetails) => dispatch(updateBalance(balanceDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sell);
