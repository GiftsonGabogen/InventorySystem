import React, { Component } from "react";
import { connect } from "react-redux";
import PopAlert from "../Comps/PopAlert";
import moment from "moment";
import { FetchInventoryAction, BorrowInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    inventories: state.inventories
  };
}

class Inventories extends Component {
  constructor(props) {
    super(props);
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
    this.state = {
      maxBorrow: 0
    };
  }
  componentDidMount() {
    this.props.FetchInventoryAction(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    // checking the remaining item that can be borrowed
    let borrowed = 0;
    if (this.props.inventories.Inventory !== prevProps.inventories.Inventory) {
      if (this.props.inventories.Inventory.Status.length !== 0) {
        this.props.inventories.Inventory.Status.map((inv, i) => {
          borrowed += parseInt(inv.quantity);
        });
        console.log(borrowed);
        let maxBorrow = this.props.inventories.Inventory.Quantity - borrowed;
        console.log(maxBorrow);
        this.setState({
          maxBorrow
        });
      } else {
        this.setState({
          maxBorrow: this.props.inventories.Inventory.Quantity
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  BorrowSubmit = e => {
    e.preventDefault();
    let data = {
      Borrower: this.refs.Name.value,
      Quantity: this.refs.Quantity.value,
      id: this.props.match.params.id
    };
    this.props.BorrowInventoriesAction(data);
    this.props.history.push(`/Reload/-Faculty-Inventory-${this.props.match.params.id}`);
  };

  render() {
    // assign this.props.inventories.Inventory to Inventory for shorter syntax
    let Inventory = {};
    if (this.props.inventories.Inventory) {
      Inventory = this.props.inventories.Inventory;
    }
    if (this.props.inventories.Loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="IndividualInventory jumbotron">
          <PopAlert {...this.props.inventories} />
          <h1>{Inventory.Name}</h1>
          <hr />
          <div className="head">
            <div className="image">
              <img src="/inventoryImageUpload/sample.png" alt="imagesample" />
            </div>
            {/* informations of the item */}
            <div className="info">
              <p>Quantity: {Inventory.Quantity}</p>
              <p>Location: {Inventory.Location}</p>
              <p>Price Per Unit: {Inventory.PricePerUnit}</p>
              <p>Item Remaining : {this.state.maxBorrow}</p>
            </div>
            {/* form for borrowing an item */}
            <div className="borrowform">
              <form onSubmit={this.BorrowSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input type="text" className="form-control" id="Name" placeholder="Name" ref="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="Quantity">Quantity</label>
                  <input
                    type="number"
                    ref="Quantity"
                    max={this.state.maxBorrow}
                    className="form-control"
                    id="Quantity"
                    placeholder="Quantity"
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Borrow" />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, {
  UnMountAlertAction,
  FetchInventoryAction,
  BorrowInventoriesAction
})(Inventories);
