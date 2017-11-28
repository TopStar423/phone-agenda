import React, { Component } from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
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
      <div>
        <form>
          <h2>Sign Up:</h2>
          <div> 
            <div>
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

            <div>
              <label>Email: </label>
              <Input 
                onChange={this.handleInputChange} 
                value={this.state.email}
                name="email"
                type="text"
                className="form-control"
                id="email"
                required=""
               />
            </div>

            <div>
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

            <div>
              <label>Confirm password: </label>
              <Input 
                onChange={this.handleInputChange} 
                value={this.state.password2}
                name="password2"
                type="text"
                className="form-control"
                id="password2"
                required=""
              />
            </div>
          </div>
        </form>
        <div style={{clear: "both"}}>
          <Button
            value="Submit"
            label="Save"
            onClick={this.handleFormSubmit}
          />
        </div>
      </div>
    );
  };
}

export default SignUp;