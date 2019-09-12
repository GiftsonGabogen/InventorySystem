import React, { Component } from "react";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";
import { DeleteCategoryAction } from "../../../Actions/ItemActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class Category extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  CategoryDeleteHandler = id => {
    this.props.DeleteCategoryAction(id);
  };

  render() {
    return (
      <div className="Category">
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
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.props.items.categories.map((Category, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{Category.Name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.CategoryDeleteHandler(Category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { UnMountAlertAction, DeleteCategoryAction }
)(Category);
