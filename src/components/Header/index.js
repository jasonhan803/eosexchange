import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const Header = () =>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">EOS Exchange</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link" href="/sell">Sell</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/buy">Buy</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/transfer">Transfer</a>
    </li>
  </ul>
</div>
</nav>

export default Header;
