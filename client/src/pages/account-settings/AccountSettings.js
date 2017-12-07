import React, {Component} from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Header from "../../components/partials/header/Header";
import {Link} from "react-router-dom";
import FullSearchBar from "../../components/search-bar/FullSearchBar";
import "./AccountSettings.css";
import API from "./../../utils/API";


class AccountSettings extends Component {
  state = {
    username: "",
    email: "",
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

  logout(){
    API.logout().then(
    console.log('logged out')
    );
  }


  render() {

    return (
      <div className="account-settings-wrapper">
        <Header>
          <FullSearchBar placeholder="Find a podcast" label={<i class="fa fa-search" aria-hidden="true"></i>}/>
          <Link to="/" onClick={this.logout}>Log Out</Link>
        </Header>
        <div className="accountSettings">
          <form>
            <h2>Account Settings</h2>
            <div>
              <div>
                <label>Username: </label>
                <div className="form-field">
                  <Input
                    onChange={this.handleInputChange}
                    value={this.state.username}
                    name="username"
                    type="text"
                    className="form-control"
                    id="username"
                    required=""
                  />

                  <Button
                    value="Submit"
                    label="Edit"
                    onClick={this.handleFormSubmit}
                  />
                  <Button
                    value="Submit"
                    label="Save"
                    onClick={this.handleFormSubmit}
                  />
                </div>
              </div>

              <div>
                <label>Email: </label>
                <div className="form-field">
                  <Input
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    name="email"
                    type="text"
                    className="form-control"
                    id="email"
                    required=""
                  />

                  <Button
                    value="Submit"
                    label="Edit"
                    onClick={this.handleFormSubmit}
                  />
                  <Button
                    value="Submit"
                    label="Save"
                    onClick={this.handleFormSubmit}
                  />
                </div>
              </div>

              <div>
                <label>Password: </label>
                <div className="form-field">
                  <Input
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    name="password"
                    type="text"
                    className="form-control"
                    id="password"
                    required=""
                  />

                  <Button
                    value="Submit"
                    label="Edit"
                    onClick={this.handleFormSubmit}
                  />
                  <Button
                    value="Submit"
                    label="Save"
                    onClick={this.handleFormSubmit}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default AccountSettings;