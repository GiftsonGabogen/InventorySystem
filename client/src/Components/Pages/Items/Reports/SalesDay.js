import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchAllSalesAction, FetchAllDaySalesAction } from "../../../../Actions/SalesAction"
import SearchBar from "../../../Comps/SearchBar";
import moment from "moment"

function mapStateToProps(state) {
  return {
    sales: state.sales,
    items: state.items
  };
}

class SalesDay extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.match.params.day);
    this.props.FetchAllDaySalesAction(this.props.match.params.day)
    this.state = {
      Sales: this.props.sales.DaySales
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sales.DaySales !== prevProps.sales.DaySales) {
      this.setState({
        Sales: this.props.sales.DaySales
      })
      console.log(this.props.sales)
    }
  }
  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Sales;
    if (Cat === "All" && Name === "") {
      Sales = this.props.sales.DaySales;
    } else if (Cat === "All" && Name !== "") {
      Sales = this.props.sales.DaySales.filter(Sale =>
        Sale.ItemName.toLowerCase().includes(Name)
      );
    } else if (Cat !== "All" && Name === "") {
      Sales = this.props.sales.DaySales.filter(
        Sale => Sale.Category.toLowerCase() === Cat.toLowerCase()
      );
    } else {
      var preSales = this.props.sales.DaySales.filter(
        Sale => Sale.Category.toLowerCase() === Cat.toLowerCase()
      );
      Sales = preSales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    }

    this.setState({
      Sales
    });
  };
  render() {
    return (
      <div className="Sales">
        <div className="form-row Search">
          <div className="col-10">
            <SearchBar
              onSearch={this.onSearch}
              Categories={this.props.items.categories}
            />
          </div>
          <div className="col-2 DateSearch">
            <div className="form-group Dateform">
              <select className="custom-select" defaultValue={this.state.month} ref="Date" onChange={this.onDateSearch}>
                {this.state.months.map((month, i) => (
                  <option value={month} key={i}>
                    {month}
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
                <td>{(sale.Quantity * sale.ItemID.SellingPrice) - (sale.Quantity * (sale.ItemID.Price) / (sale.ItemID.Quantity))}</td>
                <td className="Date">{moment(sale.Date).format("ddd Do of MMM")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, { FetchAllSalesAction, FetchAllDaySalesAction }
)(SalesDay);