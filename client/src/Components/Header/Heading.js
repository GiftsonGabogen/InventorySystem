import React, { Component } from "react";

class Heading extends Component {
  render() {
    return (
      <div className="Heading col-12 row bg-dark">
        <div className="col-6 justify-content-start">
          <h4>WUP Inventory System</h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-primary">Logout</button>
        </div>
      </div>
    );
  }
}

export default Heading;
