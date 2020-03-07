import React, { Component } from "react";
import { connect } from "react-redux";
import { AddInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    categories: state.categories,
    locations: state.locations
  };
}

class AddInventory extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  AddInventoriesHandler = e => {
    e.preventDefault();
    console.log(this.refs.InventoryImage.files);
    let Data = {
      Name: this.refs.Name.value,
      From: this.refs.From.value,
      PricePerUnit: this.refs.PricePerUnit.value,
      Quantity: this.refs.Quantity.value,
      Location: this.refs.Location.value,
      Category: this.refs.Category.value,
      InventoryImage: this.refs.InventoryImage.files
    };
    this.props.AddInventoriesAction(Data);
    if (this.props.credential.Type === "SuperAdmin") {
      this.props.history.push(`/Reload/-SuperAdmin-Inventories`);
    } else {
      this.props.history.push(`/Reload/-Faculty-Inventories`);
    }
  };

  render() {
    return (
      <div className="AddItem">
        <PopAlert {...this.props.inventories} />
        <form onSubmit={this.AddInventoriesHandler}>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="Name">Name</label>
              <input type="text" ref="Name" className="form-control" required />
            </div>
            <div className="form-group col">
              <label htmlFor="From">Acquisition Source</label>
              <input type="text" ref="From" className="form-control" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="PricePerUnit">Acquisition Cost</label>
              <input type="number" min="0" defaultValue="1" ref="PricePerUnit" className="form-control" required />
            </div>
            <div className="form-group col">
              <label htmlFor="Quantity">Quantity</label>
              <input type="number" min="0" defaultValue="1" ref="Quantity" className="form-control" required />
            </div>
            <div className="form-group col">
              <label htmlFor="Image">Image</label>
              <input type="file" ref="InventoryImage" className="form-control-file" required multiple />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="Location">Stock Location</label>
              <select className="custom-select" id="Location" ref="Location" required>
                {this.props.locations.Locations.map((loc, i) => (
                  <option value={loc._id} key={i}>
                    {loc.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label htmlFor="Category">Category</label>
              <select className="custom-select" id="Category" ref="Category" required>
                {this.props.categories.Categories.map((cat, i) => (
                  <option value={cat._id} key={i}>
                    {cat.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group d-flex justify-content-end">
            <input type="submit" value="Add" className="btn btn-success w-25" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, { AddInventoriesAction, UnMountAlertAction })(AddInventory);
