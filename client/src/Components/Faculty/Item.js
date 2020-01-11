import React, { Component } from "react";
import { connect } from "react-redux";
import PopAlert from "../Comps/PopAlert";
import moment from "moment";
import { FetchInventoryAction, BorrowInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class Inventories extends Component {
  constructor(props) {
    super(props);
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
    this.state = {
      maxBorrow: 0,
      inventoryLoaded: false,
      Status: []
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
        let maxBorrow = this.props.inventories.Inventory.Quantity - borrowed;
        this.setState({
          maxBorrow: maxBorrow,
          Status: this.props.inventories.Inventory.Status
        });
      } else {
        this.setState({
          maxBorrow: this.props.inventories.Inventory.Quantity,
          Status: this.props.inventories.Inventory.Status
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
      id: this.props.match.params.id,
      Custodian: this.props.credential.Username
    };
    this.props.BorrowInventoriesAction(data);
    this.props.history.push(`/Reload/-Faculty-Inventory-${this.props.match.params.id}`);
  };

  openReturn = id => {
    let returningItem = this.props.inventories.Inventory.Status.filter(stat => stat._id === id);
    this.refs.returnQuantity.max = returningItem[0].quantity;
    this.refs.Borrower.value = returningItem[0].borrower;
    document.getElementById("BorrowerText").innerText = returningItem[0].borrower;
    document.querySelector(".returnModal").style.display = "grid";
  };
  closeReturnModal = () => {
    document.querySelector(".returnModal").style.display = "none";
  };
  returnSubmit = e => {
    e.preventDefault();
  };

  render() {
    // assign this.props.inventories.Inventory to Inventory for shorter syntax
    let Inventory = {};
    if (this.state.inventoryLoaded === true) {
      Inventory = this.props.inventories.Inventory;
    }
    if (this.props.inventories.Loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="IndividualInventory jumbotron">
          <PopAlert {...this.props.inventories} />
          <div className="returnModal">
            <div className="Modal">
              <div className="closeReturnModal" onClick={this.closeReturnModal}>
                x
              </div>
              <form onSubmit={this.returnSubmit}>
                <h2 id="returnModalTitle"></h2>
                <div className="form-group">
                  <label htmlFor="Name">Returnee</label>
                  <input type="text" className="form-control" id="Returnee" placeholder="Returnee" ref="Returnee" />
                </div>
                <div className="form-group">
                  <label htmlFor="Quantity">Quantity</label>
                  <input type="number" ref="returnQuantity" className="form-control" placeholder="Quantity" />
                </div>
                <input type="hidden" ref="Borrower" id="Borrower" />
                <input type="submit" className="btn btn-primary" value="Return" />
                <div>
                  Borrowed by <p id="BorrowerText"></p>
                </div>
              </form>
            </div>
          </div>
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
          <div className="Status">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Borrower</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.Status.map((stat, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{stat.borrower}</td>
                    <td>{stat.quantity}</td>
                    <td>{stat.date}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => this.openReturn(stat._id)}>
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
