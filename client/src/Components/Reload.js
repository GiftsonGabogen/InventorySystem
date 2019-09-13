import React, { Component } from "react";

/* Redirect to a Page Which is Pass on The Parameters Props */
/* This is Created Due To a Bug Issue */
class Reload extends Component {
  componentDidMount() {
    let url = this.props.match.params.url;
    let replace = url.replace(/-/g, "/");

    this.props.history.push(replace);
  }

  render() {
    return <div className="Reload" />;
  }
}

export default Reload;
