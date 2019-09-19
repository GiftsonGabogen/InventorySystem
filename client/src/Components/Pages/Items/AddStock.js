import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";
import { AddStockAction } from "../../../Actions/ItemActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class AddStock extends Component {
  constructor(params) {
    super(params);
    this.state = {
      PricePerUnit: 0,
      Price: 0,
      Quantity: 0,
      id: "",
      SellingPrice: 0,
      Name: "",
      Items: this.props.items.items
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      Items: nextProps.items.items
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.Items === nextProps.items.items &&
      this.state === nextState
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Items;
    if (Cat === "All" && Name === "") {
      Items = this.props.items.items;
    } else if (Cat === "All" && Name !== "") {
      Items = this.props.items.items.filter(Item =>
        Item.Name.toLowerCase().includes(Name)
      );
    } else if (Cat !== "All" && Name === "") {
      Items = this.props.items.items.filter(
        Item => Item.Category.Name.toLowerCase() === Cat.toLowerCase()
      );
    } else {
      var preItems = this.props.items.items.filter(
        Item => Item.Category.Name.toLowerCase() === Cat.toLowerCase()
      );
      Items = preItems.filter(Item => Item.Name.toLowerCase().includes(Name));
    }

    this.setState({
      Items
    });
  };

  AddStockHandler = e => {
    e.preventDefault();
    const { Price, SellingPrice, Quantity, id } = this.refs;
    let Data = {
      Price: Price.value,
      id: id.value,
      SellingPrice: SellingPrice.value,
      Quantity: Quantity.value
    };
    this.props.AddStockAction(Data);
  };

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

  AddHandler = (Name, SellingPrice, id) => {
    this.setState({
      Name,
      SellingPrice,
      id
    });
  };

  CloseHandler = () => {
    this.setState({
      Name: "",
      SellingPrice: 0,
      PricePerUnit: 0
    });
    this.refs.Quantity.value = 0;
    this.refs.Price.value = 0;
    this.props.UnMountAlertAction();
  };
  SellingPriceHandler = e => {
    this.setState({
      SellingPrice: e.target.value
    });
  };

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
                <h5 className="modal-title">
                  {this.state.Name}
                  {this.props.items.message === "" ? (
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
                      {this.props.items.message}
                    </div>
                  )}
                </h5>

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
                <form onSubmit={this.AddStockHandler}>
                  <input type="hidden" ref="id" value={this.state.id} />
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
                          ref="PricePerUnit"
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

        <SearchBar
          onSearch={this.onSearch}
          Categories={this.props.items.categories}
        />
        <table className="table table-striped table-sm">
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
                <td>{item.Category.Name}</td>
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
                      this.AddHandler(item.Name, item.SellingPrice, item._id)
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

export default connect(
  mapStateToProps,
  { UnMountAlertAction, AddStockAction }
)(AddStock);
