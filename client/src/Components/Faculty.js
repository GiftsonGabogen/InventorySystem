import React, { Component, Fragment } from "react";
import Overview from "./Faculty/Overview";
import Items from "./Faculty/Items";
import { Route } from "react-router-dom";

export default class Faculty extends Component {
  render() {
    return (
      <Fragment>
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Overview`} component={Overview} />
        <Route credential={this.props.credential} exact path={`${this.props.match.url}/Inventories`} component={Items} />
      </Fragment>
    );
  }
}
