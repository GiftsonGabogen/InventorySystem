import React, { Component } from "react";
import FilteredInventory from "../Comps/FilteredInventory";

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: this.props.match.params.filterName.replace(/%20/gi, " ")
    };
  }

  render() {
    return (
      <div className="Category">
        <FilteredInventory
          filterName={this.state.filterName}
          filter={"Category"}
          history={this.props.history}
        ></FilteredInventory>
      </div>
    );
  }
}

export default Category;
