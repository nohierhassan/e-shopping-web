import React from "react";
import { register } from "../../servicies/usersService";
import Form from "./../common/form";
import Joi from "joi-browser";
import { login } from "./../../servicies/authService";

class Register extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Username"),
    email: Joi.string().required().label("email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await register(this.state.data);
      await login(data.email, data.password);
      window.location = "/products";
    } catch (ex) {
      if (ex.respone && ex.respone.status === 400) {
        const errors = { ...this.status.errors };
        errors.email = ex.respone.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "UserName")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
