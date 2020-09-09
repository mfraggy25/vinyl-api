export const SET_ALBUMS = "SET_ALBUMS";
export const SET_ARTIST = "SET_ARTIST";
export const SET_FILTER = "SET_FILTER";
export const SET_LOGGED_USER = "SET_LOGGED_USER";

export function setAlbums(value) {
  return { type: SET_ALBUMS, value };
}

export function setArtist(value) {
  return { type: SET_ARTIST, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setLoggedUser(value) {
  return { type: SET_LOGGED_USER, value };
}
