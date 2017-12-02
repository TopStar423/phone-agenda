import React, {Component} from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Header from "../../components/partials/header/Header"
import "./LogIn.css";
import API from "../../utils/API.js";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
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
      .then(res => {
        if (res.status < 400) {
            this.props.history.push('/home');
        }
      })
      .catch(err => {
        if(!err) return;
        if(err.response.status >= 500) {
          console.error(err);
        } else {
          console.log(err.response.data.statusCat);
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  render() {
    return (
      <div className="log-in-wrapper">
        <Header/>
        <div className="log-in">
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

              {!this.state.error ? null : <div>{this.state.error}</div>}

            </div>
            <Button
              value="Submit"
              label="Log In"
              onSubmit={this.handleFormSubmit}
            />
          </form>
        </div>
      </div>
    );
  };
}

export default Login;