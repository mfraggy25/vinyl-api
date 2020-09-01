import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import { AlbumCard } from "../album-card/album-card";
import { AlbumView } from "../album-view/album-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  // One of the "hooks" available in a React Component
  constructor(props) {
    //Call the superclass constructor
    // so React can initialize it
    super(props);

    this.state = {
      albums: null,
      selectedAlbum: null,
      user: null,
      register: false,
    };
  }

  componentDidMount() {
    let url_root = "https://the-vinyl-life.herokuapp.com";
    axios
      .get(`${url_root}/albums`)
      .then((response) => {
        // Assign the result to the state
        this.setState({
          albums: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onAlbumClick(album) {
    this.setState({
      selectedAlbum: album,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onButtonClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false,
    });
  }

  register() {
    this.setState({
      register: true,
    });
  }

  alreadyMember() {
    this.setState({
      register: false,
    });
  }

  render() {
    const { albums, selectedAlbum, user, register } = this.state;

    if (!user && register === false)
      return (
        <LoginView
          onClick={() => this.register()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    if (register)
      return (
        <RegistrationView
          onClick={() => this.alreadyMember()}
          onSignedIn={(user) => this.onSignedIn(user)}
        />
      );

    // if albums is not yet loaded
    if (!albums) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedAlbum ? (
              <AlbumView
                album={selectedAlbum}
                onClick={() => this.onAlbumClick(null)}
              />
            ) : (
              albums.map((album) => (
                <Col key={album._id} m={4}>
                  <AlbumCard
                    key={album._id}
                    album={album}
                    onClick={(album) => this.onAlbumClick(album)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
