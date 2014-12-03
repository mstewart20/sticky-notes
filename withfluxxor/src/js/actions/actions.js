var ActionConstants = require("../constants/actionconstants");

var Actions = {
  notes: {
    addNote: function(x, y, title, content) {
      this.dispatch(ActionConstants.ADD_NOTE, {
        x: x,
        y: y,
        title: title,
        content: content,
      })
    },

    startNoteDrag: function(id, x, y) {
      this.dispatch(ActionConstants.START_NOTE_DRAG, {
        id: id,
        x: x,
        y: y
      })
    },

    stopNoteDrag: function(id) {
      this.dispatch(ActionConstants.STOP_NOTE_DRAG, {
        id: id
      })
    },

    moveNote: function(id, x, y) {
      this.dispatch(ActionConstants.MOVE_NOTE, {
        id: id,
        x: x,
        y: y
      })
    },

    highlightNote: function(id) {
      this.dispatch(ActionConstants.HIGHLIGHT_NOTE, {
        id: id
      })
    },

    unhighlightNote: function(id) {
      this.dispatch(ActionConstants.UNHIGHLIGHT_NOTE, {
        id: id
      })
    }
  }
};

module.exports = Actions;