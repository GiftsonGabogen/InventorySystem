import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutAction } from "../../Actions/CredentialActions";

function mapStateToProps(state) {
  return {};
}

class Heading extends Component {
  LogoutHandler = () => {
    this.props.LogoutAction();
  };
  render() {
    return (
      <div className="Heading col-12 row bg-dark">
        <div className="col-6 justify-content-start">
          <h4>WUP Inventory System</h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={this.LogoutHandler}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { LogoutAction }
)(Heading);
