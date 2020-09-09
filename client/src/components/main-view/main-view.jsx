import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlbums, setLoggedUser } from "../../actions/actions";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import AlbumsList from "../albums-list/albums-list";
import { AlbumCard } from "../album-card/album-card";
import { AlbumView } from "../album-view/album-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-update";

export class MainView extends React.Component {
  // One of the "hooks" available in a React Component
  constructor(props) {
    //Call the superclass constructor
    // so React can initialize it
    super(props);

    this.state = {
      albums: [],
      user: null,
      email: "",
      birthday: "",
      userInfo: {},
    };
  }

  getAlbums(token) {
    axios
      .get("http://the-vinyl-life.herokuapp.com/albums", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          albums: response.data,
        });
        localStorage.setItem("albums", JSON.stringify(response.data));
        this.props.setAlbums(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("http://the-vinyl-life.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          email: response.data.Email,
          birthday: response.data.Birthday,
          token: token,
          userInfo: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getAlbums(accessToken);
      this.getUser(localStorage.getItem("user"), accessToken);
    }
  }

  onAlbumClick(album) {
    window.location.hash = "#" + album._id;
    this.setState({
      selectedAlbumId: album._id,
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });
    // Auth information (= user + token) received from handleLogin method has been saved in localStorage.
    // setItem method accepts two arguments (key and value)
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    // Will get the albums from the API once user is logged in
    this.getAlbums(authData.token);
    this.setState({
      userInfo: authData.user,
    });
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/client", "_self");
  }

  handleProfileUpdate(data) {
    this.setState({
      userInfo: data,
    });
    localStorage.setItem("user", data.username);
  }

  render() {
    const { albums, user, userInfo, token } = this.state;

    if (!albums) return <div className="main-view" />;
    if (!user) {
      return (
        <Router basename="/client">
          <div className="main-view">
            <Route
              exact
              path="/"
              render={() => (
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              )}
            />
            <Route path="/register" render={() => <RegistrationView />} />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="main-view">
            <Link component={RouterLink} to={`/users/${user}`}>
              <Button variant="outline-dark">Profile</Button>
            </Link>
            <Button variant="primary" onClick={() => this.handleLogout()}>
              Log out
            </Button>
            <Route
              exact
              path="/"
              render={() => <AlbumsList albums={albums} />}
            />
            <Route
              path="/albums/:albumId"
              render={({ match }) => (
                <AlbumView
                  album={albums.find((m) => m._id === match.params.albumId)}
                />
              )}
            />
            <Route
              path="/:Artist"
              render={({ match }) => (
                <AlbumView
                  album={albums.find((m) => m._id === match.params.Artist)}
                />
              )}
            />
            <Route
              path="/users/:Username"
              render={({ match }) => {
                return <ProfileView userInfo={userInfo} />;
              }}
            />
            <Route
              path="/update/:Username"
              render={() => (
                <ProfileUpdate
                  userInfo={userInfo}
                  user={user}
                  token={token}
                  updateUser={(data) => this.handleProfileUpdate(data)}
                />
              )}
            />
          </div>
        </Router>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return { albums: state.albums, loggedInUser: state.loggedInUser };
};
const mapDispatchToProps = {
  setAlbums,
  setLoggedUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
