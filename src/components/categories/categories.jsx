import React, { Component } from "react";
import {getCategories} from "../../servicies/categoriesService";

class Categories extends Component {
  state = {
    categories: ["All Categories"],
  };

  async componentDidMount() {
    const categories = ["All Categories"];
    const response = await getCategories();
    for (let category of response.data.data) categories.push(category.category_name);
    this.setState({ categories });
  }
  render() {
    const { categories } = this.state;
    const { onCategoryClick, currentCategory } = this.props;
    return (
      <ul
        className="list-group"
        style={{
          cursor: "pointer",
        }}
      >
        {categories.map((category) => (
          <li
            key={category}
            className={this.formateCategoryClass(currentCategory, category)}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    );
  }
  formateCategoryClass(currentCategory, category) {
    let cls = "list-group-item";
    return (cls += currentCategory === category ? " active" : "");
  }
}

export default Categories;
