const express = require("express");
const Router = express.Router();
const Sales = require("../MongoDBModel/sales");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");

//Get All Post
Router.get("/", AuthCheck, (req, res) => {
  Sales.find()
    .populate("Item")
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Sales: result
      });
    })
    .catch(err => {
      res.status(200).json({ sucess: false });
    });
});

//Get Specific Sale
Router.get("/:id", (req, res) => {
  const { id } = req.params;
  Sales.find({ _id: id })
    .populate("Name")
    .exec()
    .then(result => {
      if (result.length === 0) {
        res.status(200).json({
          success: false,
          message: "Sale Not Found"
        });
      } else {
        res.status(200).json({
          success: true,
          Sale: result[0]
        });
      }
    })
    .catch(err => {
      res.status(200).json({ sucess: false, message: err });
    });
});

Router.post("/", AuthCheck, (req, res) => {
  const { ItemName, ItemID, Quantity, Seller, PricePerUnit } = req.body;
  const newSales = new Sales({
    _id: new mongoose.Types.ObjectId(),
    ItemName,
    ItemID,
    Quantity,
    Seller,
    PricePerUnit
  });

  newSales
    .save()
    .then(result => {
      res.status(201).json({ success: true, Sale: result });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
    });
});

Router.delete("/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Sales.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      res.status(201).json({
        message: "Deleted Comment Successfully",
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
});

module.exports = Router;
