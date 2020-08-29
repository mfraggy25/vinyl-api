import React from "react";
import axios from "axios";

import { AlbumCard } from "../album-card/album-card";
import { AlbumView } from "../album-view/album-view";

export class MainView extends React.Component {
  // One of the "hooks" available in a React Component
  constructor() {
    //Call the superclass constructor
    // so React can initialize it
    super();

    this.state = {
      albums: null,
      selectedAlbum: null,
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

  render() {
    const { albums, selectedAlbum } = this.state;

    // if albums is not yet loaded
    if (!albums) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedAlbum ? (
          <AlbumView
            album={selectedAlbum}
            onClick={() => this.onAlbumClick(null)}
          />
        ) : (
          albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
              onClick={(album) => this.onAlbumClick(album)}
            />
          ))
        )}
      </div>
    );
  }
}
