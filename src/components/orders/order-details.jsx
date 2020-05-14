import React, { Component } from "react";
import { getOrderDetails } from "./../../servicies/ordersService";

class OrderDetails extends Component {
  state = { data: [] };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getOrderDetails(id);
    const order = data.data;
    this.setState({ data: order });
    console.log(this.state.data);
    
  }
  render() {
    return (
      <div className="container">
        <h1>Order Details #{this.props.match.params.id}</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">product</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.product_qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderDetails;
