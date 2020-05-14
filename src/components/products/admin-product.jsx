import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./../../servicies/productsService";

class AdminProduct extends Component {
  state = { products: [] };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  handleDelete(){
    console.log("deleted");
  }

  handleEdit(){
    console.log("edited");
  }
  render() {
    console.log(this.props);

    return (
      <div className="container">
        <Link to="/add-product" className="btn btn-primary m-2">
          Add Product
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Products</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>
                  <a
                    onClick={() => this.handleDelete(product.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </a>
                </td>
                <td>
                  <a
                    onClick={() => this.handleEdit(product.id)}
                    className="btn btn-warning"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminProduct;
