import React, { Component } from "react";
class Product extends Component {
  state = {
    title: "adidas",
    description: "",
    image: "",
    price: "",
    instock: "",
    category: "shose",
    brand: "adidas",
  };

  render() {

    const { product, onProductAdd } = this.props;
  
    return (
      <div className="card ml-5 mt-5" style={{ width: 250 }}>
        <img
          className="card-img-top"
          src={product.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">
            {product.description}
          </p>
          <p className="card-text">
            InStock : {product.instock}
          </p>
          <p className="card-text">
            Price : {product.price}
          </p>
          {/* <a className="btn btn-primary mx-1">View</a> */}
          <a
            onClick={() => onProductAdd(product)}
            className="btn btn-primary mx-1"
          >
            Add to cart
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
