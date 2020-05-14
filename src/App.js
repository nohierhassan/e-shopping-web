import React, { Component } from "react";
import Products from "./components/products/products";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Header from "./components/header";
import { Route, Redirect, Switch } from "react-router-dom";
import ShoppingCart from "./components/shopping-cart";
import NotFound from "./components/not-found";
import LogIn from "./components/authentication/login";
import Register from "./components/authentication/register";
import AdminProduct from "./components/products/admin-product";
import AdminBrand from "./components/brands/admin-brand";
import AdminCategory from "./components/categories/admin-category";
import Logout from "./components/authentication/logout";
import { getCurrentUser } from "./servicies/authService";
import EditCategory from "./components/categories/editCategory";
import EditBrand from "./components/brands/editBrand";
import AddProduct from "./components/products/add-product";
import OrderAdmin from './components/orders/admin-order';
import OrderDetails from './components/orders/order-details';
import AdminRoute from './components/common/adminRoute';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = { products: [], user: {} };

  async componentDidMount() {
    const user = getCurrentUser();
    // const userInfo = await getUser(user.user_id);
    // console.log("userInfo", userInfo.name);

    this.setState({ user });
  }

  handleProductAdd = (product) => {
    let products = [...this.state.products, product];
    this.setState({ products });
  };

  handleClearCart = () => {
    let products = [];
    this.setState({ products });
  };

  render() {
    const { products, user } = this.state;
    return (
      <React.Fragment>
        <Navbar productsCount={products.length} user={user} />
        <Header />
        <div className="content">
          <Switch>
            <Route path="/notFound" exact component={NotFound} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />

            <Route
              path="/cart"
              exact
              render={(props) => (
                <ShoppingCart
                  {...props}
                  products={products}
                  onClearCart={this.handleClearCart}
                />
              )}
            />
            <Route
              path="/products"
              exact
              render={(props) => (
                <Products {...props} onProductadd={this.handleProductAdd} />
              )}
            />
            <ProtectedRoute path="/admin-products"  component={AdminProduct} />
            <ProtectedRoute path="/admin-orders"  component={OrderAdmin} />
            <ProtectedRoute path="/order/:id"  component={OrderDetails} />
            <ProtectedRoute path="/add-product"  component={AddProduct} />
            <ProtectedRoute path="/admin-brands"  component={AdminBrand} />
            <ProtectedRoute path="/edit-category/:id"  component={EditCategory} />
            <ProtectedRoute path="/edit-brand/:id"  component={EditBrand} />
            <ProtectedRoute path="/admin-categories"  component={AdminCategory} />

            <Redirect from="/" to="/login" />
            <Redirect to="/notFound" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
