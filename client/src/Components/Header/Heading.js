import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutAction } from "../../Actions/CredentialActions";
import { UpdateUserAction } from "../../Actions/UsersActions";
import userIcon from "../Images/016-user.svg";
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
    document.querySelector(".accountPopover").style.display = "none";
  };
  closeEditModal = () => {
    document.querySelector(".editModalContainer").style.display = "none";
  };

  openAccountPopover = () => {
    document.querySelector(".accountPopover").style.display === "inline-block"
      ? (document.querySelector(".accountPopover").style.display = "none")
      : (document.querySelector(".accountPopover").style.display = "inline-block");
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
        <div className="col-6 d-flex justify-content-end accountIconContainer">
          <img src={userIcon} alt="account" ref="account" onClick={this.openAccountPopover} />
          <div className="accountPopover">
            <ul>
              <li onClick={this.openEditModal}>Edit Account</li>
              <li onClick={this.LogoutHandler}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { LogoutAction, UpdateUserAction })(Heading);
