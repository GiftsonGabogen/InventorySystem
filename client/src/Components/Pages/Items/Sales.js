import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    sales: state.sales
  };
}

class Sales extends Component {
  render() {
    return (
      <div className="Sales">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" />
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sales);
