import React, { Component } from "react";
import { connect } from "react-redux";
import { AddSoldAction } from "../../Actions/SalesAction";
import PopAlert from "../Comps/PopAlert"

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
    // when reloading, the modal-backdrop div is not being removed because it is in the most root so if the app div reloads
    // the modal-backdrop which is sitting outside the app div don't remove so that we need to remove it manually
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").style.display = "none"
    }
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
        <PopAlert {...this.props.sales} />
        <div className="modal fade" id="SoldModal" tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
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
