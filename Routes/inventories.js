const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const Inventories = require("../MongoDBModel/inventories");
const Inventorylog = require("../MongoDBModel/inventorylog");
const mongoose = require("mongoose");
const moment = require("moment");
const AuthCheck = require("../middleware/authCheck");
const multer = require("multer");

const hashDate = new Date().toISOString();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: "./client/src/inventoryImageUpload",
  filename: (req, file, cb) => {
    cb(null, hashDate.slice(0, 10) + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  //only Accepts File Size of Not More Than 20 Megabytes
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  //Filtering The Types of The Uploaded File
  fileFilter: fileFilter
});
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
      res.status(200).json({ success: false });
    });
});

Router.get("/inventorylog", (req, res) => {
  Inventorylog.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        InventoryLogs: result,
        message: "Successfully Fetched Inventories"
      });
    })
    .catch(err => {
      res.status(200).json({ success: false });
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
Router.post("/AddInventory", AuthCheck, upload.single("InventoryImage"), (req, res) => {
  const { Name, From, Location, PricePerUnit, Quantity, Category } = req.body;
  const newInventories = new Inventories({
    _id: new mongoose.Types.ObjectId(),
    Name,
    From,
    Location,
    PricePerUnit,
    Quantity,
    Category,
    Image: req.file.path
  });
  newInventories.save().then(result => {
    res.status(200).json({
      success: true,
      Inventory: result,
      message: `Successfully Added ${Quantity} ${Name} for ${Location} from ${From}`
    });
  });
});

Router.post("/inventorylog/AddInventoryLog", AuthCheck, (req, res) => {
  const { ItemName, ItemID, Returnee, Borrower, Borrowed, Quantity, Custodian, BorrowID, BorrowingCustodian } = req.body;
  const newInventories = new Inventorylog({
    _id: new mongoose.Types.ObjectId(),
    ItemName: ItemName,
    ItemID: ItemID,
    Returnee: Returnee,
    Borrower: Borrower,
    Borrowed: Borrowed,
    Custodian: Custodian,
    Quantity: Quantity,
    BorrowingCustodian: BorrowingCustodian
  });

  newInventories.save().then(newResult => {
    Inventories.findById(ItemID)
      .exec()
      .then(result => {
        console.log(result.Status[0]._id == BorrowID);
        let selectedStatus = result.Status.filter(stat => stat._id == BorrowID)[0];
        let filteredStatus = result.Status.filter(stat => stat._id != BorrowID);
        let newStatus = [];
        if (parseInt(selectedStatus.quantity) <= Quantity) {
          newStatus = [...filteredStatus];
        } else {
          const { quantity, ...restOfTheStatus } = selectedStatus;
          let newDataOfStatus = { ...restOfTheStatus, quantity: selectedStatus.quantity - Quantity };
          newStatus = [...filteredStatus, newDataOfStatus];
        }
        Inventories.findByIdAndUpdate(
          ItemID,
          {
            $set: {
              Status: newStatus
            }
          },
          { new: true }
        )
          .exec()
          .then(newInventory => {
            res.status(200).json({
              success: true,
              Inventory: newInventory,
              message: `Successfully Returned ${Quantity} of ${ItemName} by ${Returnee}`
            });
          });
      });
  });
});

Router.put("/BorrowInventory", AuthCheck, (req, res) => {
  const { id, Borrower, Quantity, Custodian } = req.body;
  let formerStatus = [];
  Inventories.findById(id)
    .exec()
    .then(findRes => {
      formerStatus = [...findRes.Status];
      Inventories.findByIdAndUpdate(
        id,
        {
          $set: {
            Borrower: Borrower,
            Status: [
              ...formerStatus,
              {
                _id: new mongoose.Types.ObjectId(),
                date: moment(Date.now()).format("MMM D YYYY hh A"),
                borrower: Borrower,
                quantity: Quantity,
                custodian: Custodian
              }
            ]
          }
        },
        { new: true }
      )
        .exec()
        .then(result => {
          res.status(200).json({
            success: true,
            Inventory: result,
            message: `Successfully Borrowed Inventory ${result.Name}`
          });
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
