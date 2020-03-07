import React, { Component } from "react";
import { connect } from "react-redux";
import InventoriesIcon from "../Images/Inventories.svg";
import ReturnInventoryNote from "../Comps/ReturnInventoryNote";
import moment from "moment";

function mapStateToProps(state) {
  return {
    users: state.users,
    inventories: state.inventories
  };
}

class SuperAdminHome extends Component {
  constructor(props) {
    super(props);
    let BorrowedList = this.props.inventories.Inventories.filter(inv => inv.Status.length !== 0);
    let Borrowed = 0;
    let Items = 0;
    BorrowedList.map(borrow => borrow.Status.map(borrowCount => (Borrowed += parseInt(borrowCount.quantity))));
    this.props.inventories.Inventories.map(inventory => (Items += parseInt(inventory.Quantity)));
    this.state = {
      BorrowedNum: Borrowed,
      ItemLength: Items
    };
  }
  openNoteModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeNoteModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };

  decline = () => {
    console.log("decline");
  };
  confirm = () => {
    console.log("confirm");
  };
  render() {
    return (
      <div className="SuperAdminHome">
        <div className="createdModal SuperAdminCreatedModal">
          <div className="Modal">
            <div className="closingModal" onClick={this.closeNoteModal}>
              x
            </div>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th className="small" scope="col">
                    #
                  </th>
                  <th className="small" scope="col">
                    Item Name
                  </th>
                  <th className="small" scope="col">
                    Quantity
                  </th>
                  <th className="small" scope="col">
                    Category
                  </th>
                  <th className="small" scope="col">
                    Date
                  </th>
                  <th className="small" scope="col">
                    Description
                  </th>
                  <th className="small" scope="col"></th>
                  <th className="small" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.inventories.Notes.map((note, i) => (
                  <tr className="Inventory" key={i}>
                    <th scope="row">{i + 1}</th>
                    <ReturnInventoryNote
                      Inventory={note.ItemID}
                      Description={note.Description}
                      decline={this.decline}
                      confirm={this.confirm}
                    ></ReturnInventoryNote>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div>SuperAdmin Overview</div>
            <button className="btn btn-success" onClick={this.openNoteModal}>
              Notes
            </button>
          </div>
          <div className="card-body">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <div className="overviewCard">
                    <div className="image">
                      <img src={InventoriesIcon} className="w-25" alt="" />
                    </div>
                    <div className="info">
                      <h2>{this.props.inventories.Inventories.length}</h2>
                      <h2>Inventories</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="overviewCard">
                    <div className="image">
                      <img src={InventoriesIcon} className="w-25" alt="" />
                    </div>
                    <div className="info">
                      <h2>{this.state.BorrowedNum}</h2>
                      <h2>Borrowed</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-2"></hr>
            <h5>Recent Reports</h5>
            <table className="table table-striped table-dark reportsTable">
              <thead>
                <tr>
                  <th className="small" scope="col">
                    #
                  </th>
                  <th className="small" scope="col">
                    Item
                  </th>
                  <th className="small" scope="col">
                    Borrower
                  </th>
                  <th className="small" scope="col">
                    Returnee
                  </th>
                  <th className="small" scope="col">
                    Date of Borrow
                  </th>
                  <th className="small" scope="col">
                    Date of Return
                  </th>
                  <th className="small" scope="col">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.inventories.InventoryLogs.slice(0, 5).map((inventory, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{inventory.ItemName}</td>
                    <td>{inventory.Borrower}</td>
                    <td>{inventory.Returnee}</td>
                    <td>{moment(inventory.Borrowed).format("MMM D YYYY hh:mm A")}</td>
                    <td>{moment(inventory.Date).format("MMM D YYYY hh:mm A")}</td>
                    <td>{inventory.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SuperAdminHome);
