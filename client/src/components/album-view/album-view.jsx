import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./album-view.scss";

export function AlbumView(props) {
  const { album } = props;
  if (!album) return null;
  console.log("adding an album");

  function addOwnedVinyl(event) {
    event.preventDefault();
    console.log("film");
    axios
      .post(
        `http://the-vinyl-life.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/albums/${album._id}`,
        {
          Username: localStorage.getItem("user"),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("Album added", response);
        alert("Album added to your Owned List!");
      })
      .catch((event) => {
        console.log("error adding album to list");
        alert("Error adding album!");
      });
  }

  // function a ddWantedVinyl(event) {
  //   event.preventDefault();
  //   console.log("film");
  //   axios
  //     .post(
  //       `http://the-vinyl-life.herokuapp.com/users/${localStorage.getItem(
  //         "user"
  //       )}/albums/${album._id}`,
  //       {
  //         Username: localStorage.getItem("user"),
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Album added", response);
  //       alert("Album added to your Wishlist!");
  //     })
  //     .catch((event) => {
  //       console.log("error adding album to list");
  //       alert("Error adding album!");
  //     });
  // }

  return (
    <div>
      <Card style={{ width: "50%" }}>
        <Card.Img variant="top" src={album.ImagePath} />
        <Card.Body>
          <Card.Title>{album.Title}</Card.Title>
          <Card.Title>{album.Artist}</Card.Title>
          <Card.Text>{album.Genre}</Card.Text>
          <Card.Text>{album.Year}</Card.Text>
          <Button variant="warning" onClick={(event) => addOwnedVinyl(event)}>
            {" "}
            I already own this vinyl{" "}
          </Button>
          {/* <Button variant="warning" onClick={(event) => addWantedVinyl(event)}>
            {" "}
            I want this vinyl{" "}
          </Button> */}
          <Link to={`/`}>
            <Button variant="outline-info">Go Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

AlbumView.propTypes = {
  album: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};
