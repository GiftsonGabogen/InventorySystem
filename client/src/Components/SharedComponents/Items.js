import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import ReturnLocation from "../Comps/ReturnLocation";
import ReturnCategory from "../Comps/ReturnCategory";
import ReturnBorrowedQuantity from "../Comps/ReturnBorrowedQuantity";
import PrintButton from "../Comps/PrintButton";
import AddInventory from "./AddInventory";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential,
    categories: state.categories,
    locations: state.locations
  };
}

class Inventories extends Component {
  constructor(props) {
    super(props);
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
    this.state = {
      Inventories: this.props.inventories.Inventories,
      NameFilter: "",
      CategoriesFilter: [],
      LocationsFilter: []
    };
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  AddFilter = e => {
    e.preventDefault();
    //setting empty states for updating soon
    let CategoriesFilter = [];
    let LocationsFilter = [];

    //making copy of the Inventories That WIll Be FIltered
    let Inventories = this.props.inventories.Inventories.slice();
    //Name filtering
    let filterName = document.querySelector(".filterName").value;
    //make a regular expression that if the filterName is found anywhere in the Inventory's Name(whether on middle,front or back of the Name) it will be return
    let regexpFilterName = new RegExp(filterName, "gi");
    if (filterName !== "") {
      Inventories = Inventories.filter(inventory => regexpFilterName.test(inventory.Name));
    }
    //filtering Inventories With Categories
    let all_category_checkboxes = document.querySelectorAll(".categoryCheckbox");
    let checked_categories = [];
    for (let i = 0; i < all_category_checkboxes.length; i++) {
      if (all_category_checkboxes[i].checked) {
        checked_categories.push(all_category_checkboxes[i]);
      }
    }
    //filtering Inventories With Locations
    let all_location_checkboxes = document.querySelectorAll(".locationCheckbox");
    let checked_locations = [];
    for (let i = 0; i < all_location_checkboxes.length; i++) {
      if (all_location_checkboxes[i].checked) {
        checked_locations.push(all_location_checkboxes[i]);
      }
    }

    //create empty object for filteredCategories to be passed on the next filtering
    let passingFilteredCategories = [];

    //Filtering Categories
    //If no checked checkboxes on categories filter it means that he dont want to filter categories
    //so we will not filter categories
    if (checked_categories.length !== 0) {
      checked_categories.map(category => {
        for (let i = 0; i < Inventories.length; i++) {
          if (Inventories[i].Category === category.value) {
            passingFilteredCategories.push(Inventories[i]);
            Inventories.splice(i, 1, ["temp"]);
          }
        }
        CategoriesFilter.push(category.nextElementSibling.innerText);
      });
    } else {
      passingFilteredCategories = Inventories.slice();
    }

    //create empty object for filteredCategories to be passed on the next filtering
    let passingFilteredLocations = [];

    //Filtering Locations
    //If no checked checkboxes on locations filter it means that he dont want to filter locations
    //so we will not filter locations
    if (checked_locations.length !== 0) {
      checked_locations.map(location => {
        for (let i = 0; i < passingFilteredCategories.length; i++) {
          if (passingFilteredCategories[i].Location === location.value) {
            passingFilteredLocations.push(passingFilteredCategories[i]);
            passingFilteredCategories.splice(i, 1, ["temp"]);
          }
        }
        LocationsFilter.push(location.nextElementSibling.innerText);
      });
    } else {
      passingFilteredLocations = passingFilteredCategories;
    }

    this.setState({
      Inventories: passingFilteredLocations,
      CategoriesFilter,
      LocationsFilter
    });

    document.querySelector(".createdModal").style.display = "none";
  };

  openFilterModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeFilterModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  moreInfo = id => {
    this.props.history.push(
      this.props.credential.Type === "SuperAdmin"
        ? `/Reload/-SuperAdmin-Inventory-${id}`
        : `/Reload/-Faculty-Inventory-${id}`
    );
  };

  openAddModal = () => {
    document.querySelector(".AddModalContainer").style.display = "grid";
  };
  closeAddModal = () => {
    document.querySelector(".AddModalContainer").style.display = "none";
  };

  render() {
    if (this.props.inventories.Loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="Inventories" id="PrintInventories">
          <div className="AddModalContainer">
            <div className="AddModal">
              <div className="AddClosingModal" onClick={this.closeAddModal}>
                x
              </div>
              <AddInventory></AddInventory>
            </div>
          </div>
          <div className="createdModal">
            <div className="Modal">
              <div className="closingModal" onClick={this.closeFilterModal}>
                x
              </div>
              <form onSubmit={this.AddFilter}>
                <h5>Categories</h5>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input type="text" className="form-control filterName" placeholder="Name" />
                </div>
                <h5>Categories</h5>
                {this.props.categories.Categories.map(cat => (
                  <div className="form-check form-check-inline" key={cat._id}>
                    <input className="form-check-input categoryCheckbox" type="checkbox" value={cat._id} />
                    <label className="form-check-label">{cat.Name}</label>
                  </div>
                ))}
                <h5>Locations</h5>
                {this.props.locations.Locations.map(loc => (
                  <div className="form-check form-check-inline" key={loc._id}>
                    <input className="form-check-input locationCheckbox" type="checkbox" value={loc._id} />
                    <label className="form-check-label">{loc.Name}</label>
                  </div>
                ))}

                <input type="submit" value="Submit" className="form-control btn btn-success" />
              </form>
            </div>
          </div>
          <div className="tools d-flex mb-3" id="ignore">
            <div className="filter mr-auto">
              <button className="btn-sm btn-success" onClick={this.openFilterModal}>
                Filter
              </button>
              <div className="FilterState">
                {this.state.CategoriesFilter.length !== 0 ? <h1>Categories</h1> : ""}
                {this.state.CategoriesFilter.map((cat, i) => (
                  <p key={i}>{cat}</p>
                ))}
              </div>
              <div className="FilterState">
                {this.state.LocationsFilter.length !== 0 ? <h1>Locations</h1> : ""}
                {this.state.LocationsFilter.map((loc, i) => (
                  <p key={i}>{loc}</p>
                ))}
              </div>
            </div>
            <div className="printButton">
              <PrintButton
                element="PrintInventories"
                type="html"
                header="WUP Inventory System Properties"
                ignore={["ignore"]}
              ></PrintButton>
            </div>
            <div className="addInventory" onClick={this.openAddModal}>
              <button className="btn-sm btn-success">Add Inventory</button>
            </div>
          </div>

          <div className="InventoriesContainer">
            {this.state.Inventories.length === 0 ? (
              <div className="">No Inventories found</div>
            ) : (
              <div>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Borrowed</th>
                      <th scope="col">Location</th>
                      <th scope="col">Category</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Inventories.map((inventory, i) => (
                      <tr className="Inventory" key={i} onClick={() => this.moreInfo(inventory._id)}>
                        <th scope="row">{i + 1}</th>
                        <td>{inventory.Name}</td>
                        <td>{inventory.Quantity}</td>
                        <td>
                          <ReturnBorrowedQuantity Inventory={inventory._id} />
                        </td>
                        <td>
                          <ReturnLocation Location={inventory.Location} />
                        </td>
                        <td>
                          <ReturnCategory Category={inventory.Category} />
                        </td>
                        <td className="ItemsImage">
                          <img src={inventory.Name === undefined || null || false ? "" : `/${inventory.Image[0]}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="Signature">
                  <div className="content">
                    <p className="Name">{this.props.credential.Name}</p>
                    <p>{this.props.credential.Type === "SuperAdmin" ? "Admin" : "Custodian"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, {
  UnMountAlertAction,
  FetchAllInventoriesAction
})(Inventories);
