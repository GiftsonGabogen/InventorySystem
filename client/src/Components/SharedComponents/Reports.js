import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class SuperAdminReports extends Component {
  constructor(props) {
    super(props);
    if (this.props.credential.Type === "SuperAdmin") {
      this.state = {
        Reports: this.props.inventories.InventoryLogs
      };
    } else {
      let filteredLogs = this.props.inventories.InventoryLogs.filter(
        logs =>
          logs.Custodian === this.props.credential.Username || logs.BorrowingCustodian === this.props.credential.Username
      );
      this.state = {
        Reports: filteredLogs
      };
    }
  }

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
            {this.state.Reports.map((inventory, i) => (
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
