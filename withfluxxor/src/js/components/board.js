import React from "react";
import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);
const StoreWatchMixin = Fluxxor.StoreWatchMixin;

import Dialog from "material-ui/Dialog";
import Input from "material-ui/TextField";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

import Note from "./note";
import NoteList from "./notelist";

/**
 * The Board component does the following:
 *
 * 1. Renders an empty board.
 * 2. Allows you to add new notes by double clicking and displaying a dialog.
 * 3. Stores all of the notes and renders them
 */
const Board = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("NotesStore")],

  addNote() {
    this.getFlux().actions.notes.addNote(
        this.state.addNoteX - 100,
        this.state.addNoteY - 75,
        this.state.addTitle,
        this.state.addContent);

    this.setState({
      showDialog: false
    });
  },

  handleClose() {
    this.setState({
      showDialog: false
    })
  },

  showNoteDialog(e) {
    //Capture the current x/y coordinates of the mouse click
    this.setState({
      addNoteX: e.clientX,
      addNoteY: e.clientY,
      showDialog: true
    });
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

  getStateFromFlux() {
    return this.getFlux().store("NotesStore").getState();
  },

  getInitialState() {
    return {
      showDialog: false
    }
  },

  render() {
    let noteDivs = null;
    let noteDialog = null;
    let noteList = null;

    //Dialog actions
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

      noteList = <NoteList notes={this.state.notes}/>
    }

    //Return the HTML for our board, which has our main div, all the "Note" component HTMLs and the Dialog HTML
    return (
      <div id="board" className="board" onDoubleClick={this.showNoteDialog}>

        {noteList}
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
