import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../../Comps/SearchBar";

function mapStateToProps(state) {
  return {
    sales: state.sales,
    items: state.items
  };
}

class AlltimeSales extends Component {
  constructor(props) {
    super(props);

    let Profit = 0;
    this.props.sales.AllTimeSales.map((sale, i) => {
      return (Profit =
        Profit + (sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity));
    });

    this.state = {
      Sales: this.props.sales.AllTimeSales,
      Profit: Profit
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sales.AllTimeSales !== this.props.sales.AllTimeSales) {
      this.setState({
        Sales: this.props.sales.AllTimeSales
      });
    }
    if (prevProps.sales.MonthSale !== this.props.sales.MonthSale || prevState.Sales !== this.state.Sales) {
      let Profit = 0;
      if (this.state.Sales.length === 0) {
        this.setState({
          Profit: 0
        });
      }
      this.state.Sales.map((sale, i) => {
        Profit =
          Profit + (sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity);
        if (i === this.state.Sales.length - 1) {
          this.setState({
            Profit: Profit
          });
        }
      });
    }
  }

  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Sales;
    if (Cat === "All" && Name === "") {
      Sales = this.props.sales.AllTimeSales;
    } else if (Cat === "All" && Name !== "") {
      Sales = this.props.sales.AllTimeSales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    } else if (Cat !== "All" && Name === "") {
      Sales = this.props.sales.AllTimeSales.filter(Sale => Sale.Category.toLowerCase() === Cat.toLowerCase());
    } else {
      var preSales = this.props.sales.AllTimeSales.filter(Sale => Sale.Category.toLowerCase() === Cat.toLowerCase());
      Sales = preSales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    }
    this.setState({
      Sales
    });
  };

  render() {
    return (
      <div className="AllTimeSales">
        <SearchBar onSearch={this.onSearch} Categories={this.props.items.categories} Date />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price Sold</th>
              <th scope="col">Profit</th>
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
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Profit:</td>
              <td>{this.state.Profit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AlltimeSales);
