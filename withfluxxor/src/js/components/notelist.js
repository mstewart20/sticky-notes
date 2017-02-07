import React from "react";
import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

import Paper from "material-ui/Paper";

const NoteItem = React.createClass({

  mixins: [FluxMixin],

  onMouseEnter() {
    this.getFlux().actions.notes.highlightNote(this.props.note.id);
  },

  onMouseLeave() {
    this.getFlux().actions.notes.unhighlightNote(this.props.note.id);
  },

  render() {
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

  render() {

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
