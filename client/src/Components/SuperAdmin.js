import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsersAction } from "../Actions/UsersActions";
import SuperAdminHome from "./SuperAdmin/SuperAdmin";
import SuperAdminUsers from "./SuperAdmin/SuperAdminUsers";
import Reports from "./SharedComponents/Reports";
import Categories from "./SharedComponents/Categories";
import Locations from "./SharedComponents/Locations";
import AddInventory from "./SharedComponents/AddInventory";
import Items from "./SharedComponents/Items";
import Item from "./SharedComponents/Item";
import { Route } from "react-router-dom";

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

class SuperAdmin extends Component {
  constructor(params) {
    super(params);
    this.props.FetchAllUsersAction();
  }

  render() {
    return (
      <div className="SuperAdmin">
        <Route path="/SuperAdmin/Home" component={SuperAdminHome} />
        <Route path="/SuperAdmin/Custodians" component={SuperAdminUsers} />
        <Route path="/SuperAdmin/AddInventory" component={AddInventory} />
        <Route path="/SuperAdmin/Inventories" component={Items} />
        <Route path="/SuperAdmin/Inventory/:id" component={Item} />
        <Route path="/SuperAdmin/Locations" component={Locations} />
        <Route path="/SuperAdmin/Categories" component={Categories} />
        <Route path="/SuperAdmin/Reports" component={Reports} />
      </div>
    );
  }
}

export default connect(mapStateToProps, { FetchAllUsersAction })(SuperAdmin);
