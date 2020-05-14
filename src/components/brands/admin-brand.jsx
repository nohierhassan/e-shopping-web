import React, { Component } from "react";
import {getBrands,addBrand,deleteBrand,}
from "./../../servicies/brandsService";
import Form from "./../common/form";
import Joi from "joi-browser";
import { Link } from 'react-router-dom';

class AdminBrand extends Form {
  state = { data: { brand: "" }, errors: {}, brands: [] };

  schema = {
    brand: Joi.string().required().label("Brands"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addBrand(data.brand);
      window.location = "/admin-brands";
    } catch (ex) {
      if (ex.respone && ex.respone.status === 400) {
        const errors = { ...this.status.errors };
        errors.brand = ex.respone.data;
        this.setState({ errors });
      }
    }
  };

  handleDelete = (brandID) => {
    console.log(brandID);
    
    deleteBrand(brandID);
  };

  async componentDidMount() {
    const brands = [];
    const response = await getBrands();

    for (let brand of response.data.data) brands.push(brand);
    this.setState({ brands });        
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("brand", "Brand")}
          {this.renderButton("Add")}
        </form>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Brands</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.brand_name}</td>
                <td>
                  <a
                    onClick={() => this.handleDelete(brand.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </a>
                </td>
                <td>
                  <Link to={`edit-brand/${brand.id}`} className="btn btn-warning">
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

export default AdminBrand;
