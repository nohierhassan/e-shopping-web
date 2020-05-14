import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

import {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
} from "./../../servicies/categoriesService";

class AdminCategory extends Form {
  state = { data: { category: "" }, errors: {}, categories: [] };

  schema = {
    category: Joi.string().required().label("Category"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addCategory(data.category);
      window.location = "/admin-categories";
    } catch (ex) {
      if (ex.respone && ex.respone.status === 400) {
        const errors = { ...this.status.errors };
        errors.brand = ex.respone.data;
        this.setState({ errors });
      }
    }
  };

  async componentDidMount() {
    const categories = [];
    const response = await getCategories();

    for (let category of response.data.data) categories.push(category);
    this.setState({ categories });
  }
  handleDelete = (categoryID) => {
    deleteCategory(categoryID);
  };
  handleEdit = (categoryID) => {
    editCategory(categoryID);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("category", "Category")}
          {this.renderButton("Add")}
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Brands</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map((category) => (
              <tr key={category.id}>
                <td>{category.category_name}</td>
                <td>
                  <a
                    onClick={() => this.handleDelete(category.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </a>
                </td>
                <td>
                  <Link to={`edit-category/${category.id}`} className="btn btn-warning">
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

export default AdminCategory;
