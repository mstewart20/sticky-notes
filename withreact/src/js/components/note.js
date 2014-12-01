/** @jsx React.DOM */
var React = require("react");
var jQuery = require("jquery");
var mui = require("material-ui");
var Paper = mui.Paper;

/**
 * The Note components displays a note object which contains a title, content and a color. This
 * component is also responsible for positioning a note within the board. Positioning is done by
 * listening to mouse down, move and up events and simulating a drag command.
 */
var Note = React.createClass({
  startDrag: function(e) {

    //Get the position of the mouse based on the parent container.
    var pos = jQuery(this.getDOMNode()).position();

    //Tell parent to focus this note
    this.props.focusNote(this.props.note.id);

    //Relative is based on width of note at 200px
    this.setState({
      relativeRight: e.clientX - pos.left,
      relativeTop: e.clientY - pos.top,
      dragging: true
    });
  },

  stopDrag: function(e) {
    //Turn dragging off
    this.setState({
      dragging: false
    });
  },

  drag: function(e) {
    if( !this.state.dragging) return;

    //Set the current X, Y coordinates relative to mouse click, avoids "jumping" when clicked
    this.setState({
      x: e.clientX - this.state.relativeRight,
      y: e.clientY - this.state.relativeTop
    });

    e.stopPropagation();
    e.preventDefault();
  },

  getInitialState: function() {
    //Initial state is dragging off with the initial x/y coordinates coming from the creator of the Note.
    return {
      dragging: false,
      x: this.props.note.initialX,
      y: this.props.note.initialY
    }
  },

  componentDidUpdate: function(props, state) {
    //Trigger addition/removal of event listeners when dragging state is changed.
    //This avoids multiple notes from listening to events they shouldn't be aware of.
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.drag);
      document.addEventListener('mouseup', this.stopDrag)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.stopDrag)
    }
  },

  render: function() {
    //Assign position using inline CSS styles
    var positions = {
      top: this.state.y,
      left: this.state.x
    };

    //If we are dragging, bring everything to the "top" with z index and rotate the card for
    //a dramatic effect.
    if( this.state.dragging ) {
      positions.zIndex = 1;
      positions.transform = "rotate(20deg)";
    }

    //If we are dragging, then assign a higher zdepth (i.e. more shadow!)
    var depth = this.state.dragging ? 3 : 1;

    //Build dynamic class name based on the color of the note
    var noteClass = "note note-" + this.props.note.color;

    return (
      <Paper className={noteClass} style={positions} zDepth={depth} rounded={false} onMouseDown={this.startDrag}>
        <div className="note-title">{this.props.note.title}</div>
        <div className="note-content">{this.props.note.content}</div>
      </Paper>
    )
  }
});

module.exports = Note;