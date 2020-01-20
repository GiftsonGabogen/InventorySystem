import React, { Component } from "react";
import moment from "moment";
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
    this.state = {
      Modifies: this.props.inventories.InventoryModifies,
      Year: [2020],
      Months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      currentYear: 2020,
      currentMonth: currentMonth
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMonth !== prevState.currentMonth) {
      let filteredModifies = this.props.inventories.InventoryModifies.filter(
        report => moment(report.Date).format("MMM") === this.state.currentMonth
      );
      this.setState({
        Modifies: filteredModifies
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
      <div className="InventoryModifies">
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
            {this.state.Modifies.map((inventory, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{inventory.inventoryInfo.Name}</td>
                <td>{inventory.Custodian}</td>
                <td>{inventory.Description}</td>
                <td>{moment(inventory.Date).format("MMM D YYYY hh A")}</td>
                <td>
                  <button className="btn btn-sm btn-primary">info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Modifies);
