import React from "react";
import Dialog from "material-ui/Dialog";
import Input from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

import Note from "./note";

//Define some colors for our notes
const COLORS = ["#FCF997", "#96FFA0", "#9BF8FF", "#FFC1C5"];

/**
 * The Board component does the following:
 *
 * 1. Renders an empty board.
 * 2. Allows you to add new notes by double clicking and displaying a dialog.
 * 3. Stores all of the notes and renders them
 */
const Board = React.createClass({

  getRandomColor() {
    return COLORS[Math.floor(Math.random() * 4)];
  },

  handleClose() {
    //Set the state to the new notes array, triggering re-render
    this.setState({
      showDialog: false
    });
  },

  addNote() {
    const color = this.getRandomColor();

    //Create a note and add it to the notes Array
    const { notes } = this.state;

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
      nextNoteId: this.state.nextNoteId + 1,
      showDialog: false
    });
  },


  showNoteDialog(e) {
    //Capture the current x/y coordinates of the mouse click
    this.setState({
      addNoteX: e.clientX,
      addNoteY: e.clientY,
      showDialog: true
    });
  },

  focusNote(noteId) {
    //Called when a note is dragged, need to find and re-order the note
    //so it is rendered "on top" of other notes.
    let index = -1;

    //Find the note by ID
    for (let i = 0; i < this.state.notes.length; i++) {
      var note = this.state.notes[i];
      if( note.id === noteId ) {
        index = i;
      }
    }

    //Remove the note and add it to the end
    //HTML rendering will then render this last, i.e. "on top"
    if (index >= 0) {
      const { notes } = this.state;
      const note = notes.splice(index, 1);

      notes.push(note[0]);

      this.setState({
        notes: notes
      })
    }
  },

  setTitle(e, value) {
    //Capture the new note dialog title
    this.setState({
      addTitle: value
    });
  },

  setContent(e, value) {
    //Capture the new note dialog content
    this.setState({
      addContent: value
    })
  },

  getInitialState() {
    //Set the initial state to an empty array with a next node id of 0.
    return {
      notes: [],
      nextNoteId: 0,
      showDialog: false
    }
  },

  render() {
    let noteDivs = null;
    let noteDialog = null;

    //Dialog actions
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Add Note"
        primary={true}
        onClick={this.addNote}
      />,
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

        <Dialog ref="addNoteDialog" title="Add Note" actions={actions} open={this.state.showDialog}>
          <Input required={true} placeholder="Title" name="note-title" onChange={this.setTitle}/>
          <Input required={true} placeholder="Notes" name="note-content" onChange={this.setContent}/>
        </Dialog>
      </div>
    )
  }
});

module.exports = Board;
