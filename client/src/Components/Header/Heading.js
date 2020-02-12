import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutAction } from "../../Actions/CredentialActions";
import { UpdateUserAction } from "../../Actions/UsersActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    credential: state.credential,
    users: state.users
  };
}

class Heading extends Component {
  /* componentDidUpdate(prevProps, prevState) {
    if (prevProps.users.Success === false && this.props.users.Success === true) {
      document.querySelector(".editModalContainer").style.display = "none";
    }
  } */

  LogoutHandler = () => {
    this.props.LogoutAction();
  };
  editAccount = e => {
    e.preventDefault();
    const { OldPassword, NewPassword, ConfirmNewPassword } = this.refs;
    let Data = {
      OldPassword: OldPassword.value,
      NewPassword: NewPassword.value,
      ConfirmNewPassword: ConfirmNewPassword.value,
      Username: this.props.credential.Username
    };
    this.props.UpdateUserAction(Data);
  };
  openEditModal = () => {
    document.querySelector(".editModalContainer").style.display = "grid";
  };
  closeEditModal = () => {
    document.querySelector(".editModalContainer").style.display = "none";
  };
  render() {
    return (
      <div className="Heading col-12 row bg-dark">
        <div className="editModalContainer">
          <PopAlert {...this.props.users} />
          <div className="editModal">
            <div className="editClosingModal" onClick={this.closeEditModal}>
              x
            </div>
            <form onSubmit={this.editAccount}>
              <div className="form-group">
                <label htmlFor="OldPassword">Old Password</label>
                <input type="password" ref="OldPassword" className="form-control" placeholder="Old Password" />
              </div>
              <div className="form-group">
                <label htmlFor="NewPassword">New Password</label>
                <input type="password" ref="NewPassword" className="form-control" placeholder="New Password" />
              </div>
              <div className="form-group">
                <label htmlFor="ConfirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  ref="ConfirmNewPassword"
                  className="form-control"
                  placeholder="Confirm New Password"
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Edit" />
            </form>
          </div>
        </div>
        <div className="col-6 justify-content-start">
          <h4>WUP Inventory System</h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={this.openEditModal}>
            Edit Account
          </button>
          <button className="btn btn-primary" onClick={this.LogoutHandler}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { LogoutAction, UpdateUserAction })(Heading);
