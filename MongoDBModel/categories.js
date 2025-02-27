const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  Name: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Category", categoriesSchema);
