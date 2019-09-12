import React, { Component, Fragment } from "react";
import Home from "./Home";
import Items from "./Pages/Items/Items";
import AddItem from "./Pages/Items/AddItem";
import EditItem from "./Pages/Items/EditItem";
import AddStock from "./Pages/Items/AddStock";
import Category from "./Pages/Items/Category";
import AddCategory from "./Pages/Items/AddCategory";
import Sales from "./Pages/Items/Sales";
import { Route } from "react-router-dom";

class Admin extends Component {
  render() {
    return (
      <Fragment>
        <Route
          credential={this.props.credential}
          exact
          path={`${this.props.match.url}/Overview`}
          component={Home}
        />
        <Route
          credential={this.props.credential}
          exact
          path={`${this.props.match.url}/Items/All`}
          component={Items}
        />
        <Route
          credential={this.props.credential}
          path={`${this.props.match.url}/Items/Add`}
          component={AddItem}
        />
        <Route
          credential={this.props.credential}
          path={`${this.props.match.url}/Items/Edit`}
          component={EditItem}
        />
        <Route
          credential={this.props.credential}
          path={`${this.props.match.url}/Items/AddStock`}
          component={AddStock}
        />
        <Route
          credential={this.props.credential}
          path={`${this.props.match.url}/Items/Category`}
          component={Category}
        />
        <Route
          credential={this.props.credential}
          path={`${this.props.match.url}/Items/AddCategory`}
          component={AddCategory}
        />
        <Route
          credential={this.props.credential}
          exact
          path={`${this.props.match.url}/Reports/Sales`}
          component={Sales}
        />
      </Fragment>
    );
  }
}

export default Admin;
