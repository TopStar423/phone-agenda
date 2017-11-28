import React, {Component} from 'react';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./AccountSettings.css";

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

  render() {

    return (
      <div>
        <form>
          <h2>Account Settings:</h2>
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

            <div>
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
        </form>
      </div>
    );
  };
}

export default AccountSettings;