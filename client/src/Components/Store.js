import React, { Component, Fragment } from "react";
import StoreHome from "./Store/StoreHome";
import { Route } from "react-router-dom";

class Store extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Route
          credential={this.props.credential}
          path={this.props.match.url + "/Home"}
          component={StoreHome}
        />
      </Fragment>
    );
  }
}

export default Store;
