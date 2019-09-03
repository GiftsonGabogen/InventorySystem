const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const Items = require("../MongoDBModel/items");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");

//Get All Post
Router.get("/", AuthCheck, (req, res) => {
  Items.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Items: result,
        message: "Successfully Fetched Items"
      });
    })
    .catch(err => {
      res.status(200).json({ sucess: false });
    });
});

//Get Specific Item
Router.get("/:id", (req, res) => {
  const { id } = req.params;
  Items.find({ _id: id })
    .exec()
    .then(result => {
      if (result.length === 0) {
        res.status(200).json({
          success: false,
          message: "Item Not Found"
        });
      } else {
        res.status(200).json({
          success: true,
          Item: result[0],
          message: "Successfully Fetched Item"
        });
      }
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
    });
});

//Add Comment
Router.post("/AddItem", AuthCheck, (req, res) => {
  const { Name, Category, Unit } = req.body;
  const schema = {
    Name: Joi.string()
      .min(3)
      .max(25)
      .required(),
    Category: Joi.string().required(),
    Unit: Joi.string().required()
  };

  Joi.validate(req.body, schema)
    .then(validated => {
      Items.find({ Name: Name })
        .exec()
        .then(item => {
          if (item.length > 0) {
            res.status(200).json({
              message: "Item is Already in the Inventory",
              success: false
            });
          } else {
            const newItems = new Items({
              _id: new mongoose.Types.ObjectId(),
              Name,
              Category,
              Unit,
              Price: 0,
              SellingPrice: 0,
              Quantity: 0
            });

            newItems
              .save()
              .then(result => {
                res.status(201).json({
                  success: true,
                  Item: result,
                  message: "Successfully Added Item"
                });
              })
              .catch(err => {
                res.status(200).json({ success: false, message: err });
              });
          }
        })
        .catch(err => {
          res.status(200).json({ success: false, message: err });
        });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err.details[0].message });
    });
});

Router.put("/AddStock", AuthCheck, (req, res) => {
  const { id, Price, SellingPrice, Quantity } = req.body;
  const schema = {
    Price: Joi.number().required(),
    Quantity: Joi.number().required(),
    Unit: Joi.string().required()
  };

  Joi.validate(req.body,schema).then(validated =>{
    Items.findByIdAndUpdate(
      id,
      {
        $set: {
          Price,
          SellingPrice,
          Quantity
        }
      },
      { new: true }
    )
      .exec()
      .then(result => {
        result.status(200).json({
          success: true,
          Item: result,
          message: "Successfully Added Stock"
        });
      })
      .catch(err => {
        res.status(200).json({
          success: false,
          message: err
        });
      });
  }).catch(err =>{
    res.status(200).json({ success: false, message: err.details[0].message });
  })
  
});

Router.put("/EditItem", AuthCheck, (req, res) => {
  const { id, Name, Category, SellingPrice, Unit } = req.body;
  Items.findByIdAndUpdate(
    id,
    {
      $set: {
        Name,
        Category,
        SellingPrice,
        Unit
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      result.status(200).json({
        success: true,
        Item: result,
        message: "Successfully Edited Item"
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err
      });
    });
});

Router.delete("/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Items.findByIdAndDelete(id, { new: true })
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
        message: err,
        message: "Successfully Deleted Item"
      });
    });
});

module.exports = Router;
