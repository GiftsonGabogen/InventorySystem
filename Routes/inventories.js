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
  const { Name, Status, From, Borrower, Location, PricePerUnit, Quantity } = req.body;
  const newInventories = new Inventories({
    _id: new mongoose.Types.ObjectId(),
    Status,
    From,
    Borrower,
    Location,
    PricePerUnit,
    Quantity
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
      Inventories.findById(id)
        .exec()
        .then(find => {
          newPrice = Number(Price) + Number(find.Price);
          newQuantity = Number(Quantity) + Number(find.Quantity);
          Inventories.findByIdAndUpdate(
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
                Inventory: result,
                message: `Successfully Added Stock on ${result.Name}`
              });
            });
        });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err.details[0].message });
    });
});

Router.put("/EditInventory", AuthCheck, (req, res) => {
  const { id, Name, Category, SellingPrice, Unit } = req.body;
  Inventories.findByIdAndUpdate(
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

Router.delete("/individual/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Inventories.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.status(201).json({
        message: `Successfully Deleted Inventory ${result.Name}`,
        success: true,
        Inventory: result
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        message: err.details[0].message
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

Router.delete("/Category/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.status(201).json({
        message: `Successfully Deleted Inventory ${result.Name}`,
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
