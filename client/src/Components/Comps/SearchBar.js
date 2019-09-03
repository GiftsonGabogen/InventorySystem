import React from "react";

const SearchBar = props => {
  return (
    <form className="SearchBar">
      <div className="form-row">
        <div className="col-7">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col">
          <select className="custom-select">
            <option value="All" defaultValue>
              All
            </option>
            {props.Categories.map((category, i) => (
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
};

export default SearchBar;
