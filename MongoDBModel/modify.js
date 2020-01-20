const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modifySchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  InventoryInfo: {
    type: Object,
    required: true
  },
  Description: {
    type: String,
    default: "none"
  },
  Custodian: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Modify", modifySchema);
