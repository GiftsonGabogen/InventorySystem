import React, { Component } from "react";
import { connect } from "react-redux";
import { LoginAction } from "../Actions/CredentialActions";
import { UnMountAlertAction } from "../Actions/UnMountActions";
import { Redirect } from "react-router-dom";

function mapStateToProps(state) {
  return {
    credential: state.credential
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    this.props.UnMountAlertAction();
  }
  LoginHandler = e => {
    e.preventDefault();
    let Data = {
      Username: this.refs.Username.value,
      Password: this.refs.Password.value
    };
    this.props.LoginAction(Data);
  };
  render() {
    if (this.props.credential.Type === "SuperAdmin" && this.props.credential.Login === true) {
      return <Redirect to="/SuperAdmin/Home" />;
    } else if (this.props.credential.Type === "Custodian" && this.props.credential.Login === true) {
      return <Redirect to="/Faculty/Overview" />;
    } else {
      return (
        <div className="Login">
          <div className="Title h1">WUP Inventory System</div>
          <form onSubmit={this.LoginHandler}>
            {this.props.credential.message === "" ? (
              ""
            ) : (
              <div
                className={`alert ${this.props.credential.Success === true ? "alert-success" : "alert-danger"}`}
                role="alert"
              >
                {this.props.credential.message}
              </div>
            )}
            <div className="Title h2">Login</div>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input type="text" ref="Username" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="password" ref="Password" className="form-control" />
            </div>
            <input type="submit" className="btn btn-success" value="Login" />
          </form>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, { LoginAction, UnMountAlertAction })(Login);
