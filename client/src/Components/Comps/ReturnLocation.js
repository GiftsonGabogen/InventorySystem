import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    locations: state.locations
  };
}

class ReturnLocation extends Component {
  render() {
    let Loc = this.props.locations.Locations.filter(loc => this.props.Location === loc._id);
    if (Loc.length !== 0) {
      return <React.Fragment>{Loc[0].Name}</React.Fragment>;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default connect(mapStateToProps)(ReturnLocation);
