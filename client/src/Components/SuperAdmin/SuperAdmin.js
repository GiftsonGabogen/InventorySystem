import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingBag from "../Images/shopping-bag.png";

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

class SuperAdminHome extends Component {
  render() {
    return (
      <div className="SuperAdminHome">
        <div className="card">
          <div className="card-header">SuperAdmin Overview</div>
          <div className="card-body">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <h2>{this.props.users.Users.length}</h2>
                  <h2>Users</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SuperAdminHome);
