import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getOrders, deleteOrder, editOrder } from "./../../servicies/ordersService";

class AdminOrder extends Component {
  state = { orders: [] };

  async componentDidMount() {
    const {data} = await getOrders();
    this.setState({orders:data.data})
    
  }

  handleDelete =()=>{
      console.log("deleted");
      
  }

  render() {

    return (
      <div className="container">
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Orders</th>
              <th scope="col">BuyerID</th>
              <th scope="col">OrderStatus</th>
              <th scope="col">TotalPrice</th>
              <th scope="col">CreatedAt</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.buyer_id}</td>
                <td>{order.order_status}</td>
                <td>{order.order_total_price}</td>
                <td>

                  <Link
                    to={`order/${order.id}`}
                    className="btn btn-primary"
                  >
                    Details
                  </Link>
                </td>
                <td>
                  <Link
                    to={`delete-order/${order.id}`}
                    onClick={() => this.handleDelete(order.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </Link>
                </td>
                <td>
                  <Link
                    to={`edit-order/${order.id}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminOrder;
