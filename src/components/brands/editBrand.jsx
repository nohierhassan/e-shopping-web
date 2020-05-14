import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getBrands, editBrand } from "./../../servicies/brandsService";

class EditCategory extends Form {
  state = { data: { brand: "" }, errors: {} };

  schema = {
    brand: Joi.string().required().label("Brand"),
  };

  doSubmit = async () => {
    await editBrand(this.props.match.params.id, this.state.data.brand);
    window.location = "/admin-brands";
  };

  async componentDidMount() {
    const response = await getBrands();
    const brand = response.data.data.find(
      (brand) => brand.id === parseInt(this.props.match.params.id)
    );
    const data = { brand: brand.brand_name };
    this.setState({ data });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("brand", "Brand")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditCategory;
