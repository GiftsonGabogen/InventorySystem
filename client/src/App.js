import React from "react";
import "bootstrap";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import Login from "./Components/Login";
import Navbar from "./Components/Header/Navbar";
import Heading from "./Components/Header/Heading";
import SuperAdminNavbar from "./Components/SuperAdmin/SuperAdminNavbar"
import Store from "./Components/Store";
import Admin from "./Components/Admin";
import Reload from "./Components/Reload";
import SuperAdmin from "./Components/SuperAdmin"
import errorPage from "./Components/errorPage";
import { FetchAllAction } from "./Actions/ItemActions";
import { AuthCheckAction } from "./Actions/CredentialActions";

function mapStateToProps(state) {
  return {
    credential: state.credential,
    items: state.items
  };
}
const PrivateRoute = ({ component: Component, credential, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      credential.Login === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.FetchAllAction();
  }

  render() {
    if (this.props.items.Loaded === false) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App row">
          <div className="AlertModal">
            <div className="AlertModalForm">
              <h2 className="AlertModalMessage" />
              <div className="form-row">
                <button className="btn btn-primary okButton">Ok</button>
                <button className="btn btn-primary cancelButton">Cancel</button>
              </div>
            </div>
          </div>
          <Route path="/Admin" component={Heading} />
          <Route path="/Store" component={Heading} />
          <Route path="/Admin" component={Navbar} />
          <Route path="/SuperAdmin" component={SuperAdminNavbar} />
          <Route exact path="/" component={Login} />
          <div className="col-9">
            <Switch>
              <PrivateRoute
                credential={this.props.credential}
                path="/Store"
                component={Store}
              />
              <Route path="/Admin/Reload/:url" component={Reload} />

              <PrivateRoute
                credential={this.props.credential}
                path="/SuperAdmin"
                component={SuperAdmin}
              />

              <PrivateRoute
                credential={this.props.credential}
                path="/Admin"
                component={Admin}
              />
              <Route component={errorPage} />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  { FetchAllAction, AuthCheckAction }
)(App);
