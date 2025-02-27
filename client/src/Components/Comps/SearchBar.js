import React, { Component } from "react";

let Dateform;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
  }

  onSearchHandler = e => {
    e.preventDefault();
    this.props.onSearch(this.refs.Category.value, this.refs.Name.value);
  };
  render() {
    if (this.props.Date === true) {
      Dateform = (
        <select className="custom-select" ref="Date">
          {this.state.months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
      );
    }
    return (
      <form className="SearchBar" onSubmit={this.onSearchHandler}>
        <div className="form-row">
          <div className="col-7">
            <input type="text" className="form-control" ref="Name" placeholder="Name" />
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
          <input type="submit" value="Search" className="btn btn-success" />
        </div>
      </form>
    );
  }
}

export default SearchBar;
