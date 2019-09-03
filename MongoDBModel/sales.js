const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  ItemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  ItemName: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  PricePerUnit: {
    type: Number,
    required: true
  },
  Category: {
    type: String,
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

module.exports = mongoose.model("Sale", salesSchema);
