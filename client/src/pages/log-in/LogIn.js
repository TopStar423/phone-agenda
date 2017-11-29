import React, { Component } from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./LogIn.css";

class SignUp extends Component {
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
                value={this.state.password1}
                name="password1"
                type="text"
                className="form-control"
                id="password1"
                required=""
              />
            </div>

          </div>
          <Button
            value="Submit"
            label="Log In"
            onClick={this.handleFormSubmit}
          />
        </form>
      </div>
    );
  };
}

export default SignUp;