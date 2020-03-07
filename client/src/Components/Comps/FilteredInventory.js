import React, { Component } from "react";
import { connect } from "react-redux";

import ReturnLocation from "./ReturnLocation";
import ReturnCategory from "./ReturnCategory";
import ReturnBorrowedQuantity from "./ReturnBorrowedQuantity";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class FilteredInventory extends Component {
  constructor(props) {
    super(props);
    let Inventories = this.props.inventories.Inventories.filter(inv => this.props.filterName === inv[this.props.filter]);
    this.state = {
      Inventories: Inventories
    };
  }
  moreInfo = id => {
    console.log(this.props.history);
    this.props.history.push(
      this.props.credential.Type === "SuperAdmin"
        ? `/Reload/-SuperAdmin-Inventory-${id}`
        : `/Reload/-Faculty-Inventory-${id}`
    );
  };

  render() {
    if (this.state.Inventories.length === 0) {
      return <div>No Inventories</div>;
    } else {
      return (
        <div>
          <h3>
            <ReturnLocation Location={this.props.filterName} />
          </h3>
          <table className="table table-striped table-dark filteredInventory">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Borrowed</th>
                <th scope="col">Location</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.Inventories.map((inventory, i) => (
                <tr className="Inventory" key={i} onClick={() => this.moreInfo(inventory._id)}>
                  <th scope="row">{i + 1}</th>
                  <td>{inventory.Name}</td>
                  <td>{inventory.Quantity}</td>
                  <td>
                    <ReturnBorrowedQuantity Inventory={inventory._id} />
                  </td>
                  <td>
                    <ReturnLocation Location={inventory.Location} />
                  </td>
                  <td>
                    <ReturnCategory Category={inventory.Category} />
                  </td>
                  <td className="ItemsImage">
                    <img src={inventory.Name === undefined || null || false ? "" : `/${inventory.Image[0]}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(FilteredInventory);
