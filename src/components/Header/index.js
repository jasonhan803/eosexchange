import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerScatter, updateIdentity, registerContract, updateAccount } from './../../actions/identity';

class Header extends React.Component {

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

    return(

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">EOS Exchange</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/buy">Buy</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sell">Sell</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/transfer">Transfer</Link>
        </li>
      </ul>
      <ul className="navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/wallet">{this.props.identity.scatterRegistered ? this.props.identity.identity.accounts[0].name : 'Wallet'}</Link>
          </li>
          {this.props.identity.scatterRegistered &&
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          }
      </ul>
    </div>
    </nav>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(Header);
