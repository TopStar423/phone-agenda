import React, { Component } from "react";
import { Col, Row, Container } from "./../components/Grid";
import API from "./../utils/API";
import Main from "./../components/Main";
import { PodcastList, PodcastListItem } from "./../components/list";
import he from "he";


class Podcasts extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    episodes: []
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handlePodcastSave = (title) => {

  }

  handleFormSubmit = event => {
    event.preventDefault();
    var replaced = this.state.title.split(' ').join('+');
    API.search(replaced).then(res => this.setState({
      title: res.data.rss.title,
      description: res.data.rss.description,
      image: res.data.rss.image,
      episodes: res.data.rss.items
    }))
    .catch(err => console.log(err));   
    
  }

  handleStripHTML = (description) => {
    var stripped = description.replace(/<[^>]+>/g, '');
    var decoded = he.decode(stripped)
    return decoded;
  }

  render() {
    //console.log(this.state.episodes[0]);
    return (
      <Container fluid>
        <Row>
          <Col size="md-1"></Col>
          <Col size="md-10">          
            <Main 
              title={this.state.title}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Col>
          <Col size="md-1"></Col>
        </Row>
        <Row>
          <Col size="md-1"></Col>
           <Col size="md-10">
            {!this.state.episodes.length ? (
              <li className="list-group-item">
                <h3 style={{ marginTop: "10px", marginBottom: "15px" }}><span><em>Enter search terms to begin...</em></span></h3>
              </li>
            ) : (
              <PodcastList 
              length={this.state.episodes.length}
              title={this.state.title}
              description={this.state.description}
              image={this.state.image}
              >
             {this.state.episodes.map(episode => {
                return (
                  <PodcastListItem
                    key={episode.title}
                    title={episode.title}
                    description={episode.description}
                    link={episode.link}
                    handlePodcastSave={this.handlePodcastSave}
                    handleStripHTML={this.handleStripHTML}
                  />
                );
              })}
              </PodcastList>
            )}
          </Col>
          <Col size="md-1"></Col>
        </Row>
      </Container>
    );
  };
}

export default Podcasts;