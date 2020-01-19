import React, { Component } from "react";
import { connect } from "react-redux";
import { RegisterUserAction, DeleteUsersAction } from "../../Actions/UsersActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

class SuperAdminUsers extends Component {
  constructor(params) {
    super(params);
    // when reloading, the modal-backdrop div is not being removed because it is in the most root so if the app div reloads
    // the modal-backdrop which is sitting outside the app div don't remove so that we need to remove it manually
  }
  componentDidMount() {
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
  }
  RegisterHandler = e => {
    e.preventDefault();
    const { Name, Username, Type, Password, ConfirmPassword, ProfilePicture } = this.refs;
    let Data = {
      Name: Name.value,
      Username: Username.value,
      Password: Password.value,
      ConfirmPassword: ConfirmPassword.value,
      ProfilePicture: ProfilePicture.files[0]
    };
    document.querySelector(".createdModal").style.display = "none";
    this.props.RegisterUserAction(Data);

    this.props.history.push(`/Reload/-SuperAdmin-Custodians`);
  };
  openAddModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeAddModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  DeleteHandler = id => {
    this.props.DeleteUsersAction(id);
  };

  render() {
    return (
      <div className="RegisterUserAction">
        <PopAlert {...this.props.users} />
        <div className="createdModal">
          <div className="Modal">
            <div className="closingModal" onClick={this.closeAddModal}>
              x
            </div>
            <form onSubmit={this.RegisterHandler}>
              <h2 id="createdModalTitle"></h2>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" ref="Name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input type="text" ref="Username" className="form-control" />
              </div>
              <div className="custom-file">
                <input type="file" ref="ProfilePicture" className="form-control custom-file-input" />
                <label className="custom-file-label" htmlFor="ProfilePicture">
                  Choose profile
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input type="password" ref="Password" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input type="password" ref="ConfirmPassword" className="form-control" />
              </div>
              <input type="submit" value="Register" className="form-control btn btn-primary" />
            </form>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.Users.map((user, i) => (
              <tr className="User" key={i}>
                <th scope="row">{i + 1}</th>
                <td>{user.Name}</td>
                <td>{user.Username}</td>
                <td>
                  <button onClick={() => this.DeleteHandler(user._id)} className="btn btn-sm btn-primary">
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-primary col-3" onClick={this.openAddModal}>
          Add Custodians
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, { RegisterUserAction, DeleteUsersAction })(SuperAdminUsers);
