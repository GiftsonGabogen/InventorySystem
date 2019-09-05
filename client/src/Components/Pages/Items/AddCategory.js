import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCategoryAction } from "../../../Actions/ItemActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class AddCategory extends Component {
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
  { AddCategoryAction }
)(AddCategory);
