import React, { Component } from "react";
import moment from "moment";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import fileSaver from "file-saver";
import PrintButton from "../Comps/PrintButton";
import xlsx from "xlsx";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class Modifies extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment(Date.now()).format("MMM");
    let numberOfDays = moment(Date.now()).daysInMonth();
    let from = `${currentMonth} 1 2020`;
    let to = `${currentMonth} ${numberOfDays} 2020`;
    let InventoryModifies = this.props.inventories.InventoryModifies.filter(modify =>
      moment(modify.Date).isBetween(from, to)
    );
    let Days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      Days.push(i);
    }
    if (this.props.credential.Type === "SuperAdmin") {
      this.state = {
        Modifies: InventoryModifies,
        Year: [2020],
        Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        Days: Days,
        from: from,
        to: to
      };
    } else {
      let filteredLogs = InventoryModifies.filter(
        modify =>
          modify.Custodian === this.props.credential.Username || modify.BorrowingCustodian === this.props.credential.Username
      );
      this.state = {
        Modifies: filteredLogs,
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
    let InventoryModifies = this.props.inventories.InventoryModifies.filter(modify =>
      moment(modify.Date).isBetween(from, to)
    );
    //if the user is not the superadmin, he can only see the reports of himself, he can't see the reports of other custodian
    //whereas when the user is superadmin he can see all the reports of custodians and himself
    if (this.props.credential.Type !== "SuperAdmin") {
      InventoryModifies = InventoryModifies.filter(
        modify =>
          modify.Custodian === this.props.credential.Username || modify.BorrowingCustodian === this.props.credential.Username
      );
    }
    this.setState({
      to: to,
      from: from,
      Modifies: InventoryModifies
    });
    document.querySelector(".createdModal").style.display = "none";
  };
  openFilterModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeFilterModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  exportModifies = () => {
    let table = document.querySelector(".modifiesTable");
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
      <div className="InventoryModifies">
        <div className="d-flex mb-2">
          <div className="filter mr-auto">
            <button className="btn-sm btn-success" onClick={this.openFilterModal}>
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
          <div className="exportModifies">
            <button className="btn-sm btn-success" onClick={this.exportModifies}>
              export
            </button>
            <PrintButton element="modifiesTable" type="html"></PrintButton>
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

              <input type="submit" value="Submit" className="form-control btn btn-success" />
            </form>
          </div>
        </div>

        <div id="modifiesTable">
          <table className="table table-striped table-dark modifiesTable">
            <thead>
              <tr>
                <th className="small" scope="col">
                  #
                </th>
                <th className="small" scope="col">
                  Item
                </th>
                <th className="small" scope="col">
                  Custodian
                </th>
                <th className="small" scope="col">
                  Description
                </th>
                <th className="small" scope="col">
                  Date
                </th>
                <th className="small" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.Modifies.map((modify, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{modify.InventoryInfo.Name}</td>
                  <td>{modify.Custodian}</td>
                  <td>{modify.Description}</td>
                  <td>{moment(modify.Date).format("MMM D YYYY hh A")}</td>
                  <td>
                    <button className="btn btn-sm btn-success">info</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Signature">
            <div className="content">
              <p className="Name">{this.props.credential.Name}</p>
              <p>{this.props.credential.Type === "SuperAdmin" ? "Admin" : "Custodian"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { UnMountAlertAction })(Modifies);
