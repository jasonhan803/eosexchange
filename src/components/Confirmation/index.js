import React from 'react';

class Confirmation extends React.Component {

  render() {
    console.log(this.props);
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Confirmation</h1>
          <p className="lead text-muted">Something about {this.props.location.state.user}.</p>
          <p className="lead text-muted">New EOS Balance {this.props.location.state.balance}.</p>
        </div>
      </section>
    );
  }
}

export default Confirmation;
