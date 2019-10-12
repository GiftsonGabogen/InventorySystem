import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsersAction } from "../Actions/UsersActions";
import SuperAdminHome from "./SuperAdmin/SuperAdmin";
import SuperAdminUsers from "./SuperAdmin/SuperAdminUsers";
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
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.users);
  }

  render() {
    return (
      <div className="SuperAdmin">
        <Route path="/SuperAdmin/Home" component={SuperAdminHome} />
        <Route path="/SuperAdmin/Users" component={SuperAdminUsers} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { FetchAllUsersAction }
)(SuperAdmin);
