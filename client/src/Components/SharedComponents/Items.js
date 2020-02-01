import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllInventoriesAction } from "../../Actions/InventoriesActions";
import { UnMountAlertAction } from "../../Actions/UnMountActions";
import ReturnLocation from "../Comps/ReturnLocation";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    inventories: state.inventories,
    credential: state.credential
  };
}

class Inventories extends Component {
  constructor(props) {
    super(props);
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
    this.state = {};
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  render() {
    if (this.props.inventories.Loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="Inventories">
          {this.props.inventories.Inventories.length === 0 ? (
            <div className="">No Inventories</div>
          ) : (
            this.props.inventories.Inventories.map((inventory, i) => (
              <div className="card Inventory" key={i}>
                <img src={`/${inventory.Image}`} className="card-img-top" alt="sampleImage" />
                <div className="card-body">
                  <h5 className="card-title">{inventory.Name}</h5>
                  <p className="card-text">
                    this Item is Located at <ReturnLocation Location={inventory.Location} />
                  </p>
                  <Link
                    to={
                      this.props.credential.Type === "SuperAdmin"
                        ? `/SuperAdmin/Inventory/${inventory._id}`
                        : `/Faculty/Inventory/${inventory._id}`
                    }
                    className="btn btn-primary"
                  >
                    Borrow or Return
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, {
  UnMountAlertAction,
  FetchAllInventoriesAction
})(Inventories);
