import React, { Component } from "react";
import { connect } from "react-redux";
import { AddSoldAction } from "../../Actions/SalesAction";

function mapStateToProps(state) {
  return {
    items: state.items,
    credential: state.credential,
    sales: state.sales
  };
}
var filteredItems = [];

class StoreHome extends Component {
  constructor(params) {
    super(params);
    this.state = {
      Name: "",
      TotalPrice: 0,
      PricePerUnit: 0,
      Quantity: 0,
      id: "",
      Category: ""
    };
  }
  componentDidMount() {
    console.log(this.props.credential);
  }

  onCloseHandler = () => {
    console.log("close");
    this.setState({
      Name: "",
      TotalPrice: 0,
      PricePerUnit: 0,
      Quantity: 0,
      id: "",
      Category: ""
    });
  };

  SoldActionHandler = e => {
    e.preventDefault();
    const { Quantity } = this.refs;
    let Data = {
      ItemName: this.state.Name,
      Seller: this.props.credential.Username,
      ItemID: this.state.id,
      Quantity: Quantity.value,
      PricePerUnit: this.state.PricePerUnit
    };
    this.props.AddSoldAction(Data);
  };

  SoldHandler = (Name, PricePerUnit, id, Category) => {
    this.setState({
      Name,
      PricePerUnit,
      id,
      Category
    });
  };

  render() {
    if (this.props.items.items.length > 0) {
      filteredItems = this.props.items.items.filter(
        item => item.Quantity !== 0
      );
    }
    return (
      <div className="Home Store">
        <div className="modal fade" id="SoldModal" tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {this.props.sales.message === "" ? (
                  ""
                ) : (
                  <div
                    className={`alert ${
                      this.props.items.Success === true
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                    role="alert"
                  >
                    {this.props.credential.message}
                  </div>
                )}
                <div className="modal-title">
                  {this.state.Name + " P" + this.state.PricePerUnit}
                </div>
                <button
                  onClick={this.onCloseHandler}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.SoldActionHandler}>
                  <div className="form-group">
                    <label htmlFor="Quantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      ref="Quantity"
                      value={this.state.Quantity}
                      onChange={e =>
                        this.setState({
                          Quantity: e.target.value
                        })
                      }
                      id=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Total Price">Total Price</label>
                    <input
                      type="number"
                      className="form-control"
                      ref="Total Price"
                      value={this.state.PricePerUnit * this.state.Quantity}
                      disabled
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Sold"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Unit</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Category.Name}</td>
                <td>{item.SellingPrice}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#SoldModal"
                    onClick={() =>
                      this.SoldHandler(
                        item.Name,
                        item.SellingPrice,
                        item._id,
                        item.Category.Name
                      )
                    }
                  >
                    Sold
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

export default connect(
  mapStateToProps,
  { AddSoldAction }
)(StoreHome);
