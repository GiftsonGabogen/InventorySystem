import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import ReturnLocation from "../Comps/ReturnLocation";
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
      Inventories: this.props.inventories.Inventories
    };
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  AddFilter = e => {
    e.preventDefault();
    //filtering Inventories With Categories
    let all_category_checkboxes = document.querySelectorAll("#categoryCheckbox");
    let checked_categories = [];
    for (let i = 0; i < all_category_checkboxes.length; i++) {
      if (all_category_checkboxes[i].checked) {
        checked_categories.push(all_category_checkboxes[i]);
      }
    }
    //filtering Inventories With Locations
    let all_location_checkboxes = document.querySelectorAll("#locationCheckbox");
    let checked_locations = [];
    for (let i = 0; i < all_location_checkboxes.length; i++) {
      if (all_location_checkboxes[i].checked) {
        checked_locations.push(all_location_checkboxes[i]);
      }
    }
    //making copy of the Inventories That WIll Be FIltered
    let Inventories = this.props.inventories.Inventories.slice();
    //Filtering Categories
    checked_categories.map(
      category => (Inventories = Inventories.filter(inventory => inventory.Category === category.value))
    );
    //Filtering Locations
    checked_locations.map(
      location => (Inventories = Inventories.filter(inventory => inventory.Location === location.value))
    );
    this.setState({
      Inventories
    });

    document.querySelector(".createdModal").style.display = "none";
  };

  openFilterModal = () => {
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeFilterModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };

  render() {
    if (this.props.inventories.Loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="Inventories">
          <div className="createdModal">
            <div className="Modal">
              <div className="closingModal" onClick={this.closeFilterModal}>
                x
              </div>
              <form onSubmit={this.AddFilter}>
                <h2 id="createdModalTitle"></h2>
                <h5>Categories</h5>
                {this.props.categories.Categories.map(cat => (
                  <div className="form-check form-check-inline" key={cat._id}>
                    <input className="form-check-input" id="categoryCheckbox" type="checkbox" value={cat._id} />
                    <label className="form-check-label">{cat.Name}</label>
                  </div>
                ))}
                <h5>Locations</h5>
                {this.props.locations.Locations.map(loc => (
                  <div className="form-check form-check-inline" key={loc._id}>
                    <input className="form-check-input" id="locationCheckbox" type="checkbox" value={loc._id} />
                    <label className="form-check-label">{loc.Name}</label>
                  </div>
                ))}

                <input type="submit" value="Submit" className="form-control btn btn-primary" />
              </form>
            </div>
          </div>
          <button className="btn-sm btn-primary" onClick={this.openFilterModal}>
            Filter
          </button>
          <div className="InventoriesContainer">
            {this.state.Inventories.length === 0 ? (
              <div className="">No Inventories found</div>
            ) : (
              this.state.Inventories.map((inventory, i) => (
                <div className="card Inventory" key={i}>
                  <img src={`/${inventory.Image}`} className="card-img-top" alt="sampleImage" />
                  <div className="card-body">
                    <h5 className="card-title">{inventory.Name}</h5>
                    <p className="card-text">
                      this Item is Located at <ReturnLocation Location={inventory.Location} />
                    </p>
                    <Link
                      to={
                        this.props.credential.Type === "SuperAdmin"
                          ? `/SuperAdmin/Inventory/${inventory._id}`
                          : `/Faculty/Inventory/${inventory._id}`
                      }
                      className="btn btn-primary"
                    >
                      Borrow or Return
                    </Link>
                  </div>
                </div>
              ))
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
