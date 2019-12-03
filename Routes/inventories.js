const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const Inventories = require("../MongoDBModel/Inventories");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");

//Get All Post
Router.get("/", (req, res) => {
  Inventories.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Inventories: result,
        message: "Successfully Fetched Inventories"
      });
    })
    .catch(err => {
      res.status(200).json({ sucess: false });
    });
});

//Get Specific Inventory
Router.get("/:id", (req, res) => {
  const { id } = req.params;
  Inventories.find({ _id: id })
    .exec()
    .then(result => {
      if (result.length === 0) {
        res.status(200).json({
          success: false,
          message: "Inventory Not Found"
        });
      } else {
        res.status(200).json({
          success: true,
          Inventory: result[0],
          message: `Successfully Fetched Inventory ${result.Name}`
        });
      }
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
    });
});

//Add Inventory
Router.post("/AddInventory", AuthCheck, (req, res) => {
  const { Name, From, Location, PricePerUnit, Quantity } = req.body;
  const newInventories = new Inventories({
    _id: new mongoose.Types.ObjectId(),
    Name,
    From,
    Location,
    PricePerUnit,
    Quantity
  });
  newInventories.save().then(result => {
    res
      .status(200)
      .json({
        success: true,
        Inventory: result,
        message: `Successfully Added ${Quantity} ${Name} for ${Location} from ${From}`
      });
  });
});

Router.put("/ItemBorrowing", AuthCheck, (req, res) => {
  const { id, Borrower, Quantity } = req.body;
  Inventories.findByIdAndUpdate(
    id,
    {
      $set: {
        Borrower,
        Borrowed: Quantity,
        Status: "Borrowed"
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Inventory: result,
        message: `Successfully Edited Inventory ${result.Name}`
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err
      });
    });
});

Router.put("/Removed", AuthCheck, (req, res) => {
  const { id, Quantity } = req.body;
  Inventories.findById(id)
    .exec()
    .then(result => {
      if (result.Quantity > Quantity) {
        Inventories.findByIdAndUpdate(
          id,
          {
            $set: {
              Quantity: result.Quantity - Quantity
            }
          },
          { new: true }
        )
          .exec()
          .then(removedResult => {
            res.status(200).json({
              success: true,
              Inventory: removedResult,
              message: `Successfully Removed ${Quantity} of ${result.Name} in the Inventory `
            });
          });
      } else {
        Inventories.findByIdAndUpdate(
          id,
          {
            $set: {
              Quantity: 0,
              Status: "Removed"
            }
          },
          { new: true }
        )
          .exec()
          .then(removedResult => {
            res.status(200).json({
              success: true,
              Inventory: removedResult,
              message: `Successfully Removed all of ${result.Name} in the Inventory `
            });
          });
      }
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err
      });
    });
});

Router.post("/multiple", AuthCheck, (req, res) => {
  const { ids } = req.body;
  let count = 0;
  ids.map(id => {
    Inventories.findByIdAndDelete(id.id)
      .exec()
      .then(result => {
        if (count === ids.length - 1) {
          res.status(201).json({
            message: `Successfully Deleted Inventories ${ids.map(id => id.Name + " ")}`,
            success: true,
            Inventory: ids
          });
        } else {
          count++;
        }
      })
      .catch(err => {
        res.status(200).json({
          success: false,
          message: err.details[0].message
        });
      });
  });
});

module.exports = Router;
