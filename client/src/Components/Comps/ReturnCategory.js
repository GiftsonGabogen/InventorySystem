import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

class ReturnCategory extends Component {
  render() {
    let Cat = this.props.categories.Categories.filter(cat => this.props.Category === cat._id);
    if (Cat.length !== 0) {
      return <React.Fragment>{Cat[0].Name}</React.Fragment>;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default connect(mapStateToProps)(ReturnCategory);
