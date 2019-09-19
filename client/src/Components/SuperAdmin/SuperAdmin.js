import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

class SuperAdminHome extends Component {


  render() {
    return (
      <div className="SuperAdminHome">
        SuperAdminHome
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(SuperAdminHome);
