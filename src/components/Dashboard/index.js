import React from 'react';
import { connect } from 'react-redux';
import Deals from './../../components/Deals';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
        <div id="container">
          {this.props.identity.contractRegistered &&
              <div>
                <p>Open Buying Info</p>
                <Deals {...this.props.identity}/>
              </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  identity: state.identityReducer
})

export default connect(mapStateToProps)(Dashboard);
