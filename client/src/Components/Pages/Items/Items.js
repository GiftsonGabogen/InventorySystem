import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";

function mapStateToProps(state) {
  return {};
}

class Items extends Component {
  constructor(params) {
    super(params);
    this.state = {
      Items: [],
      Categories: []
    };
  }
  componentDidMount() {
    this.setState({
      Items: [
        {
          Name: "Sky Flakes",
          Category: "Biscuits",
          Price: 5.0,
          Quantity: 25,
          SellingPrice: 12,
          Unit: "Pieces"
        },
        {
          Name: "Rebisco",
          Category: "Biscuits",
          Price: 5.0,
          Quantity: 40,
          SellingPrice: 12,
          Unit: "Pieces"
        },
        {
          Name: "Hansel",
          Category: "Biscuits",
          Price: 5.0,
          Quantity: 10,
          SellingPrice: 12,
          Unit: "Pieces"
        },
        {
          Name: "C2",
          Category: "Drinks",
          Price: 10.0,
          Quantity: 12,
          SellingPrice: 15,
          Unit: "Pieces"
        }
      ],
      Categories: [
        { Name: "Biscuits" },
        { Name: "Sandwich" },
        { Name: "Drinks" }
      ]
    });
  }

  render() {
    return (
      <div className="Items">
        <SearchBar Categories={this.state.Categories} />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Category}</td>
                <td>{item.Price.toFixed(2)}</td>
                <td>{item.SellingPrice.toFixed(2)}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Items);
