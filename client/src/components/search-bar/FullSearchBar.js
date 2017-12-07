import React, {Component} from 'react';
import Input from '../input/Input';
import {withRouter} from "react-router-dom";



class FullSearchBar extends Component {
  state = {
    podcast_title: "",
    podcasts: []
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.history.push('/search-results/' + this.state.podcast_title);
  }

  render() {
    return (
      <form className="searchbar" onSubmit={this.handleFormSubmit}>
        <Input
          onChange={this.handleInputChange}
          value={this.state.podcast_title}
          name="podcast_title"
          type="text"
          className="form-control"
          id="title"
          required=""
          placeholder={this.props.placeholder}
        />
        {/*<Link to={`/search-results/${props.podcast_title}`} onClick={props.onClick}>*/}
        <button type="submit" disabled={!this.state.podcast_title}>{this.props.label}</button>
        {/*</Link>*/}
      </form>
    );
  };
}

export default withRouter(FullSearchBar);