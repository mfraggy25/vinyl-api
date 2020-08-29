import React from "react";

export class AlbumCard extends React.Component {
  render() {
    // This is given to the <AlbumCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the albums endpoint of your API
    const { album, onClick } = this.props;

    return (
      <div className="album-card" onClick={() => onClick(album)}>
        {album.Title}
      </div>
    );
  }
}
