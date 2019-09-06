const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  Name: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  },
  UserImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", usersSchema);
