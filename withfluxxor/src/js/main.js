import React from "react";
import ReactDOM from "react-dom";

import Fluxxor from "fluxxor";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//Initiate fluxxor
import Board from "./components/board";
import NotesStore from "./stores/notesstore";
import actions from "./actions/actions";

const stores = {
  NotesStore: new NotesStore()
};

const flux = new Fluxxor.Flux(stores, actions);

const App = () => (
  <MuiThemeProvider>
    <Board flux={flux}/>
  </MuiThemeProvider>
);


//Use the main React.render method to render our Board component
//onto the HTML specified by the "main" element id.
ReactDOM.render(
    <App />,
    document.getElementById("main"));
