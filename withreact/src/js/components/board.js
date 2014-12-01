/** @jsx React.DOM */
var React = require("react");
var mui = require("material-ui");
var Dialog = mui.Dialog;
var Input = mui.Input;

var Note = require("./note");

/**
 * The Board component does the following:
 *
 * 1. Renders an empty board.
 * 2. Allows you to add new notes by double clicking and displaying a dialog.
 * 3. Stores all of the notes and renders them
 */
var Board = React.createClass({

  getRandomColor: function() {
    var colors = ["yellow", "green", "blue", "pink"];
    return colors[Math.floor(Math.random() * 4)];
  },

  addNote: function() {
    var color = this.getRandomColor();

    //Create a note and add it to the notes Array
    var notes = this.state.notes;

    notes.push({
      id: this.state.nextNoteId,
      title: this.state.addTitle,
      content: this.state.addContent,
      initialX: this.state.addNoteX - 100,
      initialY: this.state.addNoteY - 75,
      color: color
    });

    //Set the state to the new notes array, triggering re-render
    this.setState({
      notes: notes,
      nextNoteId: this.state.nextNoteId + 1
    });

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

  focusNote: function(noteId) {
    //Called when a note is dragged, need to find and re-order the note
    //so it is rendered "on top" of other notes.
    var index = -1;

    //Find the note by ID
    for( var i = 0; i < this.state.notes.length; i++ ) {
      var note = this.state.notes[i];
      if( note.id === noteId ) {
        index = i;
      }
    }

    //Remove the note and add it to the end
    //HTML rendering will then render this last, i.e. "on top"
    if( index >= 0 ) {
      var notes = this.state.notes;
      var note = notes.splice(index, 1);

      console.log("EXTRACTED NOTE", note);
      notes.push(note[0]);


      this.setState({
        notes: notes
      })
    }
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

  getInitialState: function() {
    //Set the initial state to an empty array with a next node id of 0.
    return {
      notes: [],
      nextNoteId: 0
    }
  },

  render: function() {
    var noteDivs = null;
    var noteDialog = null;

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
    }

    //Return the HTML for our board, which has our main div, all the "Note" component HTMLs and the Dialog HTML
    return (
      <div id="board" className="board" onDoubleClick={this.showNoteDialog}>
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