import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./album-view.scss";

export class AlbumView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { album, onClick } = this.props;
    if (!album) return null;

    return (
      <div>
        <Card style={{ width: "50%" }}>
          <Card.Img variant="top" src={album.ImagePath} />
          <Card.Body>
            <Card.Title>{album.Title}</Card.Title>
            <Card.Title>{album.Artist}</Card.Title>
            <Card.Text>{album.Genre}</Card.Text>
            <Card.Text>{album.Year}</Card.Text>
            <Button
              variant="primary"
              onClick={() => onClick()}
              className="homeButton"
            >
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
