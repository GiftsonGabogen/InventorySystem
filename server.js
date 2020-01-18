const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const usersRouter = require("./Routes/users");
const inventoriesRouter = require("./Routes/inventories");
const categoriesRouter = require("./Routes/categories");
const locationsRouter = require("./Routes/locations");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys").mongoURI;
const app = express();

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//makes userImageUpload Folder Accesible Even on Client Side
app.use("/userImageUpload", express.static("userImageUpload"));
app.use("/client/src/inventoryImageUpload", express.static("client/src/inventoryImageUpload"));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/users", usersRouter);
app.use("/api/inventories", inventoriesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/locations", locationsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//Catching Error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
