import { Component } from "react";
import { logout } from "../../servicies/authService";

class Logout extends Component {
  componentDidMount() {
    window.location = "/login";
    logout();
  }
  render() {
    return null;
  }
}

export default Logout;
