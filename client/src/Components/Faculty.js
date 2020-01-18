import React, { Component, Fragment } from "react";
import Overview from "./Faculty/Overview";
import Items from "./Faculty/Items";
import Item from "./Faculty/Item";
import Categories from "./SharedComponents/Categories";
import Locations from "./SharedComponents/Locations";
import AddInventory from "./SharedComponents/AddInventory";
import Reports from "./SharedComponents/Reports";
import { Route } from "react-router-dom";

export default class Faculty extends Component {
  render() {
    return (
      <Fragment>
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Overview`} component={Overview} />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Inventories`} component={Items} />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Inventory/:id`} component={Item} />
        <Route
          credential={this.props.credential}
          exact
          path={`${this.props.match.url}/AddInventory`}
          component={AddInventory}
        />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Categories`} component={Categories} />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Locations`} component={Locations} />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Reports`} component={Reports} />
      </Fragment>
    );
  }
}
