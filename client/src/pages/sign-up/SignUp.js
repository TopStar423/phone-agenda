import React, {Component} from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Header from "../../components/partials/header/Header";
import "./SignUp.css";
import API from "../../utils/API.js";


class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: ""
    }
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
      .then(res =>
        this.props.history.push('/home')
      )
      .then(res =>
        this.setState({
          errors: {
            username: res.message.username,
            email: res.message.email,
            password: res.message.password
          }
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="sign-up-wrapper">
        <Header/>
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

              {!this.state.errors.username ? null : <div>{this.state.errors.username}</div>}

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

              {!this.state.errors.email ? null : <div>{this.state.errors.email}</div>}

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

              {!this.state.errors.password ? null : <div>{this.state.errors.password}</div>}

            </div>
            <Button
              value="Submit"
              type="submit"
              label="Save"
              onSubmit={this.handleFormSubmit}
            />
          </form>
        </div>
      </div>
    );
  };
}

export default SignUp;