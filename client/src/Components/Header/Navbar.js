import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {};
}

class Navbar extends Component {
  constructor(params) {
    super(params);
    this.state = {
      navs: []
    };
  }
  componentDidMount() {
    this.setState({
      navs: [
        { Name: "Overview" },
        { Name: "Overview", Image: "magnifying-glass.png", link: "" },
        { Name: "Inventory" },
        { Name: "Items", Image: "shopping-bag.png", link: "/Items" },
        { Name: "Add Item", Image: "tag.png", link: "/Items/Add" },
        { Name: "Edit Item", Image: "edit.png", link: "/Items/Edit" },
        { Name: "Add Stock", Image: "tag.png", link: "/Items/AddStock" },
        { Name: "Category", Image: "pie-chart.png", link: "/Items/Category" },
        { Name: "Reports" }
      ]
    });
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
                    <button
                      href="#"
                      className="nav-link btn btn-primary"
                      disabled
                    >
                      {nav.Name}
                    </button>
                  </li>
                ) : (
                  <li className="nav-item sub-nav" key={i}>
                    <span className="badge">
                      <img src={`./Images/${nav.Image}`} alt="" />
                    </span>
                    <Link to={`/Home${nav.link}`} className="nav-link">
                      {nav.Name}
                    </Link>
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
