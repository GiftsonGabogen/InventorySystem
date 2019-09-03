import React from "react";
import "bootstrap";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Header/Navbar";
import Heading from "./Components/Header/Heading";
import Items from "./Components/Pages/Items/Items";
import AddItem from "./Components/Pages/Items/AddItem";
import EditItem from "./Components/Pages/Items/EditItem";
import AddStock from "./Components/Pages/Items/AddStock";
import Category from "./Components/Pages/Items/Category";

function App() {
  return (
    <div className="App row">
      <Route path="/Home" component={Heading} />
      <Route path="/Home" component={Navbar} />
      <Route exact path="/" component={Login} />
      <div className="Home col-9">
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Home/Items" component={Items} />
          <Route exact path="/Home/Items/Add" component={AddItem} />
          <Route exact path="/Home/Items/Edit" component={EditItem} />
          <Route exact path="/Home/Items/AddStock" component={AddStock} />
          <Route exact path="/Home/Items/Category" component={Category} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
