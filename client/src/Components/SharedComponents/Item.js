import React, { Component } from "react";
import { connect } from "react-redux";
import PopAlert from "../Comps/PopAlert";
import ReturnLocation from "../Comps/ReturnLocation";
import ReturnCategory from "../Comps/ReturnCategory";
import moment from "moment";
import {
  FetchInventoryAction,
  BorrowInventoriesAction,
  BackInventoriesAction,
  DeleteInventoryAction,
  AddImageAction,
  DeleteImageAction,
  AddDeleteNoteAction
} from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential,
    locations: state.locations,
    categories: state.categories
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
      Status: [],
      deleteImages: []
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
          Status: this.props.inventories.Inventory.Status,
          inventoryLoaded: true
        });
      } else {
        this.setState({
          maxBorrow: this.props.inventories.Inventory.Quantity,
          Status: this.props.inventories.Inventory.Status,
          inventoryLoaded: true
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
    if (this.props.credential.Type === "SuperAdmin") {
      this.props.history.push(`/Reload/-SuperAdmin-Inventory-${this.props.match.params.id}`);
    } else {
      this.props.history.push(`/Reload/-Faculty-Inventory-${this.props.match.params.id}`);
    }
  };

  openReturn = id => {
    let returningItem = this.props.inventories.Inventory.Status.filter(stat => stat._id === id);
    this.refs.returnQuantity.max = returningItem[0].quantity;
    this.refs.returnQuantity.value = returningItem[0].quantity;
    this.refs.Borrower.value = returningItem[0].borrower;
    this.refs.Returnee.value = returningItem[0].borrower;
    this.refs.BorrowDate.value = returningItem[0].date;
    this.refs.BorrowID.value = returningItem[0]._id;
    this.refs.BorrowingCustodian.value = returningItem[0].custodian;
    document.getElementById("BorrowerText").innerText = returningItem[0].borrower;
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeReturnModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  returnSubmit = e => {
    e.preventDefault();
    let data = {
      Quantity: this.refs.returnQuantity.value,
      Returnee: this.refs.Returnee.value,
      ItemName: this.props.inventories.Inventory.Name,
      ItemID: this.props.inventories.Inventory._id,
      Custodian: this.props.credential.Username,
      BorrowingCustodian: this.refs.BorrowingCustodian.value,
      Borrowed: this.refs.BorrowDate.value,
      Borrower: this.refs.Borrower.value,
      BorrowID: this.refs.BorrowID.value
    };
    document.querySelector(".createdModal").style.display = "none";
    this.props.BackInventoriesAction(data);
  };
  openDeleteInventory = id => {
    this.refs.DeleteID.value = id;
    document.querySelector(".deleteModalContainer").style.display = "grid";
  };
  closeDeleteModal = () => {
    document.querySelector(".deleteModalContainer").style.display = "none";
  };

  openGalleryModal = () => {
    document.querySelector(".galleryModalContainer").style.display = "grid";
  };
  closeGalleryModal = () => {
    document.querySelector(".galleryModalContainer").style.display = "none";
  };
  deleteInventory = e => {
    e.preventDefault();
    if (this.props.credential.Password === this.refs.Password.value) {
      let data = {
        Description: this.refs.Description.value,
        Custodian: this.props.credential.Username,
        id: this.refs.DeleteID.value
      };
      document.querySelector(".deleteModalContainer").style.display = "none";

      document.querySelector(".deleteAlert").innerText = "";

      if (this.props.credential.Type === "SuperAdmin") {
        this.props.DeleteInventoryAction(data);
        this.props.history.push(`/Reload/-SuperAdmin-Home`);
      } else {
        this.props.AddDeleteNoteAction(data);
      }
    } else {
      document.querySelector(".deleteAlert").innerText = "Password Don't Match";
    }
  };
  addToDelete = e => {
    if (e.target.style.opacity !== "0.3") {
      this.setState({
        deleteImages: [...this.state.deleteImages, e.target.nextElementSibling.alt]
      });
      e.target.style.opacity = "0.3";
    } else {
      let filteredDeleteImages = this.state.deleteImages.filter(delImg => delImg !== e.target.nextElementSibling.alt);
      this.setState({
        deleteImages: filteredDeleteImages
      });
      e.target.style.opacity = "0";
    }
  };
  AddImage = () => {
    let data = {
      AddImage: this.refs.AddImage.files,
      id: this.props.match.params.id,
      Method: "Add"
    };
    this.props.AddImageAction(data);
    if (this.props.credential.Type === "SuperAdmin") {
      this.props.history.push(`/Reload/-SuperAdmin-Inventories`);
    } else {
      this.props.history.push(`/Reload/-Faculty-Inventories`);
    }
  };
  deleteImage = () => {
    let data = {
      DeleteImages: this.state.deleteImages,
      id: this.props.match.params.id,
      Method: "Delete"
    };
    this.props.DeleteImageAction(data);
    if (this.props.credential.Type === "SuperAdmin") {
      this.props.history.push(`/Reload/-SuperAdmin-Inventories`);
    } else {
      this.props.history.push(`/Reload/-Faculty-Inventories`);
    }
  };

  render() {
    // assign this.props.inventories.Inventory to Inventory for shorter syntax
    let Inventory = {};
    if (this.state.inventoryLoaded === true) {
      Inventory = this.props.inventories.Inventory;
    }
    if (this.props.inventories.Loading === true && this.state.inventoryLoaded === false) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="IndividualInventory jumbotron">
          <PopAlert {...this.props.inventories} />
          <div className="deleteModalContainer">
            <div className="deleteModal">
              <div className="deleteClosingModal" onClick={this.closeDeleteModal}>
                x
              </div>
              <form onSubmit={this.deleteInventory}>
                <div className="form-group">
                  <div className="alert-danger deleteAlert" role="alert"></div>
                  <label htmlFor="Description">Description</label>
                  <input type="text" ref="Description" className="form-control" placeholder="Description" />
                  <label htmlFor="Password">Password</label>
                  <input type="password" ref="Password" className="form-control" placeholder="Password" />
                </div>
                <input type="hidden" ref="DeleteID" />
                <input type="submit" className="btn btn-success" value="Delete" />
              </form>
            </div>
          </div>
          <div className="galleryModalContainer">
            <div className="galleryModal">
              <div className="galleryClosingModal" onClick={this.closeGalleryModal}>
                x
              </div>
              <div className="photoGallery">
                <div className="Images">
                  {Inventory.Name === undefined || null || false
                    ? ""
                    : Inventory.Image.map((image, imgIndex) => (
                        <div className="image" key={imgIndex}>
                          <div className="cover" onClick={this.addToDelete}></div>
                          <img src={`/${image}`} alt={image} />
                        </div>
                      ))}
                </div>
                <div className="buttons d-flex justify-content-end align-content-end">
                  <div className="form">
                    <div className="form-group col">
                      <label htmlFor="AddImage">Add Image</label>
                      <input type="file" className="form-control-file d-flex justify-content-end" ref="AddImage" multiple />
                    </div>
                    <div className="form-row">
                      {this.state.deleteImages.length === 0 ? (
                        <div className="col"></div>
                      ) : (
                        <button className="btn-sm btn-danger col" onClick={this.deleteImage}>
                          Delete
                        </button>
                      )}
                      <input type="submit" className="form-control col" value="Add" onClick={this.AddImage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="createdModal">
            <div className="Modal">
              <div className="closingModal" onClick={this.closeReturnModal}>
                x
              </div>
              <form onSubmit={this.returnSubmit}>
                <h2 id="createdModalTitle"></h2>
                <div className="form-group">
                  <label htmlFor="Name">Returnee</label>
                  <input type="text" className="form-control" id="Returnee" placeholder="Returnee" ref="Returnee" />
                </div>
                <div className="form-group">
                  <label htmlFor="Quantity">Quantity</label>
                  <input type="number" ref="returnQuantity" className="form-control" placeholder="Quantity" />
                </div>
                <input type="hidden" ref="BorrowDate" />
                <input type="hidden" ref="BorrowingCustodian" />
                <input type="hidden" ref="Borrower" />
                <input type="hidden" ref="BorrowID" />
                <input type="submit" className="btn btn-success" value="Return" />
                <div>
                  Borrowed by <p id="BorrowerText"></p>
                </div>
              </form>
            </div>
          </div>
          <div className="Title">
            <h1>{Inventory.Name}</h1>

            <button className="btn btn-danger deleteInventoryButton" onClick={() => this.openDeleteInventory(Inventory._id)}>
              {this.props.credential.Type === "SuperAdmin" ? "delete" : "request delete"}
            </button>
          </div>
          <hr />
          <div className="head">
            <div className="image">
              <img
                src={Inventory.Name === undefined || null || false ? "" : `/${Inventory.Image[0]}`}
                alt="imagesample"
                onClick={this.openGalleryModal}
              />
            </div>
            {/* informations of the item */}
            <div className="info">
              <p>Quantity: {Inventory.Quantity}</p>
              <p>
                Stock Location: <ReturnLocation Location={Inventory.Location} />
              </p>
              <p>
                Category: <ReturnCategory Category={Inventory.Category} />
              </p>
              <p>Acquisition Cost: {Inventory.PricePerUnit}</p>
              <p>Acquisition Source: {Inventory.From}</p>
              <p>Item Remaining : {this.state.maxBorrow}</p>
            </div>
            {/* form for borrowing an item */}
            <div className="borrowform">
              <form onSubmit={this.BorrowSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input type="text" className="form-control" id="Name" placeholder="Name" ref="Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="Quantity">Quantity</label>
                  <input
                    type="number"
                    ref="Quantity"
                    min="0"
                    max={this.state.maxBorrow}
                    className="form-control"
                    id="Quantity"
                    placeholder="Quantity"
                    required
                  />
                </div>
                <input type="submit" className="btn btn-success" value="Borrow" />
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
                    <td>{moment(stat.date).format("MMM D YYYY hh:mm A")}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => this.openReturn(stat._id)}>
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
  BorrowInventoriesAction,
  BackInventoriesAction,
  DeleteInventoryAction,
  AddImageAction,
  DeleteImageAction,
  AddDeleteNoteAction
})(Inventories);
