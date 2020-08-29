import React from "react";

export class AlbumView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { album, onClick } = this.props;

    if (!album) return null;

    return (
      <div className="album-view">
        <div className="album-title">
          <div className="label">Title</div>
          <div className="value">{album.Title}</div>
        </div>
        <div className="album-artist">
          <div className="label">Artist</div>
          <div className="value">{album.Artist}</div>
        </div>
        <img className="album-poster" src={album.ImagePath} />
        <div className="album-genre">
          <div className="label">Genre</div>
          <div className="value">{album.Genre}</div>
        </div>
        <div className="album-year">
          <div className="label">Year Released</div>
          <div className="value">{album.Year}</div>
        </div>
        <button onClick={() => onClick()}>Back</button>
      </div>
    );
  }
}
