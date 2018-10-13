import React from 'react';

class BuySell extends React.Component {

  render() {
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">EOS Exchange</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks do not simply skip over it entirely.</p>
          <p>
            <a href="/buy" className="btn btn-primary my-2">Buy</a>
            <a href="/sell" className="btn btn-secondary my-2">Sell</a>
          </p>
        </div>
      </section>
    );
  }
}

export default BuySell;
