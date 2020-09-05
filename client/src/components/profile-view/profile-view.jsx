import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./profile-view.scss";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userInfo: null,
      OwnList: [],
      WantList: [],
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios
      .get(
        `http://the-vinyl-life.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}`,
        {
          username: localStorage.getItem("user"),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          userInfo: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          OwnList: response.data.OwnList,
          WantList: response.data.WantList,
        });
      })
      .catch((error) => {
        console.log("tested", error);
      });
  }

  deleteOwnedVinyl(event, OwnList) {
    event.preventDefault();
    axios
      .delete(
        `http://the-vinyl-life.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/albums/${OwnList}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        this.getUser(localStorage.getItem("token"));
        alert("You no longer own this vinyl!");
      })
      .catch(function (error) {
        alert("Something went wrong!");
      });
  }

  deleteWantedVinyl(event, WantList) {
    event.preventDefault();
    axios
      .delete(
        `http://the-vinyl-life.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/albums/${WantList}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        this.getUser(localStorage.getItem("token"));
        alert("You no longer want this vinyl!");
      })
      .catch(function (error) {
        alert("Something went wrong!");
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { username, email, birthday, OwnList, WantList = [] } = this.state;

    return (
      <Card className="profile-view" style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>Password:******* </ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>
              Birthday: {birthday && birthday.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>
              Vinyls I Own:
              <div>
                {OwnList.length === 0 && (
                  <div>You currently don't own any vinyls</div>
                )}
                {OwnList.length > 0 && (
                  <ul>
                    {OwnList.map((OwnList) => (
                      <li key={OwnList}>
                        <p>
                          {
                            JSON.parse(localStorage.getItem("albums")).find(
                              (album) => album._id === OwnList
                            ).Title
                          }
                        </p>
                        <Link to={`/albums/${OwnList}`}>
                          <Button size="sm" variant="info">
                            Open
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(event) =>
                            this.deleteOwnedVinyl(event, OwnList)
                          }
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              Vinyls I Want:
              <div>
                {WantList.length === 0 && (
                  <div>You currently have no vinyls on your wishlist</div>
                )}
                {WantList.length > 0 && (
                  <ul>
                    {WantList.map((WantList) => (
                      <li key={WantList}>
                        <p>
                          {
                            JSON.parse(localStorage.getItem("albums")).find(
                              (album) => album._id === WantList
                            ).Title
                          }
                        </p>
                        <Link to={`/albums/${WantList}`}>
                          <Button size="sm" variant="info">
                            Open
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(event) =>
                            this.deleteWantedVinyl(event, WantList)
                          }
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-center">
            <Link to={`/`}>
              <Button variant="outline-info">Go back</Button>
            </Link>
            <Link to={`/update/:Username`}>
              <Button variant="outline-secondary">Update profile</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
