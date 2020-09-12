import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_ALBUMS,
  SET_LOGGED_USER,
  SET_ARTIST,
  SET_SORT_FILTER,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function albums(state = [], action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.value;
    default:
      return state;
  }
}

function artists(state = [], action) {
  switch (action.type) {
    case SET_ARTIST:
      return action.value;
    default:
      return state;
  }
}

function loggedUser(state = [], action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return action.value;
    default:
      return state;
  }
}

function sortFilter(state = "", action) {
  switch (action.type) {
    case SET_SORT_FILTER:
      return action.value;
    default:
      return state;
  }
}

const vinylApp = combineReducers({
  visibilityFilter,
  albums,
  artists,
  loggedUser,
  sortFilter,
});

export default vinylApp;
