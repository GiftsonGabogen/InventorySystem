import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchAllSalesAction } from "../../../../Actions/SalesAction"
import SearchBar from "../../../Comps/SearchBar";
import moment from "moment"

function mapStateToProps(state) {
  return {
    sales: state.sales,
    items: state.items
  };
}

class Sales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sales: this.props.sales.MonthSale
    }
  }
  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Sales;
    if (Cat === "All" && Name === "") {
      Sales = this.props.sales.MonthSale;
    } else if (Cat === "All" && Name !== "") {
      Sales = this.props.sales.MonthSale.filter(Sale =>
        Sale.ItemName.toLowerCase().includes(Name)
      );
    } else if (Cat !== "All" && Name === "") {
      Sales = this.props.sales.MonthSale.filter(
        Sale => Sale.Category.toLowerCase() === Cat.toLowerCase()
      );
    } else {
      var preSales = this.props.sales.MonthSale.filter(
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
        <SearchBar
          onSearch={this.onSearch}
          Categories={this.props.items.categories}
        />
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
  mapStateToProps, { FetchAllSalesAction }
)(Sales);