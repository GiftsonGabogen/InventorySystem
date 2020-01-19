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
    let currentMonth = moment(Date.now()).format("MMM");
    if (this.props.credential.Type === "SuperAdmin") {
      this.state = {
        Reports: this.props.inventories.InventoryLogs,
        Year: [2020],
        Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        currentYear: 2020,
        currentMonth: currentMonth
      };
    } else {
      let filteredLogs = this.props.inventories.InventoryLogs.filter(
        logs =>
          logs.Custodian === this.props.credential.Username || logs.BorrowingCustodian === this.props.credential.Username
      );
      this.state = {
        Reports: filteredLogs,
        Year: [2020],
        Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        currentYear: 2020,
        currentMonth: currentMonth
      };
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMonth !== prevState.currentMonth) {
      let filteredReports = this.props.inventories.InventoryLogs.filter(
        report => moment(report.Date).format("MMM") === this.state.currentMonth
      );
      if (this.props.credential.Type !== "SuperAdmin") {
        filteredReports = filteredReports.filter(
          logs =>
            logs.Custodian === this.props.credential.Username || logs.BorrowingCustodian === this.props.credential.Username
        );
      }
      this.setState({
        Reports: filteredReports
      });
    }
  }

  changeMonth = e => {
    this.setState({
      currentMonth: e.target.value
    });
  };

  render() {
    return (
      <div className="InventoryReports">
        <div className="form-row">
          <div className="form-group">
            <select className="custom-select" id="Year" ref="Year" required>
              {this.state.Year.map((year, i) => (
                <option value={year} key={i}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              className="custom-select"
              id="Month"
              onChange={this.changeMonth}
              value={this.state.currentMonth}
              ref="Month"
              required
            >
              {this.state.Months.map((mon, i) => (
                <option value={mon} key={i}>
                  {mon}
                </option>
              ))}
            </select>
          </div>
        </div>

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
