import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function mapStateToProps(state) {
  return {};
}

class SuperAdminNavbar extends Component {
  constructor(params) {
    super(params);
    this.state = {
      navs: [
        { Name: "Overview" },
        { Name: "Overview", Image: "magnifying-glass.png", link: "/Home" },
        { Name: "Users", Image: "magnifying-glass.png", link: "/Users" },
        { Name: "Reports", Image: "magnifying-glass.png", link: "/Reports" }
      ]
    };
  }

  render() {
    return (
      <div className="Navbar col-3 bg-light">
        <h5 className="light-gray">Navigation</h5>
        <nav className="bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {this.state.navs.map((nav, i) =>
                nav.link === undefined ? (
                  <li className="nav-item" key={i}>
                    <button href="#" className="nav-link btn btn-primary" disabled>
                      {nav.Name}
                    </button>
                  </li>
                ) : (
                  <li className="nav-item sub-nav" key={i}>
                    <span className="badge">
                      <img src={`./Images/${nav.Image}`} alt="" />
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
