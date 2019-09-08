const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const itemsRouter = require("./Routes/items");
const usersRouter = require("./Routes/users");
const salesRouter = require("./Routes/sales");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys").mongoURI;
const app = express();

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

console.log(process.env.NODE_ENV);

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//makes userImageUpload Folder Accesible Even on Client Side
app.use("/userImageUpload", express.static("userImageUpload"));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sales", salesRouter);

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
