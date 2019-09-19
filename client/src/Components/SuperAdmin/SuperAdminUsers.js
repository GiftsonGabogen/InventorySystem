import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RegisterUserAction } from "../../Actions/UsersActions"

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

class SuperAdminUsers extends Component {
    RegisterHandler = (e) => {
        e.preventDefault()
        const { Name, Username, Type, Password, ConfirmPassword, ProfilePicture } = this.refs
        let Data = {
            Name: Name.value,
            Username: Username.value,
            Type: Type.value,
            Password: Password.value,
            ConfirmPassword: ConfirmPassword.value,
            ProfilePicture: ProfilePicture.files[0],
        }
        this.props.RegisterUserAction(Data)
    }

    render() {
        return (
            <div className="RegisterUserAction">

                <div className="modal-dialog" role="document">
                    {/* if there is an Existing Message on The Global State for Items Pop an Alert With The Message */}
                    {this.props.users.message === "" ? (
                        ""
                    ) : (
                            <div
                                className={`alert ${
                                    this.props.users.Success === true
                                        ? "alert-success"
                                        : "alert-danger"
                                    }`}
                                role="alert"
                            >
                                {this.props.users.message}
                            </div>
                        )}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Add User
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.CloseHandler}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body">
                                <form onSubmit={this.RegisterHandler}>
                                    <div className="form-group">
                                        <label htmlFor="Name">Name</label>
                                        <input type="text" ref="Name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Username">Username</label>
                                        <input type="text" ref="Username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Type">Type</label>
                                        <input type="text" ref="Type" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ProfilePicture">Profile Picture</label>
                                        <input type="file" ref="ProfilePicture" className="form-control" />
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
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.Users.map((user, i) => (
                            <tr className="User" key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{user.Name}</td>
                                <td>{user.Username}</td>
                                <td>{user.Type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, { RegisterUserAction }
)(SuperAdminUsers);