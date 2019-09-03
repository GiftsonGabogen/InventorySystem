const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  Name: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Unit: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  SellingPrice: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Item", itemsSchema);
