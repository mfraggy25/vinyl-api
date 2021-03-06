import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./album-card.scss";
import { Link } from "react-router-dom";

export class AlbumCard extends React.Component {
  render() {
    // This is given to the <AlbumCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the albums endpoint of your API
    const { album } = this.props;

    return (
      <Card style={{ width: "16rem" }}>
        <Card.Img variant="top" src={album.ImagePath} />
        <Card.Body>
          <Card.Title>{album.Title}</Card.Title>
          <Card.Text>{album.Artist}</Card.Text>
          <Link to={`/albums/${album._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Artist: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
