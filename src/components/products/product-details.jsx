import React, { Component } from "react";

class ProductDetails extends Component {
  state = {};
  render() {
    console.log(this.props.product);

    const { id } = this.props.match.params;
    return <h1>Product #{id}</h1>;
  }
}

export default ProductDetails;
