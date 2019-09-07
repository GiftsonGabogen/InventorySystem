import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}
var filteredItems = [];

class StoreHome extends Component {
  componentDidMount() {}

  render() {
    if (this.props.items.items.length > 0) {
      filteredItems = this.props.items.items.filter(
        item => item.Quantity !== 0
      );
    }
    return (
      <div className="Home Store">
        <div className="modal fade" id="SoldModal" tabIndex="-1">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Sold</div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="Quantity">Quantity</label>
                  <input type="number" ref="Quantity" step="0.01" id="" />
                </div>
                <input type="submit" className="btn btn-primary" value="Sold" />
              </form>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Unit</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Category.Name}</td>
                <td>{item.Price}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
                <td>
                  <button className="btn btn-primary">Sold</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(StoreHome);
