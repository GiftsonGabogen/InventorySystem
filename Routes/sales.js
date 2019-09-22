const express = require("express");
const Router = express.Router();
const Sales = require("../MongoDBModel/sales");
const Items = require("../MongoDBModel/items");
const mongoose = require("mongoose");
const AuthCheck = require("../middleware/authCheck");
const moment = require("moment")
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
  const {
    id
  } = req.params;
  Sales.find({
    _id: id
  })
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
      res.status(200).json({
        sucess: false,
        message: err
      });
    });
});

Router.get("/bymonth/:month", (req, res) => {
  const { month } = req.params
  Sales.find()
    .exec()
    .then(result => {
      let sales = result.filter(sale => moment(sale.Date).format("MMM") === month)

      // Scanning all the Sales Array and Adding The Same Item
      const ScanningandMerging = (ItemsToScan) => {
        //the Array That we will Respond to the client when the filtering is done
        const filteredSales = []
        function recursiveScanning(array_to_be_scan) {
          // if the array has no equal name and it is the only one left on an array
          // push it to the filteredSales array
          if (array_to_be_scan.length === 1) {
            filteredSales.push(array_to_be_scan[0])
            recursiveScanning([])
            // if there is no already items on the array finish the scanning and respond to the client
            // with the filteredSales
          } else if (array_to_be_scan.length === 0) {
            res.status(200).json({
              success: true,
              Sales: filteredSales
            });
          } else {
            let Items = []
            let newArray = array_to_be_scan.filter(array => 1 === 1)
            let j = 1;
            for (let i = 0; i < array_to_be_scan.length - 1; i++) {
              let temp1 = array_to_be_scan[0].ItemName;
              let temp2 = array_to_be_scan[i + 1].ItemName
              // if the first and i+1 index has the same name push the Quantity data to a temp array
              // remove it to the original array so that on the next recursiveScanning the scanned item will not be scanned again
              if (temp1 === temp2) {
                Items.push(array_to_be_scan[i + 1].Quantity)
                newArray.splice(i + j, 1)
                // we are reducing the arrays length so we need to reduce also the index that we splice
                j--
              }
              // if it is the last item to be compared of from the first index
              // add all the quantities
              // remove the first index because it was finish scanning
              // then the remaining items on the array will be scanned again on the recursive Scanning
              if (i >= array_to_be_scan.length - 2) {
                var Quantity = newArray[0].Quantity;
                for (let x = 0; x < Items.length; x++) {
                  Quantity = Number(Quantity) + Number(Items[x])
                }
                newArray[0].Quantity = Quantity
                filteredSales.push(newArray[0])
                newArray.splice(0, 1)
                recursiveScanning(newArray)
              }
            }
          }

        }
        recursiveScanning(ItemsToScan)
      }
      ScanningandMerging(sales)
    })
    .catch(err => {
      res.status(200).json({
        sucess: false,
        message: err
      });
    });
});

Router.post("/", AuthCheck, (req, res) => {
  const {
    ItemName,
    ItemID,
    Quantity,
    Seller,
    PricePerUnit
  } = req.body;

  let Category;
  Items.find({
    _id: ItemID
  })
    .populate("Category")
    .exec()
    .then(result => {
      // reduce the Sold Item
      Items.findOneAndUpdate({
        _id: ItemID
      }, {
          $set: {
            Quantity: Number(result[0].Quantity) - Number(Quantity),

          }
        })
        .exec()

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
            let fetchDate = moment(saleRes[0].Date).format("MMM/Do/YYYY").toString()
            let updateDate = moment(Date.now()).format("MMM/Do/YYYY").toString()
            console.log(fetchDate + " " + updateDate);
            // if it is the same day and the same seller who did the sales it will only update the exsiting sale with only the quantity
            // else create new sale on this day or create new sale with the new seller
            if (fetchDate === updateDate && saleRes[0].Seller === Seller) {
              Sales.findOneAndUpdate({
                _id: saleRes[0]._id
              }, {
                  $set: {
                    Quantity: Number(saleRes[0].Quantity) + Number(Quantity),
                  }
                }, {
                  new: true
                })
                .exec()
                .then(update => {
                  res.status(201).json({
                    success: true,
                    Sale: update,
                    message: `Sold Successfully ${Quantity} of ${ItemName}`
                  });
                })
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
        })
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
  const {
    id
  } = req.params;
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