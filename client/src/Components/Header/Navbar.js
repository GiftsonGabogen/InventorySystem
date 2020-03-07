import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import magnifyingGlass from "../Images/magnifying-glass.png";
import shoppingBag from "../Images/shopping-bag.png";
import tag from "../Images/tag.png";
import edit from "../Images/edit.png";
import pieChart from "../Images/pie-chart.png";

function mapStateToProps(state) {
  return {};
}

class Navbar extends Component {
  constructor(params) {
    super(params);
    this.state = {
      navs: [
        { Name: "Overview" },
        { Name: "Overview", Image: magnifyingGlass, link: "/Overview" },
        { Name: "Inventory" },
        { Name: "Items", Image: shoppingBag, link: "/Items/All" },
        { Name: "Add Item", Image: tag, link: "/Items/Add" },
        { Name: "Edit Item", Image: edit, link: "/Items/Edit" },
        { Name: "Add Stock", Image: tag, link: "/Items/AddStock" },
        { Name: "Category", Image: pieChart, link: "/Items/Category" },
        {
          Name: "Add Category",
          Image: pieChart,
          link: "/Items/AddCategory"
        },
        { Name: "Reports" },
        {
          Name: "All Time Sales",
          Image: magnifyingGlass,
          link: "/Reports/AllTimeSales"
        },
        {
          Name: "Sales Per Month",
          Image: magnifyingGlass,
          link: "/Reports/MonthSales"
        },
        {
          Name: "Sales per Day",
          Image: magnifyingGlass,
          link: "/Reports/DaySales"
        }
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
                    <NavLink to={`/Admin${nav.link}`} className="nav-link">
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
