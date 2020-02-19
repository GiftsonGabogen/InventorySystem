import React, { Component } from "react";
import moment from "moment";
import fileSaver from "file-saver";
import xlsx from "xlsx";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class Reports extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment(Date.now()).format("MMM");
    let numberOfDays = moment(Date.now()).daysInMonth();
    let from = `${currentMonth} 1 2020`;
    let to = `${currentMonth} ${numberOfDays} 2020`;
    let InventoryLogs = this.props.inventories.InventoryLogs.filter(inventory => moment(inventory.Date).isBetween(from, to));
    let Days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      Days.push(i);
    }
    if (this.props.credential.Type === "SuperAdmin") {
      this.state = {
        Reports: InventoryLogs,
        Year: [2020],
        Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        Days: Days,
        from: from,
        to: to
      };
    } else {
      let filteredLogs = InventoryLogs.filter(
        logs =>
          logs.Custodian === this.props.credential.Username || logs.BorrowingCustodian === this.props.credential.Username
      );
      this.state = {
        Reports: filteredLogs,
        Year: [2020],
        Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        Days: Days,
        from: from,
        to: to
      };
    }
  }
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  FilterHandler = e => {
    e.preventDefault();
    let { fromYear, fromMonth, fromDate, toYear, toMonth, toDate } = this.refs;
    // the starting date for filtering reports
    let from = `${fromMonth.value} ${fromDate.value} ${fromYear.value}`;
    // the ending date for filtering reports
    let to = `${toMonth.value} ${toDate.value} ${toYear.value}`;
    let InventoryLogs = this.props.inventories.InventoryLogs.filter(inventory => moment(inventory.Date).isBetween(from, to));
    //if the user is not the superadmin, he can only see the reports of himself, he can't see the reports of other custodian
    //whereas when the user is superadmin he can see all the reports of custodians and himself
    if (this.props.credential.Type !== "SuperAdmin") {
      InventoryLogs = InventoryLogs.filter(
        logs =>
          logs.Custodian === this.props.credential.Username || logs.BorrowingCustodian === this.props.credential.Username
      );
    }
    this.setState({
      to: to,
      from: from,
      Reports: InventoryLogs
    });
    document.querySelector(".createdModal").style.display = "none";
  };
  openFilterModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeFilterModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  exportReport = () => {
    let table = document.querySelector(".reportsTable");
    let wb = xlsx.utils.table_to_book(table, {
      sheet: moment(this.state.from).isSameOrBefore(this.state.to)
        ? this.state.from + " - " + this.state.to
        : this.state.to + " - " + this.state.from
    });
    let wbout = xlsx.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });

    let s2ab = s => {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    fileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      `Reports on ${
        moment(this.state.from).isSameOrBefore(this.state.to)
          ? this.state.from + " - " + this.state.to
          : this.state.to + " - " + this.state.from
      }.xlsx`
    );
  };

  render() {
    return (
      <div className="InventoryReports">
        <div className="row">
          <div className="filter col-9">
            <button className="btn-sm btn-primary" onClick={this.openFilterModal}>
              Filter
            </button>
            <div className="FilterState">
              {moment(this.state.from).isSameOrBefore(this.state.to) ? <h1>from</h1> : <h1>to</h1>}
              <p>{this.state.from}</p>
            </div>
            <div className="FilterState">
              {moment(this.state.to).isSameOrAfter(this.state.from) ? <h1>to</h1> : <h1>from</h1>}
              <p>{this.state.to}</p>
            </div>
          </div>
          <div className="exportReport col-3">
            <button className="btn-sm btn-primary" onClick={this.exportReport}>
              export
            </button>
          </div>
        </div>
        <div className="createdModal">
          <div className="Modal">
            <div className="closingModal" onClick={this.closeFilterModal}>
              x
            </div>
            <form onSubmit={this.FilterHandler}>
              <h2 id="createdModalTitle"></h2>
              <h1>Between</h1>
              <div className="from">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="Year">Year</label>
                    <select className="custom-select" ref="fromYear" required>
                      {this.state.Year.map((year, i) => (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Month">Month</label>
                    <select className="custom-select" ref="fromMonth" required>
                      {this.state.Months.map((month, i) => (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Date">Date</label>
                    <select className="custom-select" ref="fromDate" required>
                      {this.state.Days.map((day, i) => (
                        <option value={day} key={i}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="to">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="Year">Year</label>
                    <select className="custom-select" ref="toYear" required>
                      {this.state.Year.map((year, i) => (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Month">Month</label>
                    <select className="custom-select" ref="toMonth" required>
                      {this.state.Months.map((month, i) => (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Date">Date</label>
                    <select className="custom-select" ref="toDate" required>
                      {this.state.Days.map((day, i) => (
                        <option value={day} key={i}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <input type="submit" value="Submit" className="form-control btn btn-primary" />
            </form>
          </div>
        </div>

        <table className="table table-striped table-dark reportsTable">
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

export default connect(mapStateToProps, { UnMountAlertAction })(Reports);
