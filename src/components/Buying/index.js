import React from 'react';
import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
import Eos from 'eosjs';


class Buying extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
  }


  componentWillMount() {

  }

  componentDidMount() {
    ScatterJS.scatter.connect("Test Dev").then(connected => {
      // User does not have Scatter Desktop, Mobile or Classic installed.
      if(!connected) {
          // User does not have Scatter installed/unlocked.
          return false;
      }

      const scatter = ScatterJS.scatter;

      let getIdentity = () => {
        scatter.getIdentity({ accounts:[{
        blockchain: 'EOS',
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        protocol: 'http',
        host: 'junglenodes.eosmetal.io',
        //host: 'dev.cryptolions.io',
        port: 443
      }] }).then(identity => {
          console.log(identity, "identitySuccess")
          this.setState({user: true})
        }).catch(error => {
          console.log(error, "identityCrisis")
        })
      }

      getIdentity();

      //console.log('User is connected to Scatter');

      //window.scatter = null;

  });

  }


  render() {
    let sellers = this.state.sellers;

    let scatterMessage;
    if (this.state.user) {
      scatterMessage = (<p>User Found</p>)
    } else {
      scatterMessage = (<p>No User Found on Scatter</p>)
    }

    return (
      <div id="container">
        <div className="element tile-2 home bg-change pages">
          <p>Buying</p>
          <p>Is there any more seller info? </p>
            <p>{scatterMessage}</p>
        </div>
      </div>
    );
  }
}

export default Buying;
