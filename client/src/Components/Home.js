import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class Home extends Component {
  render() {
    return (
      <div className="Overview">
        <div className="card">
          <div className="card-header">Inventory Overview</div>
          <div className="card-body">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <img
                    src="./Images/Shopping-bag.png"
                    className="w-50"
                    alt=""
                  />
                  <h2>125</h2>
                  <h2>Items</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <img src="./Images/piggy-bank.png" className="w-50" alt="" />
                  <h2>15,000</h2>
                  <h2>Sales</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <img src="./Images/N/A.png" className="w-50" alt="" />
                  <h2>N/A</h2>
                  <h2>N/A</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
