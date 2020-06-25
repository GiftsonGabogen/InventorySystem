const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const Inventories = require("../MongoDBModel/inventories");
const Inventorylog = require("../MongoDBModel/inventorylog");
const Notes = require("../MongoDBModel/notes");
const Modify = require("../MongoDBModel/modify");
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
Router.get("/notes", (req, res) => {
  Notes.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Notes: result,
        message: "Successfully Fetched notes"
      });
    })
    .catch(err => {
      res.status(200).json({ success: false });
    });
});

Router.post("/deletenotes/:id", AuthCheck, (req, res) => {
  const { id } = req.params;
  Notes.findOneAndRemove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        Note: result,
        message: `Successfully Deleted Note`
      });
    })
    .catch(err => {
      res.status(200).json({ success: false, message: err });
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

Router.get("/modifies", (req, res) => {
  Modify.find()
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        modify: result,
        message: "Successfully Fetched Modifies"
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
Router.post("/AddInventory", AuthCheck, upload.array("InventoryImage", 12), (req, res) => {
  const { Name, From, Location, PricePerUnit, Quantity, Category } = req.body;
  Inventories.find({ Name: Name, PricePerUnit: PricePerUnit })
    .exec()
    .then(findingResult => {
      if (findingResult.length === 0) {
        let Images = [];
        req.files.map(file => Images.push(file.path));
        const newInventories = new Inventories({
          _id: new mongoose.Types.ObjectId(),
          Name,
          From,
          Location,
          PricePerUnit,
          Quantity,
          Category,
          Image: Images
        });
        newInventories.save().then(result => {
          res.status(200).json({
            success: true,
            Inventory: result,
            method: "add",
            message: `Successfully Added ${Quantity} ${Name} from ${From}`
          });
        });
      } else {
        Inventories.findOneAndUpdate(
          { Name: Name, PricePerUnit: PricePerUnit },
          { $set: { Quantity: parseInt(Quantity) + parseInt(findingResult[0].Quantity) } },
          { new: true }
        )
          .exec()
          .then(updatingResult => {
            res.status(200).json({
              success: true,
              Inventory: updatingResult,
              method: "update",
              message: `Successfully Added ${Quantity} ${Name} from ${From}`
            });
          });
      }
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
    Date: Date.now(),
    Custodian: Custodian,
    Quantity: Quantity,
    BorrowingCustodian: BorrowingCustodian
  });

  newInventories.save().then(reportResult => {
    Inventories.findById(ItemID)
      .exec()
      .then(result => {
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
              Report: reportResult,
              message: `Successfully Returned ${Quantity} of ${ItemName} by ${Returnee}`
            });
          });
      });
  });
});

Router.post("/addDeleteNote", AuthCheck, (req, res) => {
  const { id, Description, Custodian } = req.body;

  let newNotes = new Notes({
    _id: new mongoose.Types.ObjectId(),
    ItemID: id,
    Description: Description,
    Custodian: Custodian,
    Date: Date.now()
  });

  newNotes.save().then(addNote => {
    res.status(200).json({
      success: true,
      Note: addNote,
      message: `Successfully requested a deletion to the admin`
    });
  });
});

Router.post("/AddImage", AuthCheck, upload.array("AddImage", 12), (req, res) => {
  const { id } = req.body;
  Inventories.findById(id)
    .exec()
    .then(findRes => {
      let Images = [];
      req.files.map(file => Images.push(file.path));
      newImages = [...findRes.Image, ...Images];
      Inventories.findByIdAndUpdate(
        id,
        {
          $set: {
            Image: newImages
          }
        },
        { new: true }
      )
        .exec()
        .then(updateRes => {
          res.status(200).json({
            success: true,
            Inventory: updateRes,
            message: `Successfully Added an Image`
          });
        });
    });
});

Router.post("/DeleteImage", AuthCheck, (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  Inventories.findById(id)
    .exec()
    .then(findRes => {
      let EmptyImages = [];
      let newImages = findRes.Image.slice();
      for (let i = 0; i < req.body.DeleteImages.length; i++) {
        for (let j = 0; j < newImages.length; j++) {
          if (req.body.DeleteImages[i] !== newImages[j]) {
            EmptyImages.push(newImages[j]);
          }
        }
        newImages = EmptyImages.slice();
        EmptyImages = [];
      }
      console.log(newImages);
      Inventories.findByIdAndUpdate(
        id,
        {
          $set: {
            Image: newImages
          }
        },
        { new: true }
      )
        .exec()
        .then(updateRes => {
          res.status(200).json({
            success: true,
            Inventory: updateRes,
            message: `Successfully Deleted an Image`
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
                date: Date.now(),
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

Router.post("/deleteInventory/:id", AuthCheck, (req, res) => {
  let id = req.params.id;
  let { Description, Custodian } = req.body;
  Inventories.findByIdAndDelete(id)
    .exec()
    .then(removed => {
      let newModify = Modify({
        _id: new mongoose.Types.ObjectId(),
        Custodian: Custodian,
        InventoryInfo: removed,
        Description: Description
      });
      newModify.save().then(modify => {
        res.status(200).json({
          success: true,
          Inventory: removed,
          modify: modify,
          message: `Successfully Deleted Inventory ${removed.Name}`
        });
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
