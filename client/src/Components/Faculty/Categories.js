import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCategoriesAction, DeleteCategoriesAction } from "../../Actions/CategoriesActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

class Categories extends Component {
  AddCategory = e => {
    e.preventDefault();
    let data = {
      Name: this.refs.Name.value
    };
    this.props.AddCategoriesAction(data);
  };
  deleteCategory = id => {
    this.props.DeleteCategoriesAction(id);
  };
  render() {
    return (
      <div className="Categories">
        <PopAlert {...this.props.categories} />
        <form onSubmit={this.AddCategory}>
          <div className="form-row">
            <div className="form-group col">
              <input type="text" className="form-control" ref="Name" placeholder="Category" />
            </div>
            <div className="form-group col">
              <input type="submit" className="form-control w-50" value="Add" />
            </div>
          </div>
        </form>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.Categories.map((cat, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{cat.Name}</td>
                <td>
                  {" "}
                  <button onClick={() => this.deleteCategory(cat._id)} className="btn btn-danger btn-sm">
                    delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, { AddCategoriesAction, DeleteCategoriesAction })(Categories);
