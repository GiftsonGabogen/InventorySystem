const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventoriesSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  Name: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  From: {
    type: String,
    required: true
  },
  Borrower: {
    type: String,
    default: "None",
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  PricePerUnit: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true,
    default: 1
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Inventory", inventoriesSchema);
