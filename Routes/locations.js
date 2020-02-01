const express = require("express");
const Router = express.Router();
const Locations = require("../MongoDBModel/locations");
const mongoose = require("mongoose");
const moment = require("moment");
const AuthCheck = require("../middleware/authCheck");

Router.get("/", (req, res) => {
  Locations.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Locations: result,
        message: "Successfully Fetched Locations"
      });
    })
    .catch(err => {
      res.status(200).json({ success: false });
    });
});

Router.post("/", AuthCheck, (req, res) => {
  const { Name } = req.body;
  const newLocations = new Locations({
    _id: new mongoose.Types.ObjectId(),
    Name: Name
  });
  newLocations.save().then(result => {
    res.status(200).json({
      success: true,
      Location: result,
      message: `Successfully Added A Location Named ${Name}`
    });
  });
});

Router.post("/update", AuthCheck, (req, res) => {
  const { id, Name } = req.body;
  Locations.findByIdAndUpdate(id, { $set: { Name: Name } }, { new: true })
    .exec()
    .then(updatingResult => {
      res.status(200).json({
        success: true,
        Location: updatingResult,
        message: `Successfully Edited A Location to ${Name}`
      });
    });
});

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Locations.findOneAndRemove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Location: result,
        message: `Successfully Delete Location ${result.Name}`
      });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
    });
});

module.exports = Router;
