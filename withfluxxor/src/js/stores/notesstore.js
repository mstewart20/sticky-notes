import ActionConstants from "../constants/actionconstants";
import Fluxxor from "fluxxor";
import lodash from "lodash";

//Define some colors for our notes
const COLORS = ["#FCF997", "#96FFA0", "#9BF8FF", "#FFC1C5"];

const NotesStore = Fluxxor.createStore({
  initialize() {
    this.notes = [];
    this.nextNodeId = 1;

    this.bindActions(
        ActionConstants.ADD_NOTE, this.onAddNote,
        ActionConstants.START_NOTE_DRAG, this.onStartNoteDrag,
        ActionConstants.STOP_NOTE_DRAG, this.onStopNoteDrag,
        ActionConstants.MOVE_NOTE, this.onMoveNote,
        ActionConstants.HIGHLIGHT_NOTE, this.onHighlightNote,
        ActionConstants.UNHIGHLIGHT_NOTE, this.onUnhighlightNote
    );
  },

  getState() {
    return {
      notes: lodash.cloneDeep(this.notes)
    };
  },

  _getRandomColor() {
    return COLORS[Math.floor(Math.random() * 4)];
  },

  _findNoteIndex(id) {
    for( var i = 0; i < this.notes.length; i++ ) {
      if( this.notes[i].id === id ) {
        return i;
      }
    }

    return null;
  },

  onAddNote(payload) {
    this.notes.push({
      id: this.nextNodeId,
      x: payload.x,
      y: payload.y,
      title: payload.title,
      content: payload.content,
      color: this._getRandomColor(),
      highlighted: false,
      dragging: false
    });

    this.nextNodeId = this.nextNodeId + 1;

    this.emit("change");
  },



  onStartNoteDrag(payload) {
    var noteIndex = this._findNoteIndex(payload.id);

    if( noteIndex >= 0 ) {
      var note = this.notes[noteIndex];

      note.dragging = true;
      note.relativeX = payload.x;
      note.relativeY = payload.y;

      //reorder the notes now
      //Remove the note and add it to the end
      //HTML rendering will then render this last, i.e. "on top"
      var removedNotes = this.notes.splice(noteIndex, 1);
      this.notes.push(removedNotes[0]);

      this.emit("change");
    }
  },

  onStopNoteDrag(payload) {
    var noteIndex = this._findNoteIndex(payload.id);


    if( noteIndex >= 0 ) {
      var note = this.notes[noteIndex];
      note.dragging = false;

      this.emit("change");
    }
  },

  onMoveNote(payload) {
    var noteIndex = this._findNoteIndex(payload.id);

    if( noteIndex >= 0 ) {
      var note = this.notes[noteIndex];

      //Set the current X, Y coordinates relative to mouse click, avoids "jumping" when clicked
      note.x = payload.x - note.relativeX;
      note.y = payload.y - note.relativeY;

      this.emit("change");
    }
  },

  onHighlightNote(payload) {
    var noteIndex = this._findNoteIndex(payload.id);

    if( noteIndex >= 0 ) {
      var note = this.notes[noteIndex];
      note.highlighted = true;

      this.emit("change");
    }
  },

  onUnhighlightNote(payload) {
    var noteIndex = this._findNoteIndex(payload.id);

    if( noteIndex >= 0 ) {
      var note = this.notes[noteIndex];
      note.highlighted = false;

      this.emit("change");
    }

  }
});

module.exports = NotesStore;
