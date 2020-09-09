import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { MainView } from "./components/main-view/main-view";
import vinylApp from "./reducers/reducers";

const store = createStore(vinylApp);

// Main component (will eventually use all the others)
class VinylLife extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(VinylLife), container);
