import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddInventoryIcon from "../Images/AddInventory.svg";
import InventoriesIcon from "../Images/Inventories.svg";
import CustodianIcon from "../Images/Custodian.svg";
import LocationIcon from "../Images/Location.svg";
import CategoriesIcon from "../Images/Categories.svg";
import ReportsIcon from "../Images/Reports.svg";
import magnifyingGlass from "../Images/magnifying-glass.png";

function mapStateToProps(state) {
  return {};
}

class SuperAdminNavbar extends Component {
  constructor(params) {
    super(params);
    this.state = {
      navs: [
        { Name: "Overview", Image: magnifyingGlass, link: "/Home" },
        { Name: "Custodians", Image: CustodianIcon, link: "/Custodians" },
        { Name: "Inventories", Image: InventoriesIcon, link: "/Inventories" },
        { Name: "Stock Locations", Image: LocationIcon, link: "/Locations" },
        { Name: "Categories", Image: CategoriesIcon, link: "/Categories" },
        { Name: "Reports", Image: ReportsIcon, link: "/Reports" },
        { Name: "Alterations", Image: ReportsIcon, link: "/Alterations" }
      ]
    };
  }

  render() {
    return (
      <div className="Navbar col-2">
        <h5 className="light-gray">Navigation</h5>
        <nav className="sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {this.state.navs.map((nav, i) =>
                nav.link === undefined ? (
                  <li className="nav-item" key={i}>
                    <button href="#" className="nav-link btn btn-success" disabled>
                      {nav.Name}
                    </button>
                  </li>
                ) : (
                  <li className="nav-item sub-nav" key={i}>
                    <span className="badge">
                      <img src={nav.Image} alt="" />
                    </span>
                    <NavLink to={`/SuperAdmin${nav.link}`} className="nav-link">
                      {nav.Name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SuperAdminNavbar);
