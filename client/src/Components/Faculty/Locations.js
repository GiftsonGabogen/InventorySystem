import React, { Component } from "react";
import { connect } from "react-redux";
import { AddLocationsAction, DeleteLocationsAction } from "../../Actions/LocationsActions";
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
  deleteLocation = id => {
    this.props.DeleteLocationsAction(id);
  };
  render() {
    return (
      <div className="Locations">
        <PopAlert {...this.props.locations} />
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
            </tr>
          </thead>
          <tbody>
            {this.props.locations.Locations.map((cat, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{cat.Name}</td>
                <td>
                  {" "}
                  <button onClick={() => this.deleteLocation(cat._id)} className="btn btn-danger btn-sm">
                    delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, { AddLocationsAction, DeleteLocationsAction })(Locations);
