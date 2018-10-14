import React from 'react';
import axios from 'axios';


class Sale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const saleId = params.id;
    axios.get(`https://jn3133p6pk.execute-api.us-west-1.amazonaws.com/dev/sales/` + saleId)
      .then(res => {
        this.setState({
          saleItem: res.data.Item
        })
      })
  }


  render() {
    const saleItem = this.state.saleItem;
    return (
        <div>
          {this.state.saleItem &&
            <p>{saleItem.dateCreated} - {saleItem.saleId} - {saleItem.status} - {saleItem.paymentMethod }</p>
          }
        </div>
    );
  }
}

export default Sale;
