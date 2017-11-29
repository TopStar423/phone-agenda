import React, { Component } from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("hello");
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="signUp">
        <form>
          <h2>Sign Up</h2>
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
            type="submit"
            label="Save"
            onSubmit={this.handleFormSubmit}
          />
        </form>
      </div>
    );
  };
}

export default SignUp;