import React from 'react';
import Eos from 'eosjs';

class Confirmation extends React.Component {

  render() {
    console.log(this.props.location.state.user);
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Confirmation</h1>
          <p className="lead text-muted">Something about {this.props.location.state.user}.</p>
        </div>
      </section>
    );
  }
}

export default Confirmation;
