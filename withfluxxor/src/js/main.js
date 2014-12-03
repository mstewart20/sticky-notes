/** @jsx React.DOM */
var Board = require("./components/board");
var React = require("react");
var Fluxxor = require("fluxxor");

//Initiate fluxxor
var NotesStore = require("./stores/notesstore");

var actions = require("./actions/actions");
var stores = {
  NotesStore: new NotesStore()
};

var flux = new Fluxxor.Flux(stores, actions);

//Use the main React.render method to render our Board component
//onto the HTML specified by the "main" element id.
React.render(
    <Board flux={flux}/>,
    document.getElementById("main"));


