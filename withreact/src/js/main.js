import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Board from "./components/board";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Board />
  </MuiThemeProvider>
);

//Use the main React.render method to render our Board component
//onto the HTML specified by the "main" element id.
ReactDOM.render(
    <App />,
    document.getElementById("main"));
