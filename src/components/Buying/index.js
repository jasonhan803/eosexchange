import React from 'react';
import Eos from 'eosjs';

class Buying extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
    };
  }


  componentWillMount() {

  }

  componentDidMount() {

  }


  render() {
    let sellers = this.state.sellers;
    //console.log(sellers);
    console.log(this.props.active);
    return (
      <div id="container">
        { this.props.active && <div className="element tile-2 home bg-change pages">
          <p>Buying</p>
          <p>Is there any more seller info? </p>
        </div> }
      </div>
    );
  }
}

export default Buying;
