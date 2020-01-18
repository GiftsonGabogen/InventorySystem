import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    users: state.users,
    inventories: state.inventories
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
                  <h2>Custodians</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h2>{this.props.inventories.InventoryLogs.length}</h2>
                  <h2>Reports</h2>
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
