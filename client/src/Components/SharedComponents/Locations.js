import React, { Component } from "react";
import { connect } from "react-redux";
import { AddLocationsAction, DeleteLocationsAction, EditLocationsAction } from "../../Actions/LocationsActions";
import PopAlert from "../Comps/PopAlert";

function mapStateToProps(state) {
  return {
    locations: state.locations
  };
}

class Locations extends Component {
  AddLocation = e => {
    e.preventDefault();
    let data = {
      Name: this.refs.Name.value
    };
    this.props.AddLocationsAction(data);
  };
  EditHandler = e => {
    e.preventDefault();
    const { EditName, id } = this.refs;
    let Data = {
      Name: EditName.value,
      id: id.value
    };
    document.querySelector(".createdModal").style.display = "none";
    this.props.EditLocationsAction(Data);
  };
  openEditModal = (id, Name) => {
    this.refs.id.value = id;
    this.refs.EditName.value = Name;
    document.querySelector(".createdModal").style.display = "grid";
  };
  closeEditModal = () => {
    document.querySelector(".createdModal").style.display = "none";
  };
  deleteLocation = id => {
    this.props.DeleteLocationsAction(id);
  };
  render() {
    return (
      <div className="Locations">
        <PopAlert {...this.props.locations} />
        <div className="createdModal">
          <div className="Modal">
            <div className="closingModal" onClick={this.closeEditModal}>
              x
            </div>
            <form onSubmit={this.EditHandler}>
              <h2 id="createdModalTitle"></h2>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" ref="EditName" className="form-control" />
              </div>
              <input type="hidden" ref="id" className="form-control" />

              <input type="submit" value="Submit" className="form-control btn btn-primary" />
            </form>
          </div>
        </div>
        <form onSubmit={this.AddLocation}>
          <div className="form-row">
            <div className="form-group col">
              <input type="text" className="form-control" ref="Name" placeholder="Location" />
            </div>
            <div className="form-group col">
              <input type="submit" className="form-control w-50" value="Add" />
            </div>
          </div>
        </form>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.locations.Locations.map((loc, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{loc.Name}</td>
                <td>
                  <button onClick={() => this.openEditModal(loc._id, loc.Name)} className="btn btn-danger btn-sm">
                    edit
                  </button>
                </td>
                <td>
                  <button onClick={() => this.deleteCategory(loc._id)} className="btn btn-danger btn-sm">
                    delete
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

export default connect(mapStateToProps, { AddLocationsAction, DeleteLocationsAction, EditLocationsAction })(Locations);
