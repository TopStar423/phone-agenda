import React, { Component } from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./LogIn.css";
import API from "../../utils/API.js";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.login({
      username: this.state.username, 
      password: this.state.password
    })
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="logIn">
        <form>
          <h2>Log In</h2>
          <div>
            <div className="form-field">
              <label>Username: </label>
              <Input
                onChange={this.handleInputChange}
                value={this.state.username}
                name="username"
                type="text"
                className="form-control"
                id="username"
                required=""
              />
            </div>

            <div className="form-field">
              <label>Password: </label>
              <Input
                onChange={this.handleInputChange}
                value={this.state.password}
                name="password"
                type="text"
                className="form-control"
                id="password"
                required=""
              />
            </div>

          </div>
          <Button
            value="Submit"
            label="Log In"
            onSubmit={this.handleFormSubmit}
          />
        </form>
      </div>
    );
  };
}

export default Login;