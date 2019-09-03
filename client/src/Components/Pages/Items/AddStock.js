import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {};
}

class AddStock extends Component {
componentWillUnmount() {
  this.props.UnMountAlertAction()
}


  Price = e => {
    let PricePerUnit = 0;
    let Price = 0;
    if (this.state.Quantity !== 0 && e.target.value !== "") {
      PricePerUnit = e.target.value / this.state.Quantity;
      Price = e.target.value;
    } else if (e.target.value === "") {
      PricePerUnit = 0;
      Price = 0;
    } else {
      PricePerUnit = e.target.value;
      Price = e.target.value;
    }
    this.setState({
      PricePerUnit: PricePerUnit,
      Price: Price
    });
  };

  Quantity = e => {
    let Quantity = 0;
    let PricePerUnit = 0;
    if (this.state.Price !== 0 && e.target.value !== "") {
      PricePerUnit = this.state.Price / e.target.value;
      Quantity = e.target.value;
    } else if (e.target.value === "") {
      PricePerUnit = 0;
      Quantity = 0;
    } else {
      PricePerUnit = e.target.value;
      Quantity = e.target.value;
    }
    this.setState({
      PricePerUnit: PricePerUnit,
      Quantity: Quantity
    });
  };

  AddHandler = (Name, SellingPrice) => {
    this.setState({
      Name,
      SellingPrice
    });
  };

  CloseHandler = () => {
    this.setState({
      Name: "",
      SellingPrice: 0
    });
  };
  SellingPriceHandler = e => {
    this.setState({
      SellingPrice: e.target.value
    });
  };
  constructor(params) {
    super(params);
    this.state = {
      PricePerUnit: 0,
      Price: 0,
      Quantity: 0,
      Items: [],
      Categories: [],
      SellingPrice: 0,
      Name: ""
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
      <div className="AddStock">
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="AddStockModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.state.Name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.CloseHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="form-group col-5">
                        <label htmlFor="Price">Price</label>
                        <input
                          type="number"
                          step="0.01"
                          ref="Price"
                          className="form-control"
                          onChange={this.Price}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="Quantity">Quantity</label>
                        <input
                          type="number"
                          step="0.01"
                          ref="Quantity"
                          onChange={this.Quantity}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="PricePerUnit">Price Per Unit</label>
                        <input
                          type="number"
                          step="0.01"
                          ref="Price"
                          className="form-control"
                          value={this.state.PricePerUnit}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="SellingPrice">Selling Price</label>
                      <input
                        type="number"
                        step="0.01"
                        ref="SellingPrice"
                        className="form-control"
                        onChange={this.SellingPriceHandler}
                        value={this.state.SellingPrice}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Add"
                      className="btn btn-primary w-50"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

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
              <th />
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
                <td>
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#AddStockModal"
                    onClick={() =>
                      this.AddHandler(item.Name, item.SellingPrice)
                    }
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps,{UnMountAlertAction})(AddStock);
