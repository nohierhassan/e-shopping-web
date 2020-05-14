import React, { Component } from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { getBrands } from "./../../servicies/brandsService";
import { getCategories } from "./../../servicies/categoriesService";
import {addProduct} from  "./../../servicies/productsService";

class AddProduct extends Form {
  state = {
    data: {
      title: "",
      description: "",
      price: "",
      instock: "",
      image: "",
      category: "",
      brand: "",
    },
    errors: {},
    brands: [],
    categories: [],
  };

  schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    price: Joi.number().min(1).required().label("Price"),
    instock: Joi.number().min(1).max(100).required().label("Instock"),
    image: Joi.string().required().label("Image"),
    category: Joi.string().required().label("Category"),
    brand: Joi.string().required().label("Brand"),
  };

  handleBrandChange = ()=>{
    const {data} = this.state;
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addProduct(data);
      window.location = "/admin-products";
    } catch (ex) {
      if (ex.respone && ex.respone.status === 400) {
        const errors = { ...this.status.errors };
        errors.product = ex.respone.data;
        this.setState({ errors });
      }
    }
  };

  async componentDidMount() {
    const brands = [];
    const categories = [];
    const BrandResponse = await getBrands();
    for (let brand of BrandResponse.data.data) brands.push(brand);
    const categoryResponse = await getCategories();
    for (let category of categoryResponse.data.data) categories.push(category);
    this.setState({ brands, categories });
    
  }

  render() {
    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderInput("price", "Price")}
          {this.renderInput("instock", "Instock")}
          {this.renderInput("image", "Image")}
          {this.renderSelect("category", "Category", this.state.categories)}
          {this.renderSelect("brand", "Brand", this.state.brands)}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default AddProduct;
