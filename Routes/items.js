const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const Items = require("../MongoDBModel/items");
const Category = require("../MongoDBModel/categories");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");

//Get All Post
Router.get("/", (req, res) => {
  Items.find()
    .populate("Category")
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

Router.get("/Category", (req, res) => {
  Category.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Categories: result,
        message: "Successfully Fetched Categories"
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
    .populate("Category")
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
          message: `Successfully Fetched Item ${result.Name}`
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
              message: `Item ${Name} is Already in the Inventory`,
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

            newItems.save().then(result => {
              res.status(201).json({
                success: true,
                Item: result,
                message: `Successfully Added Item ${result.Name}`
              });
            });
          }
        });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err.details[0].message });
    });
});

Router.post("/AddCategory", AuthCheck, (req, res) => {
  const { Name } = req.body;
  const schema = {
    Name: Joi.string().required()
  };
  Joi.validate(req.body, schema)
    .then(validated => {
      Category.find({ Name: Name }).then(categ => {
        if (categ.length > 0) {
          res.status(200).json({
            message: `There is Already a ${Name} Category`,
            success: false
          });
        } else {
          const newCat = new Category({
            _id: new mongoose.Types.ObjectId(),
            Name
          });

          newCat.save().then(result => {
            res.status(200).json({
              message: `Successfully Added Category ${result.Name}`,
              success: true,
              Category: result
            });
          });
        }
      });
    })
    .catch(err => {
      res.status(200).json({ message: err.details[0].message, success: false });
    });
});

Router.put("/AddStock", AuthCheck, (req, res) => {
  const { id, Price, SellingPrice, Quantity } = req.body;
  const schema = {
    Price: Joi.number().required(),
    Quantity: Joi.number().required(),
    SellingPrice: Joi.number().required(),
    id: Joi.string().required()
  };
  let newPrice = 0;
  let newQuantity = 0;

  Joi.validate(req.body, schema)
    .then(validated => {
      Items.findById(id)
        .exec()
        .then(find => {
          newPrice = Number(Price) + Number(find.Price);
          newQuantity = Number(Quantity) + Number(find.Quantity);
          Items.findByIdAndUpdate(
            id,
            {
              $set: {
                Price: newPrice,
                SellingPrice: SellingPrice,
                Quantity: newQuantity
              }
            },
            { new: true }
          )
            .exec()
            .then(result => {
              res.status(200).json({
                success: true,
                Item: result,
                message: `Successfully Added Stock on ${result.Name}`
              });
            });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({ success: false, message: err.details[0].message });
    });
});

Router.put("/EditItem", AuthCheck, (req, res) => {
  const { id, Name, Category, SellingPrice, Unit } = req.body;
  console.log(SellingPrice);
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
      console.log(result);
      res.status(200).json({
        success: true,
        Item: result,
        message: `Successfully Edited Item ${result.Name}`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err
      });
    });
});

Router.delete("/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Items.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.status(201).json({
        message: `Successfully Deleted Item ${result.Name}`,
        success: true,
        Item: result
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err.details[0].message
      });
    });
});

Router.delete("/Category/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.status(201).json({
        message: `Successfully Deleted Item ${result.Name}`,
        success: true,
        Category: result
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err.details[0].message
      });
    });
});

module.exports = Router;
