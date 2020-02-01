const express = require("express");
const Router = express.Router();
const Categories = require("../MongoDBModel/categories");
const mongoose = require("mongoose");
const moment = require("moment");
const AuthCheck = require("../middleware/authCheck");

Router.get("/", (req, res) => {
  Categories.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Categories: result,
        message: "Successfully Fetched Categories"
      });
    })
    .catch(err => {
      res.status(200).json({ success: false });
    });
});

Router.post("/", AuthCheck, (req, res) => {
  const { Name } = req.body;
  const newCategories = new Categories({
    _id: new mongoose.Types.ObjectId(),
    Name: Name
  });
  newCategories.save().then(result => {
    res.status(200).json({
      success: true,
      Category: result,
      message: `Successfully Added A Category Named ${Name}`
    });
  });
});

Router.post("/update", AuthCheck, (req, res) => {
  const { id, Name } = req.body;
  Categories.findByIdAndUpdate(id, { $set: { Name: Name } }, { new: true })
    .exec()
    .then(updatingResult => {
      res.status(200).json({
        success: true,
        Category: updatingResult,
        message: `Successfully Edited A Category to ${Name}`
      });
    })
    .catch(err => {
      console.log(err);
    });
});

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Categories.findOneAndRemove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Category: result,
        message: `Successfully Deleted Category ${result.Name}`
      });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
    });
});

module.exports = Router;
