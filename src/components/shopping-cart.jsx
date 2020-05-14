import React, { Component } from "react";
import { getCurrentUser } from "./../servicies/authService";
import { addOrder } from "../servicies/ordersService";

class ShoppingCart extends Component {
  state = { userID: "" };

  handleCheckOut = async (products) => {
    
    const line_items = [];
    const finalOrder = this.handleProductRepetition(products)
    for (let item of finalOrder) {
      line_items.push({
        product_name: item.title,
        product_qty: item.count,
      });
    }
    
    const order = {
      buyer_id: this.state.userID.user_id,
      order_status: "Pending admin Approval",
      order_total_price: this.getTotalPrice(products),
      line_items: line_items,
    };
    await addOrder(order);
    window.location="/products"
  };

  componentDidMount() {
    const userID = getCurrentUser();
    this.setState({ userID });
  }

  render() {
    
    const { products, onClearCart } = this.props;
    console.log(products);
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">Shopping Cart</div>
          <div className="card-body">
            {products.length ? (
              this.handleProductRepetition(products).map((product) => (
                <div key={product.id} className="container">
                  <div className="row">
                    <div  className="card-text col-9">
                      {product.title}
                    </div>
                    <div className="col-2">
                      {product.count} x {product.price}
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <p className="card-text">No Products in the Cart</p>
            )}
            {products.length ? (
              <div>
                <p className="col-9">Total = {this.getTotalPrice(products)}</p>
                <a
                  onClick={() => this.handleCheckOut(products)}
                  className="btn btn-primary mx-1"
                >
                  check out
                </a>

                <a onClick={onClearCart} className="btn btn-danger mx-1">
                  clear cart
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
  handleProductRepetition(products) {
    let order = [];
    let count = [];

    products.forEach((product) => {
      if (!order.includes(product)) {
        product.count = 1;
        order.push(product);
      } else product.count += 1;
    });
    console.log("order", order);
    
    return order;
  }

  getTotalPrice(products) {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    return total;
  }
}

export default ShoppingCart;
