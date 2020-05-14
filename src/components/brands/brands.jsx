import React, { Component } from "react";
import http from "../../servicies/httpService";
import { getBrands } from './../../servicies/brandsService';

class Brands extends Component {
  state = {
    brands: ["All Brands"],
  };


  async componentDidMount() {
    const brands = ["All Brands"];
    const response = await getBrands();
    for (let brand of response.data.data) brands.push(brand.brand_name);
    this.setState({ brands });
  }

  render() {
    const { brands } = this.state;
    const { currentBrand, onBrandClick } = this.props;
    return (
      <ul
        className="list-group"
        style={{
          cursor: "pointer",
        }}
      >
        {brands.map((brand) => (
          <li
            key={brand}
            className={this.formateBrandClass(currentBrand, brand)}
            onClick={() => onBrandClick(brand)}
          >
            {brand}
          </li>
        ))}
      </ul>
    );
  }
  formateBrandClass(currentBrand, Brand) {
    let cls = "list-group-item";
    return (cls += currentBrand === Brand ? " active" : "");
  }
}

export default Brands;
