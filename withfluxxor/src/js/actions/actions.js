import ActionConstants from "../constants/actionconstants";

const Actions = {
  notes: {
    addNote(x, y, title, content) {
      this.dispatch(ActionConstants.ADD_NOTE, {
        x: x,
        y: y,
        title: title,
        content: content,
      })
    },

    startNoteDrag(id, x, y) {
      this.dispatch(ActionConstants.START_NOTE_DRAG, {
        id: id,
        x: x,
        y: y
      })
    },

    stopNoteDrag(id) {
      this.dispatch(ActionConstants.STOP_NOTE_DRAG, {
        id: id
      })
    },

    moveNote(id, x, y) {
      this.dispatch(ActionConstants.MOVE_NOTE, {
        id: id,
        x: x,
        y: y
      })
    },

    highlightNote(id) {
      this.dispatch(ActionConstants.HIGHLIGHT_NOTE, {
        id: id
      })
    },

    unhighlightNote(id) {
      this.dispatch(ActionConstants.UNHIGHLIGHT_NOTE, {
        id: id
      })
    }
  }
};

module.exports = Actions;
