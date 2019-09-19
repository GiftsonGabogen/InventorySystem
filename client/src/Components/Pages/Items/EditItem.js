import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";
import {
  EditItemAction,
  DeleteItemAction,
  DeleteItemMultipleAction
} from "../../../Actions/ItemActions";
import AlertButton from "../../Comps/AlertButton";

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
      id: "",
      Items: this.props.items.items,
      deleteList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Items: nextProps.items.items
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.Items === nextProps.items.items &&
      this.state === nextState
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    /* Reset all of the Alert Messages */
    this.props.UnMountAlertAction();
  }

  onDeleteList = () => {
    let Data = {
      ids: this.state.deleteList
    };
    this.setState({
      deleteList: []
    });
    this.props.DeleteItemMultipleAction(Data);
    /* There is a Bug on My Checkbox Deleting, Which is When I Delete An Item Then When The State And The Items Updated Some Item is Still Checked
    Which is Not Checked Before. Because I Have No Internet When I'm Debugging It, I Come Up With A Solution, Redirect To a Page Which Will
    Redirect Again to This Page So That Loss of States is Not Messed Up */
    this.props.history.push(`/Admin/Reload/-Admin-Items-Edit`);
  };

  onAddDeleteList = (bool, id, Name) => {
    /* Putting Id and Name of The Checked Item in An Object Then Added to The this.state.deleteList Array */
    if (bool === true) {
      this.setState({
        deleteList: [...this.state.deleteList, { id: id, Name: Name }]
      });
    } else {
      /* if Unchecked Removed it to he this.state.deleteList Array */
      let filteredList = this.state.deleteList.filter(list => list.id !== id);
      this.setState({
        deleteList: filteredList
      });
    }
  };

  onSearch = (Cat, Nam) => {
    /* For Searching Certain Items With an Option of Category */
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
  ItemDeleteHandler = id => {
    this.props.DeleteItemAction(id);
  };
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
    /* Resseting The Modal Data Which is Fetch Form The State When The Modal is Closed */
    this.setState({
      Name: "",
      Category: "",
      SellingPrice: 0,
      Unit: ""
    });
    this.props.UnMountAlertAction();
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
                <h5 className="modal-title">
                  Edit {this.state.Name}
                  {/* if there is an Existing Message on The Global State for Items Pop an Alert With The Message */}
                  {this.props.items.message === "" ? (
                    ""
                  ) : (
                      <div
                        className={`alert ${
                          this.props.items.Success === true
                            ? "alert-success"
                            : "alert-danger"
                          }`}
                        role="alert"
                      >
                        {this.props.items.message}
                      </div>
                    )}
                </h5>
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
                          value={this.state.Category}
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

        <SearchBar
          onSearch={this.onSearch}
          Categories={this.props.items.categories}
        />
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">
                {/* If One or More Checkbox is Checked This Delete Button Will Be Visible */}

                <button
                  type="button"
                  onClick={() =>
                    AlertButton(
                      `Are You Sure You Want To Delete ${this.state.deleteList.map(
                        list => list.Name + " "
                      )}`
                    ).then(this.onDeleteList)
                  }
                  className="btn btn-danger btn-sm checkbox"
                  id="checkbox"
                  style={{
                    visibility:
                      this.state.deleteList.length > 0 ? "visible" : "hidden"
                  }}
                >
                  delete
                </button>
              </th>
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
            {this.state.Items.map((item, i) => (
              <tr key={i}>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      ref="checkbox"
                      id="checkbox"
                      className="form-check-input"
                      onChange={e =>
                        this.onAddDeleteList(
                          e.target.checked,
                          item._id,
                          item.Name
                        )
                      }
                    />
                  </div>
                </td>
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
                        item.Category._id,
                        item.SellingPrice,
                        item.Unit,
                        item._id
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
                {/* <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      AlertButton("Are You Sure To Delete " + item.Name + " ?")
                        .then(result => {
                          this.ItemDeleteHandler(item._id);
                        })
                        .catch(err => {
                          console.log("Cancelled");
                        })
                    }
                  >
                    Delete
                  </button>
                </td> */}
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
  {
    UnMountAlertAction,
    EditItemAction,
    DeleteItemAction,
    DeleteItemMultipleAction
  }
)(EditItem);
