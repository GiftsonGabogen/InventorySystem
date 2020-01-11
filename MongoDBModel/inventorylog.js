const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventoryLogSchema = new Schema({
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
  ItemName: {
    type: String,
    required: true
  },
  Returnee: {
    type: String,
    required: true
  },
  Borrowed: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Borrower: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
