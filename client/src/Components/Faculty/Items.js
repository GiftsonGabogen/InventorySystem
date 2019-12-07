import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../Comps/SearchBar";
import PopAlert from "../Comps/PopAlert";
import { BorrowInventoriesAction, FetchAllInventoriesAction } from "../../Actions/InventoriesActions";
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
      Inventories: this.props.inventories,
      Name: "",
      Quantity: 1,
      Borrower: "",
      Location: "",
      Date: "",
      id: "",
      max: 1
    };
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  CloseBorrowHandler = () => {
    /* Resseting The Modal Data Which is Fetch Form The State When The Modal is Closed */
    this.setState({
      id: "",
      Name: "",
      Borrower: "",
      Quantity: 1,
      max: 1
    });
    this.props.UnMountAlertAction();
  };
  CloseReturnHandler = () => {
    /* Resseting The Modal Data Which is Fetch Form The State When The Modal is Closed */
    this.setState({
      Name: "",
      Borrower: "",
      id: "",
      Quantity: 1,
      Date: "",
      max: 1
    });
    this.props.UnMountAlertAction();
  };

  BorrowHandler = (Name, id, max) => {
    this.setState({
      Name,
      id,
      max
    });
  };
  ReturnHandler = (id, Name, Borrower, Date, Quantity) => {
    this.setState({
      id,
      Name,
      Borrower,
      Date,
      Quantity,
      max: Quantity
    });
  };
  NameHandler = e => {
    this.setState({
      Name: e.target.value
    });
  };
  BorrowerHandler = e => {
    this.setState({
      Borrower: e.target.value
    });
  };
  QuantityHandler = e => {
    this.setState({
      Quantity: e.target.value
    });
  };

  BorrowSubmitHandler = e => {
    e.preventDefault();
    let Data = {
      id: this.state.id,
      Borrower: this.state.Borrower,
      Quantity: this.state.Quantity
    };
    this.props.BorrowInventoriesAction(Data);
    this.props.history.push(`/Reload/-Faculty-Inventories`);
  };
  render() {
    return (
      <div className="Inventories">
        <PopAlert {...this.state.Inventories} />
        {/*Borrow Modal*/}
        <div className="modal fade" tabIndex="-1" role="dialog" id="BorrowModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.state.Name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.CloseBorrowHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.BorrowSubmitHandler}>
                  <input type="hidden" ref="id" value={this.state.id} />
                  <div className="form-group">
                    <label htmlFor="Quantity">Quantity</label>
                    <input
                      type="number"
                      step="1"
                      ref="Quantity"
                      min="1"
                      max={this.state.max}
                      className="form-control"
                      onChange={this.QuantityHandler}
                      value={this.state.Quantity}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Borrower">Borrower</label>
                    <input
                      type="text"
                      ref="Borrower"
                      className="form-control"
                      onChange={this.BorrowerHandler}
                      value={this.state.Borrower}
                    />
                  </div>

                  <input type="submit" value="Borrow" className="btn btn-primary w-50" />
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*Return Modal*/}
        <div className="modal fade" tabIndex="-1" role="dialog" id="ReturnModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {this.state.Name} Borrowed By {this.state.Borrower}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.CloseReturnHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.ReturnSubmitHandler}>
                  <input type="hidden" ref="id" value={this.state.id} />
                  <input type="hidden" ref="Date" value={this.state.Date} />
                  <input type="hidden" ref="Borrower" value={this.state.Borrower} />
                  <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                      type="text"
                      ref="Name"
                      className="form-control"
                      onChange={this.NameHandler}
                      value={this.state.Name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Quantity">Quantity</label>
                    <input
                      type="number"
                      step="1"
                      ref="Quantity"
                      min="1"
                      max={this.state.max}
                      className="form-control"
                      onChange={this.QuantityHandler}
                      value={this.state.Quantity}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Returnee">Returnee</label>
                    <input type="text" ref="Returnee" className="form-control" />
                  </div>

                  <input type="submit" value="Return" className="btn btn-primary w-50" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">From</th>
              <th scope="col">Date of Acquiring</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price Per Unit</th>
              <th scope="col">Status</th>
              <th scope="col">Borrower</th>
              <th scope="col">Location</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Inventories.Inventories.map((inventories, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{inventories.Name}</td>
                <td>{inventories.From}</td>
                <td>{inventories.Date}</td>
                <td>{inventories.Quantity}</td>
                <td>{inventories.PricePerUnit.toFixed(2)}</td>
                <td>{inventories.Status}</td>
                <td>{inventories.Borrower}</td>
                <td>{inventories.Location}</td>
                <td>
                  {inventories.Borrower === "None" ? (
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#BorrowModal"
                      onClick={() => this.BorrowHandler(inventories.Name, inventories._id, inventories.Quantity)}
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#ReturnModal"
                      onClick={() =>
                        this.ReturnHandler(
                          inventories._id,
                          inventories.Name,
                          inventories.Borrower,
                          inventories.Date,
                          inventories.Quantity
                        )
                      }
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, { UnMountAlertAction, BorrowInventoriesAction, FetchAllInventoriesAction })(
  Inventories
);
