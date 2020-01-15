import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class SuperAdminReports extends Component {
  render() {
    return (
      <div className="InventoryReports">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th className="small" scope="col">
                #
              </th>
              <th className="small" scope="col">
                Item
              </th>
              <th className="small" scope="col">
                Borrower
              </th>
              <th className="small" scope="col">
                Returnee
              </th>
              <th className="small" scope="col">
                Date of Borrow
              </th>
              <th className="small" scope="col">
                Date of Return
              </th>
              <th className="small" scope="col">
                Quantity
              </th>
              <th className="small" scope="col">
                Custodian at Borrow
              </th>
              <th className="small" scope="col">
                Custodian at Return
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.inventories.InventoryLogs.map((inventory, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{inventory.ItemName}</td>
                <td>{inventory.Borrower}</td>
                <td>{inventory.Returnee}</td>
                <td>{inventory.Borrowed}</td>
                <td>{moment(inventory.Date).format("MMM D YYYY hh A")}</td>
                <td>{inventory.Quantity}</td>
                <td>{inventory.BorrowingCustodian}</td>
                <td>{inventory.Custodian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SuperAdminReports);
