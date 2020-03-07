const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  ItemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true
  },
  Custodian: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Note", NoteSchema);
