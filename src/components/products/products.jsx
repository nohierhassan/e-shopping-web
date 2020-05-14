import React, { Component, useLayoutEffect } from "react";
import Product from "./product";
import Pagination from "../pagination";
import { paginate } from "../../utils/paginate";
import Categories from "../categories/categories";
import Brands from "../brands/brands";
import { productFilter } from "../../utils/filter-product";
import { getProducts } from "../../servicies/productsService";
import { sortProducts } from "../../utils/sortProducts";
import { Link } from "react-router-dom";
import { searchProducts } from "./../../utils/searchProduct";
import { isAdmin } from "./../../servicies/authService";

class Products extends Component {
  state = {
    products: [],
    pageSize: 6,
    currentPage: 1,
    currentCategory: "All Categories",
    currentBrand: "All Brands",
    sortBy: { element: "Title", order: "asc" },
    searchQuery: "",
    is_admin: 0,
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
    const is_admin = await isAdmin();
    this.setState({ is_admin });
  }

  handlePageChannge = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  handleCategoryClick = (category) => {
    this.setState({ currentCategory: category, currentPage: 1 });
  };

  handleBrandClick = (brand) => {
    this.setState({ currentBrand: brand, currentPage: 1 });
  };

  render() {
    const {
      products,
      pageSize,
      currentPage,
      currentCategory,
      currentBrand,
      sortBy,
      searchQuery,
      is_admin,
    } = this.state;

    const filterdProducts = productFilter(
      products,
      currentCategory,
      currentBrand,
      currentPage
    );

    const sortedProduct = sortProducts(
      filterdProducts,
      sortBy.element,
      sortBy.order
    );

    const serchProduct = searchProducts(sortedProduct, searchQuery);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {paginate(currentPage, pageSize, sortedProduct).map((product) => (
                <div key={product.id} className="col-4">
                  <Product
                    onProductAdd={() => this.props.onProductadd(product)}
                    product={product}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            {is_admin==1 ?(

              <React.Fragment>
                <Link to="/admin-products" className="btn btn-primary m-2">
                  Products
                </Link>
                <Link to="/admin-brands" className="btn btn-primary m-2">
                  Brands
                </Link>
                <Link to="/admin-categories" className="btn btn-primary m-2">
                  Categories
                </Link>
                <Link to="/admin-orders" className="btn btn-primary m-2">
                  orders
                </Link>
              </React.Fragment>
              ):""
            }
            {/* <div>
              <SortBy />
            </div> */}
            <div className="my-4">
              {" "}
              <Categories
                onCategoryClick={this.handleCategoryClick}
                currentCategory={currentCategory}
              />
            </div>
            <div className="my-4">
              {" "}
              <Brands
                currentBrand={currentBrand}
                onBrandClick={this.handleBrandClick}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Pagination
            productsCount={sortedProduct.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChannge}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Products;
