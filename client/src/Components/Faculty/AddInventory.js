import React, { Component } from "react";
import { connect } from "react-redux";
import { AddInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class AddInventory extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  AddInventoriesHandler = e => {
    e.preventDefault();
    let Data = {
      Name: this.refs.Name.value,
      From: this.refs.From.value,
      PricePerUnit: this.refs.PricePerUnit.value,
      Quantity: this.refs.Quantity.value,
      Location: this.refs.Location.value
    };
    this.props.AddInventoriesAction(Data);
    /* Some of my updates actions items list messed when updating because the indexing of the items is being crumbled so what I do is
    redirect the page to a page which redirect it again to the page where it came from */
    this.props.history.push(`/Reload/-Faculty-AddInventory`);
  };

  render() {
    return (
      <div className="AddItem">
        <PopAlert {...this.props.inventories} />
        <form onSubmit={this.AddInventoriesHandler}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" ref="Name" className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="From">From</label>
            <input type="text" ref="From" className="form-control" required />
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="PricePerUnit">Price Per Unit</label>
              <input type="number" defaultValue="1" ref="PricePerUnit" className="form-control" required />
            </div>
            <div className="form-group col">
              <label htmlFor="Quantity">Quantity</label>
              <input type="number" defaultValue="1" ref="Quantity" className="form-control" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Location">Location</label>
            <input type="text" ref="Location" className="form-control" required />
          </div>

          <input type="submit" value="Add" className="btn btn-primary w-25" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, { AddInventoriesAction, UnMountAlertAction })(AddInventory);
