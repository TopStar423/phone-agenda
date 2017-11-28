import React, { Component } from 'react';
import LandingPageIntro from './../../components/landing-page-intro/LandingPageIntro';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

class LandingPage extends Component {
  state = {
    search: ""
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
        <LandingPageIntro />
        <Input
          onChange={this.handleInputChange}
          value={this.state.search}
          name="search"
          type="text"
          className="form-control"
          id="search"
          required=""
        />
        <Button label="search" />
      </div>
    );
  };
}

export default LandingPage;