import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import SortFilterDropdown from "../sort-filter-dropdown/sort-filter-dropdown";
import { AlbumCard } from "../album-card/album-card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const mapStateToProps = (state) => {
  const { visibilityFilter, sortFilter } = state;
  return { visibilityFilter, sortFilter };
};

function AlbumsList(props) {
  const { albums, visibilityFilter, sortFilter } = props;
  let filteredAlbums = albums;

  if (visibilityFilter !== "") {
    filteredAlbums = albums.filter((m) => m.Title.includes(visibilityFilter));
    filteredAlbums = albums.filter((m) => m.Artist.includes(visibilityFilter));
  }
  switch (sortFilter) {
    case "Album Title":
      filteredAlbums.sort((a, b) => (a.Title > b.Title ? 1 : -1));
      break;
    default:
      break;
  }
  switch (sortFilter) {
    case "Artist":
      filteredAlbums.sort((a, b) => (a.Artist > b.Artist ? 1 : -1));
      break;
    default:
      break;
  }

  if (!albums) return <div className="main-view" />;

  return (
    <div className="albums-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <SortFilterDropdown sortFilter={sortFilter} />
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
