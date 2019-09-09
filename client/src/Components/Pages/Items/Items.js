import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: this.props.items.items
    };
  }

  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Items;
    if (Cat === "All" && Name === "") {
      Items = this.props.items.items;
    } else if (Cat === "All" && Name !== "") {
      Items = this.props.items.items.filter(Item =>
        Item.Name.toLowerCase().includes(Name)
      );
    } else if (Cat !== "All" && Name === "") {
      Items = this.props.items.items.filter(
        Item => Item.Category.Name.toLowerCase() === Cat.toLowerCase()
      );
    } else {
      var preItems = this.props.items.items.filter(
        Item => Item.Category.Name.toLowerCase() === Cat.toLowerCase()
      );
      Items = preItems.filter(Item => Item.Name.toLowerCase().includes(Name));
    }

    this.setState({
      Items
    });
  };

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  render() {
    return (
      <div className="Items">
        <SearchBar
          onSearch={this.onSearch}
          Categories={this.props.items.categories}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Category.Name}</td>
                <td>{item.Price.toFixed(2)}</td>
                <td>{item.SellingPrice.toFixed(2)}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { UnMountAlertAction }
)(Items);
