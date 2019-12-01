import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllSalesAction, FetchAllDaySalesAction } from "../../../../Actions/SalesAction";
import SearchBar from "../../../Comps/SearchBar";
import moment from "moment";

function mapStateToProps(state) {
  return {
    sales: state.sales,
    items: state.items
  };
}

class SalesDay extends Component {
  constructor(props) {
    super(props);
    let date = Date.now();
    this.props.FetchAllDaySalesAction(moment(date).format("MMM YYYY D"));
    let Days = [];
    let numOfDays = moment(Date.now()).daysInMonth();
    for (let i = numOfDays; i > 0; i--) {
      Days.push(i);
    }
    let Year = moment(Date.now()).format("YYYY");

    let DayProfit = 0;
    this.props.sales.DaySales.map((sale, i) => {
      return (DayProfit =
        DayProfit + (sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity));
    });

    this.state = {
      Sales: this.props.sales.DaySales,
      Days: Days,
      DayProfit: DayProfit,
      months: [
        `Jan ${Year}`,
        `Feb ${Year}`,
        `Mar ${Year}`,
        `Apr ${Year}`,
        `May ${Year}`,
        `Jun ${Year}`,
        `Jul ${Year}`,
        `Aug ${Year}`,
        `Sep ${Year}`,
        `Oct ${Year}`,
        `Nov ${Year}`,
        `Dec ${Year}`
      ],
      month: moment(Date.now()).format("MMM YYYY")
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sales.DaySales !== prevProps.sales.DaySales) {
      let Days = [];
      let numOfDays = moment(this.refs.Date.value, "MMM YYYY").daysInMonth();
      for (let i = numOfDays; i > 0; i--) {
        Days.push(i);
      }
      this.setState({
        Sales: this.props.sales.DaySales,
        Days: Days
      });
    }
    if (prevProps.sales.MonthSale !== this.props.sales.MonthSale || prevState.Sales !== this.state.Sales) {
      let DayProfit = 0;
      if (this.state.Sales.length === 0) {
        this.setState({
          DayProfit: 0
        });
      }
      this.state.Sales.map((sale, i) => {
        DayProfit =
          DayProfit +
          (sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity);
        if (i === this.state.Sales.length - 1) {
          this.setState({
            DayProfit: DayProfit
          });
        }
      });
    }
  }
  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Sales;
    if (Cat === "All" && Name === "") {
      Sales = this.props.sales.DaySales;
    } else if (Cat === "All" && Name !== "") {
      Sales = this.props.sales.DaySales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    } else if (Cat !== "All" && Name === "") {
      Sales = this.props.sales.DaySales.filter(Sale => Sale.Category.toLowerCase() === Cat.toLowerCase());
    } else {
      var preSales = this.props.sales.DaySales.filter(Sale => Sale.Category.toLowerCase() === Cat.toLowerCase());
      Sales = preSales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    }

    this.setState({
      Sales
    });
  };

  onDaySearch = () => {
    this.props.FetchAllDaySalesAction(this.refs.Date.value + " " + this.refs.Day.value);
  };
  render() {
    return (
      <div className="Sales">
        <div className="form-row Search">
          <div className="col-9">
            <SearchBar onSearch={this.onSearch} Categories={this.props.items.categories} />
          </div>
          <div className=" form-row col DateSearch">
            <div className="form-group col">
              <select className="custom-select" defaultValue={this.state.month} ref="Date" onChange={this.onDaySearch}>
                {this.state.months.map((month, i) => (
                  <option value={month} key={i}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <select
                className="custom-select"
                defaultValue={moment(Date.now()).format("D")}
                ref="Day"
                onChange={this.onDaySearch}
              >
                {this.state.Days.map((Day, i) => (
                  <option value={Day} key={i}>
                    {Day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price Sold</th>
              <th scope="col">Profit</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Sales.map((sale, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{sale.ItemName}</td>
                <td>{sale.Category}</td>
                <td>{sale.Quantity}</td>
                <td>{sale.Quantity * sale.ItemID.SellingPrice}</td>
                <td>
                  {sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity}
                </td>
                <td className="Date">{moment(sale.Date).format("ddd Do of MMM")}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Profit:</td>
              <td>{this.state.DayProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, { FetchAllSalesAction, FetchAllDaySalesAction })(SalesDay);
