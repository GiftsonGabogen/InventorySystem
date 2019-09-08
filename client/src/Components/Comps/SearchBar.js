import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  onSearchHandler = e => {
    e.preventDefault();
    this.props.onSearch(this.refs.Category.value, this.refs.Name.value);
    console.log("Search");
  };
  render() {
    return (
      <form className="SearchBar" onSubmit={this.onSearchHandler}>
        <div className="form-row">
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              ref="Name"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <select className="custom-select" ref="Category">
              <option value="All" defaultValue>
                All
              </option>
              {this.props.Categories.map((category, i) => (
                <option value={category.Name} key={i}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
          <input type="submit" value="Search" className="btn btn-primary" />
        </div>
      </form>
    );
  }
}

export default SearchBar;
