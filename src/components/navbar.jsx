import React, { Component } from "react";
import Search from "./search";
import { NavLink } from "react-router-dom";
import { getProducts } from './../servicies/productsService';


class Navbar extends Component {
  state = {};

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }
  render() {
    const { user } = this.props;    
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          {!user && (
            <React.Fragment>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item nav-link">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
          <NavLink to="/products" className="navbar-brand">
            Home
          </NavLink>
              <Search />
              <div>
                <span className={"badge badge-warning"}>
                  {this.props.productsCount}
                </span>
                <NavLink to="/cart" className="badge badge-secondary mx-2">
                  ShoppingCart
                </NavLink>
              </div>
              <NavLink to="/logout" className="nav-item nav-link">
                logout
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
