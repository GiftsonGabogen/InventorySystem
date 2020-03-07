import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import magnifyingGlass from "../Images/magnifying-glass.png";
import InventoriesIcon from "../Images/Inventories.svg";
import ReportsIcon from "../Images/Reports.svg";

function mapStateToProps(state) {
  return {};
}

class Navbar extends Component {
  constructor(params) {
    super(params);
    this.state = {
      navs: [
        { Name: "Overview", Image: magnifyingGlass, link: "/Overview" },
        { Name: "Inventories", Image: InventoriesIcon, link: "/Inventories" },
        { Name: "Reports", Image: ReportsIcon, link: "/Reports" }
      ]
    };
  }

  render() {
    return (
      <div className="Navbar col-3">
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
                    <NavLink to={`/Faculty${nav.link}`} className="nav-link">
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

export default connect(mapStateToProps)(Navbar);
