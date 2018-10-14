import React from 'react';
import Buying from './../../components/Buying'
import { connect } from 'react-redux';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterRegistered: false,
      saleId: ''
    };
  }

  render() {

    const { match: { params } } = this.props;
    const saleId = params.id;

    return (
      <div id="container">
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

export default connect(mapStateToProps)(Buy);
