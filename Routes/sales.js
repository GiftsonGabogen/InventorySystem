const express = require("express");
const Router = express.Router();
const Sales = require("../MongoDBModel/sales");
const Items = require("../MongoDBModel/items");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");
const moment = require("moment");
const Joi = require("joi");

//Get All Post
Router.get("/", (req, res) => {
  Sales.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Sales: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        sucess: false,
        message: err.details[0].message
      });
    });
});

//Get Specific Sale
Router.get("/:id", (req, res) => {
  const { id } = req.params;
  Sales.find({
    _id: id
  })
    .populate("ItemID")
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
      res.status(200).json({
        sucess: false,
        message: err
      });
    });
});

Router.get("/bymonth/:month", (req, res) => {
  const { month } = req.params;
  console.log(month);
  Sales.find()
    .populate("ItemID", "Price SellingPrice Quantity")
    .exec()
    .then(result => {
      let sales = result.filter(
        sale => moment(sale.Date).format("MMM YYYY") === month
      );
      let newSales = [];
      for (x of sales) {
        let found = false;
        for (y of newSales) {
          if (y.ItemName === x.ItemName) {
            y.Quantity = x.Quantity + y.Quantity;
            found = true;
          }
        }
        if (found === false) {
          newSales = [...newSales, x];
        }
      }
      res.status(200).json({
        message: "Fetch Successfully",
        success: true,
        Sales: newSales
      });
    })
    .catch(err => {
      res.status(200).json({
        sucess: false,
        message: err
      });
    });
});

Router.get("/byday/:day", (req, res) => {
  const { day } = req.params;

  Sales.find()
    .populate("ItemID", "Price SellingPrice Quantity")
    .exec()
    .then(result => {
      let sales = result.filter(
        sale => moment(sale.Date).format("MMM YYYY D") === day
      );
      let newSales = [];
      for (x of sales) {
        let found = false;
        for (y of newSales) {
          if (y.ItemName === x.ItemName) {
            y.Quantity = x.Quantity + y.Quantity;
            found = true;
          }
        }
        if (found === false) {
          newSales = [...newSales, x];
        }
      }
      res.status(200).json({
        message: "Fetch Successfully",
        success: true,
        Sales: newSales
      });
    })
    .catch(err => {
      res.status(200).json({
        sucess: false,
        message: err
      });
    });
});

Router.post("/", AuthCheck, (req, res) => {
  const { ItemName, ItemID, Quantity, Seller, PricePerUnit } = req.body;

  let Category;
  Items.find({
    _id: ItemID
  })
    .populate("Category")
    .exec()
    .then(result => {
      // reduce the Sold Item
      Items.findOneAndUpdate(
        {
          _id: ItemID
        },
        {
          $set: {
            Quantity: Number(result[0].Quantity) - Number(Quantity),
            Price:
              Number(result[0].Price) -
              Number(Quantity) *
                (Number(result[0].Price) / Number(result[0].Quantity))
          }
        }
      ).exec();

      Category = result[0].Category.Name;
      const newSales = new Sales({
        _id: new mongoose.Types.ObjectId(),
        ItemName,
        ItemID,
        Quantity,
        Seller,
        PricePerUnit,
        Category
      });
      Sales.find({
        ItemID: ItemID
      })
        .exec()
        .then(saleRes => {
          if (saleRes.length > 0) {
            // if no sales is found on a specific id create a new sale
            let fetchDate = moment(saleRes[0].Date)
              .format("MMM/Do/YYYY")
              .toString();
            let updateDate = moment(Date.now())
              .format("MMM/Do/YYYY")
              .toString();
            console.log(fetchDate + " " + updateDate);
            // if it is the same day and the same seller who did the sales it will only update the exsiting sale with only the quantity
            // else create new sale on this day or create new sale with the new seller
            if (fetchDate === updateDate && saleRes[0].Seller === Seller) {
              Sales.findOneAndUpdate(
                {
                  _id: saleRes[0]._id
                },
                {
                  $set: {
                    Quantity: Number(saleRes[0].Quantity) + Number(Quantity)
                  }
                },
                {
                  new: true
                }
              )
                .exec()
                .then(update => {
                  res.status(201).json({
                    success: true,
                    Sale: update,
                    message: `Sold Successfully ${Quantity} of ${ItemName}`
                  });
                });
            } else {
              newSales.save().then(result => {
                res.status(201).json({
                  success: true,
                  Sale: result,
                  message: `Sold Successfully ${Quantity} of ${ItemName}`
                });
              });
            }
          } else {
            newSales.save().then(result => {
              res.status(201).json({
                success: true,
                Sale: result,
                message: `Sold Successfully ${Quantity} of ${ItemName}`
              });
            });
          }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err.details[0].message
      });
    });
});

Router.delete("/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Sales.findOneAndDelete({
    _id: id
  })
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
