/** @jsx React.DOM */
var Board = require("./components/board");
var React = require("react");

//Use the main React.render method to render our Board component
//onto the HTML specified by the "main" element id.
React.render(
    <Board />,
    document.getElementById("main"));


