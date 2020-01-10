import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class Overview extends Component {
  constructor(props) {
    super(props);
    let Borrowed = this.props.inventories.Inventories.filter(inv => inv.Status !== "false");
    let Items = 0;
    this.props.inventories.Inventories.map(inventory => (Items += inventory.Quantity));
    this.state = {
      BorrowedNum: Borrowed.length,
      ItemLength: Items
    };
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

export default connect(mapStateToProps)(Overview);
