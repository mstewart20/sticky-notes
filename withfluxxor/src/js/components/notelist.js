/** @jsx React.DOM */
var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var mui = require("material-ui");
var Paper = mui.Paper;

var NoteItem = React.createClass({

  mixins: [FluxMixin],

  onMouseEnter: function() {
    this.getFlux().actions.notes.highlightNote(this.props.note.id);
  },

  onMouseLeave: function() {
    this.getFlux().actions.notes.unhighlightNote(this.props.note.id);
  },

  render: function() {
    return (
      <div className="noteitem" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="noteitem-title">{this.props.note.title}</div>
      </div>
    )
  }
})
/**
 * The NoteList components displays a list of note objects and their titles.
 */
var NoteList = React.createClass({
  mixins: [FluxMixin],

  render: function() {

    var noteItems = this.props.notes.map(function(note) {
      return <NoteItem key={note.id} note={note}/>
    }, this);

    return (
      <Paper className="notelist" zDepth={1} rounded={false}>
        {noteItems}
      </Paper>
    )
  }
});

module.exports = NoteList;