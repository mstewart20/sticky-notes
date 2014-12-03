/** @jsx React.DOM */
var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var mui = require("material-ui");
var Dialog = mui.Dialog;
var Input = mui.Input;
var Paper = mui.Paper;

var Note = require("./note");
var NoteList = require("./notelist");

/**
 * The Board component does the following:
 *
 * 1. Renders an empty board.
 * 2. Allows you to add new notes by double clicking and displaying a dialog.
 * 3. Stores all of the notes and renders them
 */
var Board = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("NotesStore")],

  addNote: function() {
    this.getFlux().actions.notes.addNote(
        this.state.addNoteX - 100,
        this.state.addNoteY - 75,
        this.state.addTitle,
        this.state.addContent);


    //Dismiss the dialog
    this.refs.addNoteDialog.dismiss();
  },

  showNoteDialog: function(e) {
    //Capture the current x/y coordinates of the mouse click
    this.setState({
      addNoteX: e.clientX,
      addNoteY: e.clientY
    });

    //Use a ref variable to display the note dialog
    this.refs.addNoteDialog.show();
  },

  setTitle: function(e, value) {
    //Capture the new note dialog title
    this.setState({
      addTitle: value
    });
  },

  setContent: function(e, value) {
    //Capture the new note dialog content
    this.setState({
      addContent: value
    })
  },

  getStateFromFlux: function() {
    return this.getFlux().store("NotesStore").getState();
  },

  render: function() {
    var noteDivs = null;
    var noteDialog = null;
    var noteList = null;

    //Dialog actions
    var actions = [
      { text: "Cancel" },
      { text: "Add Note", onClick: this.addNote }
    ];

    //If we do not have any notes, then prompt the user
    if (this.state.notes.length === 0) {
      noteDivs = [
        <div key="empty" className="empty">Double click on the board to add a note</div>
      ]
    } else {
      //Otherwise create a new Note component for every note in the array
      noteDivs = this.state.notes.map(function (note, index) {
        return (<Note key={note.id} note={note} focusNote={this.focusNote}/>)
      }, this)

      noteList = <NoteList notes={this.state.notes}/>
    }

    //Return the HTML for our board, which has our main div, all the "Note" component HTMLs and the Dialog HTML
    return (
      <div id="board" className="board" onDoubleClick={this.showNoteDialog}>

        {noteList}
        {noteDivs}

        <Dialog ref="addNoteDialog" title="Add Note" actions={actions}>
          <Input required={true} placeholder="Title" name="note-title" onChange={this.setTitle}/>
          <Input required={true} placeholder="Notes" name="note-content" onChange={this.setContent}/>
        </Dialog>
      </div>
    )
  }
});

module.exports = Board;