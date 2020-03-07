import React, { Component } from "react";
import FilteredInventory from "../Comps/FilteredInventory";

export class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: this.props.match.params.filterName.replace(/%20/gi, " ")
    };
  }

  render() {
    return (
      <div className="Location">
        <FilteredInventory
          filterName={this.state.filterName}
          filter={"Location"}
          history={this.props.history}
        ></FilteredInventory>
      </div>
    );
  }
}

export default Location;
