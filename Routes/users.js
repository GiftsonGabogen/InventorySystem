const Joi = require("joi");
const express = require("express");
const Router = express.Router();
const User = require("../MongoDBModel/users");
const mongoose = require("mongoose");
const multer = require("multer");
const JWT = require("jsonwebtoken");
const JWTSecretKey = require("../config/keys").JWTSecretKey;
const AuthCheck = require("../middleware/authCheck");
const bcrypt = require("bcryptjs");

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
  destination: "./userImageUpload",
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

//Get All Users
Router.get("/", (req, res) => {
  User.find()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Get Users Successfully",
        Users: result,
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//Get User By Id
Router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .exec()
    .then(result => {
      if (result == null) {
        res.status(404).json({
          message: "User Not Found"
        });
      } else {
        res.status(200).json({
          message: "Get User Successfully",
          user: result
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

Router.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  const schema = {
    Username: Joi.string().required(),
    Password: Joi.string().required()
  };

  Joi.validate(req.body, schema)
    .then(validate => {
      User.find({ Username: Username })
        .exec()
        .then(result => {
          //if No Account Found Using The Given Email Respond Fail Login

          if (result.length === 0) {
            res.status(200).json({ message: "Username Does'nt Exist", success: false });
            //if The Given Password Don't Match on The Given Email Respond Fail
          } else {
            if (bcrypt.compareSync(Password, result[0].Password) === true) {
              //Adding Token
              const token = JWT.sign(
                {
                  Username: result[0].Username
                },
                JWTSecretKey,
                {
                  expiresIn: "12h"
                }
              );
              //if Email and Password is Correct Respond Successful
              res.status(200).json({
                message: "Login Successfully",
                User: result[0],
                Password: Password,
                success: true,
                token: token
              });
            } else {
              res.status(200).json({ message: "Invalid Password", success: false });
            }
          }
        })
        .catch(err => {
          res.status(200).json({
            message: err,
            success: false
          });
        });
    })
    .catch(err => {
      res.status(200).json({
        message: err.details[0].message,
        success: false
      });
    });
});

//Add User
Router.post("/register", AuthCheck, upload.single("ProfilePicture"), (req, res) => {
  const { Name, Type, Username, Password, ConfirmationPassword } = req.body;
  //If Given Password and Given Confirmation Password Don't Match Respond Fail
  if (req.file === undefined) {
    res.status(200).json({ success: false, message: "Please Include a Profile Pic" });
  } else if (Password !== ConfirmationPassword) {
    res.status(200).json({ success: false, message: "Password Don't Match" });
    //If Password is Less Than or Equal To Five Characters Respond Fail
  } else if (Password.length <= 5) {
    res.status(200).json({ success: false, message: "Password is Too Short" });
  } else {
    User.find({ Name: Name })
      .exec()
      .then(result => {
        //If The Given Name is Already Registered on The Database Respond Fail
        if (result.length > 0) {
          res.status(200).json({
            success: false,
            message: "Your Name is Already Registered"
          });
        } else {
          User.find({ Username: Username })
            .exec()
            .then(result => {
              //If The Given Username is Already Registered on The Database Respond Fail
              if (result.length > 0) {
                res.status(200).json({
                  success: false,
                  message: "Username is Already Registered"
                });
              } else {
                bcrypt.hash(Password, 10, (err, hash) => {
                  if (err) {
                    res.status(200).json({ message: "Error Password Hashing" });
                  } else {
                    const newUser = new User({
                      _id: new mongoose.Types.ObjectId(),
                      Username,
                      Name,
                      Type: "Custodian",
                      Password: hash,
                      UserImage: req.file.path
                    });

                    newUser.save().then(result => {
                      res.status(201).json({
                        message: "Created User Successfully",
                        success: true,
                        user: result
                      });
                    });
                  }
                });
              }
            });
        }
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  }
});

//Update User
Router.post("/update", AuthCheck, (req, res) => {
  const { OldPassword, ConfirmNewPassword, NewPassword, Username } = req.body;

  User.find({ Username: Username })
    .exec()
    .then(user => {
      if (bcrypt.compareSync(OldPassword, user[0].Password) === true) {
        if (ConfirmNewPassword !== NewPassword) {
          res.status(200).json({ message: "The Given New Password Don't Match", success: false });
        } else {
          bcrypt.hash(NewPassword, 10, (err, newPass) => {
            User.findByIdAndUpdate(user[0]._id, { $set: { Password: newPass } })
              .exec()
              .then(successUpdate => {
                res.status(200).json({ message: "Your Password is Updated", success: true });
              });
          });
        }
      } else {
        res.status(200).json({ message: "Your Old Password is Invalid", success: false });
      }
    });
});

//Deleting User
Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove({ _id: id })
    .exec()
    .then(result => {
      res.status(201).json({
        message: `Deleted User ${result.Name} Successfully`,
        User: result,
        success: true
      });
    })
    .catch(err => {
      res.status(200).json({
        message: err.details[0].message,
        success: false
      });
    });
});

Router.post("/AuthCheck", AuthCheck, (req, res) => {
  res.status(200).json({ success: true, User: req.userData });
});

module.exports = Router;
