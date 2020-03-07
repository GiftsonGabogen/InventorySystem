import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class ReturnBorrowedQuantity extends Component {
  render() {
    let Inv = this.props.inventories.Inventories.filter(inv => this.props.Inventory === inv._id);
    let count = Inv[0].Status.reduce((prev, current) => {
      return prev + Number(current.quantity);
    }, 0);
    console.log(count);
    if (Inv.length !== 0) {
      return <React.Fragment>{count}</React.Fragment>;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default connect(mapStateToProps)(ReturnBorrowedQuantity);
