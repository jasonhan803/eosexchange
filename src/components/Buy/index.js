import React from 'react';
import Buying from './../../components/Buying'
import { connect } from 'react-redux';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { match: { params } } = this.props;

    const props = {
      scatterRegistered: this.props.identity.scatterRegistered,
      identity: this.props.identity.identity,
      contractRegistered: this.props.identity.contractRegistered,
      account: this.props.identity.account,
      type: 'Buy',
      saleId: params.id
    }

    return (
      <div id="container">
          <Buying {...props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(Buy);
