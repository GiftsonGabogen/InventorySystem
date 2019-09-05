import React, { Component } from "react";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class Home extends Component {
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
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
                  <h2>{this.props.items.items.length}</h2>
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

export default connect(
  mapStateToProps,
  { UnMountAlertAction }
)(Home);
