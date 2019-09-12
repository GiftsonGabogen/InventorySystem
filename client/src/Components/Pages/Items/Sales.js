import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

function mapStateToProps(state) {
  return {
    sales: state.sales
  };
}

class Sales extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="Sales">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sales.Sales.map((Sale, i) => (
              <tr key={Sale._id}>
                <th scope="row">{i + 1}</th>
                <td>{Sale.ItemName}</td>
                <td>{Sale.Category}</td>
                <td>{Sale.Quantity}</td>
                <td>{Sale.Quantity * Sale.PricePerUnit}</td>
                <td>
                  {moment(Sale.Date)
                    .format("ddd MMM/Do/YYYY")
                    .toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sales);
