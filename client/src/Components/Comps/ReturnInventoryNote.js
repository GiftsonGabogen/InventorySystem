import React, { Component } from "react";
import { connect } from "react-redux";
import ReturnCategory from "./ReturnCategory";
import ReturnLocation from "./ReturnLocation";
import ReturnBorrowedQuantity from "./ReturnBorrowedQuantity";
import moment from "moment";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class ReturnInventoryNote extends Component {
  confirm = () => {
    this.props.confirm();
  };
  decline = () => {
    this.props.decline();
  };
  render() {
    console.log(this.props.Inventory);
    let inventory = this.props.inventories.Inventories.filter(inv => this.props.Inventory === inv._id);
    if (inventory.length !== 0) {
      return (
        <React.Fragment>
          <td>{inventory[0].Name}</td>
          <td>{inventory[0].Quantity}</td>
          <td>
            <ReturnCategory Category={inventory[0].Category} />
          </td>
          <td>{moment(inventory[0].Date).format("MMM D YYYY hh:mm A")}</td>
          <td>{this.props.Description}</td>
          <td className="ItemsImage">
            <img src={inventory[0].Name === undefined || null || false ? "" : `/${inventory[0].Image[0]}`} />
          </td>
          <td className="buttons">
            <button className="btn btn-success" onClick={this.confirm}>
              confirm
            </button>
            <button className="btn btn-danger" onClick={this.decline}>
              decline
            </button>
          </td>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default connect(mapStateToProps)(ReturnInventoryNote);
