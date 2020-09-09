import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { AlbumCard } from "../album-card/album-card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function AlbumsList(props) {
  const { albums, visibilityFilter } = props;
  let filteredAlbums = albums;

  if (visibilityFilter !== "") {
    filteredAlbums = albums.filter((m) => m.Title.includes(visibilityFilter));
    filteredAlbums = albums.filter((m) => m.Artist.includes(visibilityFilter));
  }

  if (!albums) return <div className="main-view" />;

  return (
    <div className="albums-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <Container>
        <Row>
          {filteredAlbums.map((m) => (
            <AlbumCard key={m._id} album={m} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps)(AlbumsList);
