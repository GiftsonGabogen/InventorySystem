import React, { Component } from "react";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class Category extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  render() {
    return (
      <div className="Category">
        <table className="table table-striped">
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
                  <button className="btn btn-danger">Delete</button>
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
  { UnMountAlertAction }
)(Category);
