import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getCategories, editCategory } from "../../servicies/categoriesService";

class EditCategory extends Form {
  state = { data: { category: "" }, errors: {} };

  schema = {
    category: Joi.string().required().label("Category"),
  };

  doSubmit = async () => {
    await editCategory(this.props.match.params.id, this.state.data.category);
    window.location = "/admin-categories";
  };

  async componentDidMount() {
    const response = await getCategories();
    const category = response.data.data.find(
      (category) => category.id === parseInt(this.props.match.params.id)
    );
    const data = { category: category.category_name };
    this.setState({ data });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("category", "Category")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditCategory;
