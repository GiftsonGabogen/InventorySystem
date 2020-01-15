import React, { Component } from "react";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class Overview extends Component {
  constructor(props) {
    super(props);
    let BorrowedList = this.props.inventories.Inventories.filter(inv => inv.Status.length !== 0);
    let Borrowed = 0;
    let Items = 0;
    BorrowedList.map(borrow => borrow.Status.map(borrowCount => (Borrowed += parseInt(borrowCount.quantity))));
    this.props.inventories.Inventories.map(inventory => (Items += parseInt(inventory.Quantity)));
    this.state = {
      BorrowedNum: Borrowed,
      ItemLength: Items
    };
  }
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  render() {
    return (
      <div className="FacultyOverview">
        <div className="card">
          <div className="card-header">Inventory Overview</div>
          <div className="card-body">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <img src="./Images/Shopping-bag.png" className="w-50" alt="" />
                  <h2>{this.state.ItemLength}</h2>
                  <h2>Items</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <img src="./Images/piggy-bank.png" className="w-50" alt="" />
                  <h2>{this.state.BorrowedNum}</h2>
                  <h2>Borrowed</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { UnMountAlertAction })(Overview);
