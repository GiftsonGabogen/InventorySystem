import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCategoryAction } from "../../../../Actions/ItemActions";
import { UnMountAlertAction } from "../../../../Actions/UnMountActions";
import PopAlert from "../../../Comps/PopAlert"

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class AddCategory extends Component {
  constructor(props) {
    super(props)
    // when reloading, the modal-backdrop div is not being removed because it is in the most root so if the app div reloads
    // the modal-backdrop which is sitting outside the app div don't remove so that we need to remove it manually
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").style.display = "none"
    }
  }
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  componentDidUpdate() {
    if (this.props.items.Success === true) {
      this.props.history.push("/Admin/Items/Category");
    }
  }

  AddCategoryHandler = e => {
    e.preventDefault();
    let Data = {
      Name: this.refs.Name.value
    };
    this.props.AddCategoryAction(Data);
    this.props.history.push(`/Admin/Reload/-Admin-Items-AddCategory`);
  };
  render() {
    return (
      <div className="AddCategory">
        <PopAlert {...this.props.items} />
        <form onSubmit={this.AddCategoryHandler}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" ref="Name" className="form-control" />
          </div>
          <input type="submit" className="btn btn-primary" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { AddCategoryAction, UnMountAlertAction }
)(AddCategory);
