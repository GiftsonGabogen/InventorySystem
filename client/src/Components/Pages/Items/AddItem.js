import React, { Component } from "react";
import { connect } from "react-redux";
import { AddItemAction } from "../../../Actions/ItemActions";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";
import PopAlert from "../../Comps/PopAlert"

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class AddItem extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  AddItemHandler = e => {
    e.preventDefault();
    let Data = {
      Name: this.refs.Name.value,
      Category: this.refs.Category.value,
      Unit: this.refs.Unit.value
    };
    this.props.AddItemAction(Data);
    /* Some of my updates actions items list messed when updating because the indexing of the items is being crumbled so what I do is
    redirect the page to a page which redirect it again to the page where it came from */
    this.props.history.push(`/Admin/Reload/-Admin-Items-Add`);
  };

  render() {
    return (
      <div className="AddItem">
        <PopAlert {...this.props.items} />
        <form onSubmit={this.AddItemHandler}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" ref="Name" className="form-control" />
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="SellingPrice">Category</label>
              <select className="custom-select" ref="Category">
                {this.props.items.categories.map((category, i) => (
                  <option value={category._id} key={i}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Unit">Unit</label>
              <input type="text" ref="Unit" className="form-control" />
            </div>
          </div>

          <input type="submit" value="Add" className="btn btn-primary w-25" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { AddItemAction, UnMountAlertAction }
)(AddItem);
