import React from "react";
import ReactDOM from "react-dom";
import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

import jQuery from "jquery";
import Paper from "material-ui/Paper";

/**
 * The Note components displays a note object which contains a title, content and a color. This
 * component is also responsible for positioning a note within the board. Positioning is done by
 * listening to mouse down, move and up events and simulating a drag command.
 */
const Note = React.createClass({
  mixins: [FluxMixin],

  startDrag(e) {

    //Get the position of the mouse based on the parent container.
    var pos = jQuery(ReactDOM.findDOMNode(this)).position();

    //Tell the note to start dragging.
    this.getFlux().actions.notes.startNoteDrag(this.props.note.id, e.clientX - pos.left, e.clientY - pos.top);

  },

  stopDrag(e) {
    this.getFlux().actions.notes.stopNoteDrag(this.props.note.id);
  },

  drag(e) {
    if( !this.props.note.dragging) return;

    this.getFlux().actions.notes.moveNote(this.props.note.id, e.clientX, e.clientY)

    e.stopPropagation();
    e.preventDefault();
  },


  componentDidUpdate(props, state) {
    //Trigger addition/removal of event listeners when dragging state is changed.
    //This avoids multiple notes from listening to events they shouldn't be aware of.
    if (this.props.note.dragging && !props.note.dragging) {
      document.addEventListener('mousemove', this.drag);
      document.addEventListener('mouseup', this.stopDrag)
    } else if (!this.props.note.dragging && props.note.dragging) {
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.stopDrag)
    }
  },

  render() {
    //Assign position using inline CSS styles
    var positions = {
      top: this.props.note.y,
      left: this.props.note.x,
      backgroundColor: this.props.note.color,
      transition: "initial",
    };

    //If we are dragging, bring everything to the "top" with z index and rotate the card for
    //a dramatic effect.
    if( this.props.note.dragging ) {
      positions.zIndex = 1;
      positions.transform = "rotate(20deg)";
    }

    //If we are dragging, then assign a higher zdepth (i.e. more shadow!)
    var depth = this.props.note.dragging ? 3 : 1;

    //Build dynamic class name based on the color of the note
    var noteClass = "note note-" + this.props.note.color;

    if( this.props.note.highlighted ) {
      noteClass += " note-highlighted";
    }

    return (
      <Paper className={noteClass} style={positions} zDepth={depth} rounded={false} onMouseDown={this.startDrag}>
        <div className="note-title">{this.props.note.title}</div>
        <div className="note-content">{this.props.note.content}</div>
      </Paper>
    )
  }
});

module.exports = Note;
