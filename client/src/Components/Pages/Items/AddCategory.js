import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCategoryAction } from "../../../Actions/ItemActions";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class AddCategory extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  componentDidMount() {}
  AddCategoryHandler = e => {
    e.preventDefault();
    let Data = {
      Name: this.refs.Name.value
    };
    this.props.AddCategoryAction(Data);
  };
  render() {
    return (
      <div className="AddCategory">
        {this.props.items.message === "" ? (
          ""
        ) : (
          <div
            className={`alert ${
              this.props.items.Success === true
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {this.props.items.message}
          </div>
        )}
        <form onSubmit={this.AddCategoryHandler}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" ref="Name" className="form-control" />
          </div>
          <input type="submit" className="btn btn-primary" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { AddCategoryAction, UnMountAlertAction }
)(AddCategory);
