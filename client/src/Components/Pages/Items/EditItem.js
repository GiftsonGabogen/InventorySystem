import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";
import { EditItemAction } from "../../../Actions/ItemActions";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class EditItem extends Component {
  constructor(params) {
    super(params);
    this.state = {
      Name: "",
      Category: "",
      SellingPrice: 0,
      Unit: "",
      id: ""
    };
  }
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  EditItemHandler = e => {
    e.preventDefault();
    const { Name, Category, SellingPrice, Unit, id } = this.refs;
    let Data = {
      Name: Name.value,
      Category: Category.value,
      SellingPrice: SellingPrice.value,
      Unit: Unit.value,
      id: id.value
    };
    this.props.EditItemAction(Data);
  };
  EditHandler = (Name, Category, SellingPrice, Unit, id) => {
    this.setState({
      Name,
      SellingPrice,
      Category,
      Unit,
      id
    });
  };

  CloseHandler = () => {
    this.setState({
      Name: "",
      Category: "",
      SellingPrice: 0,
      Unit: ""
    });
  };
  SellingPriceHandler = e => {
    this.setState({
      SellingPrice: e.target.value
    });
  };
  NameHandler = e => {
    this.setState({
      Name: e.target.value
    });
  };
  CategoryHandler = e => {
    this.setState({
      Category: e.target.value
    });
  };
  UnitHandler = e => {
    this.setState({
      Unit: e.target.value
    });
  };
  render() {
    return (
      <div className="EditItem">
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="EditItemModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit {this.state.Name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.CloseHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.EditItemHandler}>
                  <div className="form-group">
                    <div className="form-group">
                      <input type="hidden" ref="id" value={this.state.id} />
                      <label htmlFor="Name">Name</label>
                      <input
                        type="text"
                        ref="Name"
                        className="form-control"
                        onChange={this.NameHandler}
                        value={this.state.Name}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <label htmlFor="SellingPrice">Selling Price</label>
                        <input
                          type="number"
                          step="0.01"
                          ref="SellingPrice"
                          className="form-control"
                          onChange={this.SellingPriceHandler}
                          value={this.state.SellingPrice}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="Category">Category</label>
                        <select
                          ref="Category"
                          className="form-control custom-select"
                          onChange={this.CategoryHandler}
                          defaultValue={this.state.Category}
                        >
                          {this.props.items.categories.map((category, i) => (
                            <option value={category._id} key={i}>
                              {category.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col">
                        <label htmlFor="Unit">Unit</label>
                        <input
                          type="text"
                          ref="Unit"
                          className="form-control"
                          onChange={this.UnitHandler}
                          value={this.state.Unit}
                        />
                      </div>
                    </div>

                    <input
                      type="submit"
                      value="Edit"
                      className="btn btn-primary w-50"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <SearchBar Categories={this.props.items.categories} />
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
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.items.items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Category.Name}</td>
                <td>{item.Price.toFixed(2)}</td>
                <td>{item.SellingPrice.toFixed(2)}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#EditItemModal"
                    onClick={() =>
                      this.EditHandler(
                        item.Name,
                        item.Category.Name,
                        item.SellingPrice,
                        item.Unit,
                        item._id
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
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
  { UnMountAlertAction, EditItemAction }
)(EditItem);
